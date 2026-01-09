import { UserStats, ExamHistory, CategoryStats, Badge } from '@/types/aws-study';

const STORAGE_KEY = 'aws_exam_stats';

const defaultBadges: Badge[] = [];

export class StatisticsManager {
  private static loadStats(): UserStats {
    if (typeof window === 'undefined') {
      return this.getDefaultStats();
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getDefaultStats();
  }

  private static getDefaultStats(): UserStats {
    return {
      totalExams: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      overallAccuracy: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      level: 1,
      badges: [],
      categoryStats: {},
      examHistory: [],
    };
  }

  private static saveStats(stats: UserStats): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }
  }

  static addExamResult(history: ExamHistory): UserStats {
    const stats = this.loadStats();

    stats.totalExams++;
    stats.totalQuestions += history.totalQuestions;
    stats.totalCorrect += history.correctAnswers;
    stats.overallAccuracy = (stats.totalCorrect / stats.totalQuestions) * 100;

    stats.examHistory.unshift(history);
    if (stats.examHistory.length > 50) {
      stats.examHistory = stats.examHistory.slice(0, 50);
    }

    if (history.categoryPerformance) {
      Object.entries(history.categoryPerformance).forEach(([category, performance]) => {
        if (!stats.categoryStats[category]) {
          stats.categoryStats[category] = {
            category,
            totalAttempts: 0,
            correctAnswers: 0,
            accuracy: 0,
          };
        }
        const catStats = stats.categoryStats[category];
        catStats.totalAttempts += performance.total;
        catStats.correctAnswers += performance.correct;
        catStats.accuracy = (catStats.correctAnswers / catStats.totalAttempts) * 100;
      });
    }

    stats.currentStreak = this.calculateStreak(stats.examHistory);
    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);

    stats.badges = this.checkBadges(stats);

    this.saveStats(stats);
    return stats;
  }

  static getStats(): UserStats {
    return this.loadStats();
  }

  static getWeakestCategories(limit: number = 3): CategoryStats[] {
    const stats = this.getStats();
    return Object.values(stats.categoryStats)
      .filter(cat => cat.totalAttempts >= 5)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, limit);
  }

  static getStrongestCategories(limit: number = 3): CategoryStats[] {
    const stats = this.getStats();
    return Object.values(stats.categoryStats)
      .filter(cat => cat.totalAttempts >= 5)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, limit);
  }

  static getRecommendedTopics(): string[] {
    const weakest = this.getWeakestCategories(3);
    return weakest.map(cat => cat.category);
  }

  private static calculateStreak(history: ExamHistory[]): number {
    if (history.length === 0) return 0;

    const today = new Date().setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = today;

    for (const exam of history) {
      const examDate = new Date(exam.date).setHours(0, 0, 0, 0);
      
      if (examDate === currentDate) {
        streak++;
        currentDate -= 86400000;
      } else if (examDate === currentDate - 86400000) {
        streak++;
        currentDate -= 86400000;
      } else {
        break;
      }
    }

    return streak;
  }


  private static checkBadges(stats: UserStats): Badge[] {
    const badges = [...stats.badges];

    if (stats.totalExams >= 1) {
      this.unlockBadge(badges, 'first_exam');
    }

    const perfectExam = stats.examHistory.some(
      exam => exam.correctAnswers === exam.totalQuestions
    );
    if (perfectExam) {
      this.unlockBadge(badges, 'perfectionist');
    }

    if (stats.totalExams >= 10) {
      this.unlockBadge(badges, 'fast_learner');
    }

    if (stats.overallAccuracy >= 90) {
      this.unlockBadge(badges, 'master');
    }

    if (stats.currentStreak >= 7) {
      this.unlockBadge(badges, 'dedicated');
    }

    if (stats.totalCorrect >= 100) {
      this.unlockBadge(badges, 'centurion');
    }

    const fastExam = stats.examHistory.some(exam => exam.timeSpent < 1800);
    if (fastExam) {
      this.unlockBadge(badges, 'speedrunner');
    }

    const perfectCategory = Object.values(stats.categoryStats).some(
      cat => cat.accuracy === 100 && cat.totalAttempts >= 5
    );
    if (perfectCategory) {
      this.unlockBadge(badges, 'specialist');
    }

    return badges;
  }

  private static unlockBadge(badges: Badge[], badgeId: string): void {
    const badge = badges.find(b => b.id === badgeId);
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = new Date();
    }
  }

  static resetStats(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
