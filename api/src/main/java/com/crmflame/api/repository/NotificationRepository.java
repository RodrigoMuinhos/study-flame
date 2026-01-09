package com.crmflame.api.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.crmflame.api.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<Notification> findAllByCreatedAtAfterOrderByCreatedAtDesc(LocalDateTime createdAt, Pageable pageable);
}
