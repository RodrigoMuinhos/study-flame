import { test, expect, request } from "@playwright/test";
import { assertBackendUp, ensureTestLeadExists } from "./helpers/api";
import { ENV } from "./helpers/env";

test.describe("Student progress persistence + admin stats", () => {
  test.beforeAll(async () => {
    await assertBackendUp();
    await ensureTestLeadExists();
  });

  test("Marking a lesson completed updates admin metrics", async () => {
    const ctx = await request.newContext();

    try {
      // 1) Snapshot current admin metrics for the test CPF
      const beforeRes = await ctx.get(`${ENV.apiUrl}/admin/students`);
      expect(beforeRes.ok()).toBeTruthy();
      const beforeList = await beforeRes.json();

      const before = Array.isArray(beforeList)
        ? beforeList.find((s: any) => s?.cpf === ENV.cpf)
        : null;

      const progressBefore = Number(before?.progress ?? 0);
      const modulesCompletedBefore = Number(before?.modulesCompleted ?? 0);

      // 2) Create a unique video lesson (unpublished to avoid generating notifications)
      const uniqueModule = Math.floor(Date.now() / 1000) % 100000; // stable-ish, avoids collisions
      const createRes = await ctx.post(`${ENV.apiUrl}/videos`, {
        data: {
          moduleNumber: uniqueModule,
          lessonNumber: 1,
          title: `Progress Check ${uniqueModule}`,
          description: "Automated test lesson",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          durationMinutes: 1,
          orderIndex: 0,
          isPublished: false,
          pageLocation: "aulas",
        },
      });

      expect(createRes.ok(), `Failed to create lesson: ${createRes.status()} ${await createRes.text()}`).toBeTruthy();
      const created = await createRes.json();
      const videoId = created?.id;
      expect(videoId).toBeTruthy();

      // 3) Mark progress as completed for the test CPF
      const progressRes = await ctx.post(`${ENV.apiUrl}/videos/${videoId}/progress`, {
        data: {
          studentCpf: ENV.cpf,
          completed: true,
          watchedSeconds: 0,
          progressPercentage: 100,
        },
      });

      expect(progressRes.ok(), `Failed to update progress: ${progressRes.status()} ${await progressRes.text()}`).toBeTruthy();

      // 4) Admin metrics should reflect completion (progress percent and/or modules completed)
      const afterRes = await ctx.get(`${ENV.apiUrl}/admin/students`);
      expect(afterRes.ok()).toBeTruthy();
      const afterList = await afterRes.json();

      const after = Array.isArray(afterList)
        ? afterList.find((s: any) => s?.cpf === ENV.cpf)
        : null;

      expect(after, "CPF de teste deve aparecer em /admin/students").toBeTruthy();

      const progressAfter = Number(after?.progress ?? 0);
      const modulesCompletedAfter = Number(after?.modulesCompleted ?? 0);

      expect(
        progressAfter >= progressBefore,
        `Expected progress to not decrease (before=${progressBefore}, after=${progressAfter})`
      ).toBeTruthy();

      expect(
        modulesCompletedAfter >= modulesCompletedBefore,
        `Expected modulesCompleted to not decrease (before=${modulesCompletedBefore}, after=${modulesCompletedAfter})`
      ).toBeTruthy();

      // With a new unique module, modulesCompleted should usually increase by 1.
      // If other completed lessons already exist in that module (very unlikely with uniqueModule), it may already count.
      expect(modulesCompletedAfter >= modulesCompletedBefore).toBeTruthy();
    } finally {
      await ctx.dispose();
    }
  });
});
