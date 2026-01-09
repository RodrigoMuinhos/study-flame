package com.crmflame.api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crmflame.api.dto.StudentNotificationDTO;
import com.crmflame.api.model.Notification;
import com.crmflame.api.model.NotificationRead;
import com.crmflame.api.repository.NotificationReadRepository;
import com.crmflame.api.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final int DEFAULT_LIMIT = 50;

    private final NotificationRepository notificationRepository;
    private final NotificationReadRepository notificationReadRepository;

    public List<StudentNotificationDTO> listForStudent(String studentCpf, Integer limit) {
        int pageSize = (limit == null || limit < 1 || limit > 200) ? DEFAULT_LIMIT : limit;

        List<Notification> notifications = notificationRepository
                .findAllByOrderByCreatedAtDesc(PageRequest.of(0, pageSize))
                .getContent();

        if (notifications.isEmpty()) {
            return List.of();
        }

        Set<Long> ids = notifications.stream().map(Notification::getId).collect(Collectors.toSet());
        Map<Long, Boolean> readMap = new HashMap<>();

        notificationReadRepository
                .findByStudentCpfAndNotificationIdIn(studentCpf, ids)
                .forEach(r -> readMap.put(r.getNotification().getId(), true));

        List<StudentNotificationDTO> result = new ArrayList<>(notifications.size());
        for (Notification n : notifications) {
            boolean read = Boolean.TRUE.equals(readMap.get(n.getId()));
            result.add(StudentNotificationDTO.from(n, read));
        }

        return result;
    }

    public long unreadCount(String studentCpf) {
        List<Notification> latest = notificationRepository
                .findAllByOrderByCreatedAtDesc(PageRequest.of(0, DEFAULT_LIMIT))
                .getContent();
        if (latest.isEmpty()) return 0;

        Set<Long> ids = latest.stream().map(Notification::getId).collect(Collectors.toSet());
        long read = notificationReadRepository.countByStudentCpfAndNotificationIdIn(studentCpf, ids);
        return Math.max(0, latest.size() - read);
    }

    @Transactional
    public void markRead(String studentCpf, Long notificationId) {
        notificationReadRepository
                .findByStudentCpfAndNotificationId(studentCpf, notificationId)
                .ifPresentOrElse(r -> {
                    // already read
                }, () -> {
                    Notification n = notificationRepository.findById(notificationId)
                            .orElseThrow(() -> new RuntimeException("Notificação não encontrada"));
                    NotificationRead read = new NotificationRead();
                    read.setNotification(n);
                    read.setStudentCpf(studentCpf);
                    notificationReadRepository.save(read);
                });
    }

    @Transactional
    public void markAllRead(String studentCpf) {
        List<Notification> latest = notificationRepository
                .findAllByOrderByCreatedAtDesc(PageRequest.of(0, DEFAULT_LIMIT))
                .getContent();
        if (latest.isEmpty()) return;

        Set<Long> ids = latest.stream().map(Notification::getId).collect(Collectors.toSet());
        Set<Long> alreadyRead = notificationReadRepository
                .findByStudentCpfAndNotificationIdIn(studentCpf, ids)
                .stream()
                .map(r -> r.getNotification().getId())
                .collect(Collectors.toSet());

        for (Notification n : latest) {
            if (alreadyRead.contains(n.getId())) continue;
            NotificationRead read = new NotificationRead();
            read.setNotification(n);
            read.setStudentCpf(studentCpf);
            notificationReadRepository.save(read);
        }
    }

    @Transactional
    public Notification create(Notification.Type type, String title, String message, String icon) {
        Notification n = new Notification();
        n.setType(type != null ? type : Notification.Type.INFO);
        n.setTitle(title);
        n.setMessage(message);
        n.setIcon(icon);
        return notificationRepository.save(n);
    }
}
