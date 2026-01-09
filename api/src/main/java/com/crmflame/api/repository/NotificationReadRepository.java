package com.crmflame.api.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crmflame.api.model.NotificationRead;

public interface NotificationReadRepository extends JpaRepository<NotificationRead, Long> {

    Optional<NotificationRead> findByStudentCpfAndNotificationId(String studentCpf, Long notificationId);

    List<NotificationRead> findByStudentCpfAndNotificationIdIn(String studentCpf, Collection<Long> notificationIds);

    long countByStudentCpfAndNotificationIdIn(String studentCpf, Collection<Long> notificationIds);
}
