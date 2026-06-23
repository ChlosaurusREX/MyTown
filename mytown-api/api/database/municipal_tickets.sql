-- ============================================================
-- municipal_tickets — Full Schema SQL Patch
-- Compatible with: MySQL 5.7+ / MariaDB (XAMPP/Apache)
-- Generated: 2026-06-22
-- Usage: Import via phpMyAdmin or run: mysql -u root -p < municipal_tickets.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS `municipal_tickets`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `municipal_tickets`;

-- ------------------------------------------------------------
-- Table: admin_users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id`         INT(11)      NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(150) NOT NULL,
  `email`      VARCHAR(150) NOT NULL,
  `password`   VARCHAR(255) NOT NULL,
  `role`       ENUM('admin','super_admin') NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT(11)      NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name`  VARCHAR(100) NOT NULL,
  `email`      VARCHAR(150) NOT NULL,
  `phone`      VARCHAR(20)      NULL DEFAULT NULL,
  `password`   VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` TINYINT(1)   NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email`   (`email`),
  KEY `idx_users_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: events
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id`                INT(11)        NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(150)   NOT NULL,
  `category`          VARCHAR(50)    NOT NULL,
  `event_date`        VARCHAR(50)    NOT NULL,
  `location`          VARCHAR(150)   NOT NULL,
  `price`             DECIMAL(10,2)  NOT NULL DEFAULT 0.00,
  `tickets_total`     INT(11)        NOT NULL DEFAULT 0,
  `tickets_remaining` INT(11)        NOT NULL DEFAULT 0,
  `created_at`        TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted`        TINYINT(1)     NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_events_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: event_proposals
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `event_proposals` (
  `id`           INT(11)       NOT NULL AUTO_INCREMENT,
  `proposed_by`  INT(11)       NOT NULL,
  `name`         VARCHAR(150)  NOT NULL,
  `category`     VARCHAR(50)   NOT NULL,
  `event_date`   VARCHAR(50)   NOT NULL,
  `location`     VARCHAR(150)  NOT NULL,
  `price`        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `tickets_total` INT(11)      NOT NULL DEFAULT 0,
  `notes`        TEXT              NULL DEFAULT NULL,
  `status`       ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `reviewed_by`  INT(11)           NULL DEFAULT NULL,
  `created_at`   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewed_at`  TIMESTAMP         NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ep_proposed_by` (`proposed_by`),
  KEY `fk_ep_reviewed_by` (`reviewed_by`),
  KEY `idx_ep_status`     (`status`),
  CONSTRAINT `fk_ep_proposed_by` FOREIGN KEY (`proposed_by`) REFERENCES `admin_users` (`id`),
  CONSTRAINT `fk_ep_reviewed_by` FOREIGN KEY (`reviewed_by`) REFERENCES `admin_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: tickets
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tickets` (
  `id`           INT(11)       NOT NULL AUTO_INCREMENT,
  `ticket_code`  VARCHAR(60)   NOT NULL,
  `user_id`      INT(11)       NOT NULL,
  `event_id`     INT(11)       NOT NULL,
  `holder_name`  VARCHAR(200)  NOT NULL,
  `email`        VARCHAR(150)  NOT NULL,
  `event_name`   VARCHAR(150)  NOT NULL,
  `category`     VARCHAR(50)   NOT NULL,
  `event_date`   VARCHAR(50)   NOT NULL,
  `location`     VARCHAR(150)  NOT NULL,
  `unit_price`   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `quantity`     INT(11)       NOT NULL DEFAULT 1,
  `total_price`  DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `purchased_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted`   TINYINT(1)    NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_code`       (`ticket_code`),
  KEY `idx_tickets_user`    (`user_id`),
  KEY `idx_tickets_event`   (`event_id`),
  KEY `idx_tickets_deleted` (`is_deleted`),
  CONSTRAINT `fk_tickets_user`  FOREIGN KEY (`user_id`)  REFERENCES `users`  (`id`),
  CONSTRAINT `fk_tickets_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: delete_requests
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `delete_requests` (
  `id`           INT(11)      NOT NULL AUTO_INCREMENT,
  `target_table` ENUM('users','events','tickets') NOT NULL,
  `target_id`    INT(11)      NOT NULL,
  `reason`       VARCHAR(255)     NULL DEFAULT NULL,
  `status`       ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `requested_by` INT(11)      NOT NULL,
  `requested_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved_by`  INT(11)          NULL DEFAULT NULL,
  `resolved_at`  TIMESTAMP        NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_delreq_requested_by` (`requested_by`),
  KEY `fk_delreq_resolved_by`  (`resolved_by`),
  KEY `idx_delreq_status`      (`status`),
  KEY `idx_delreq_target`      (`target_table`, `target_id`),
  CONSTRAINT `fk_delreq_requested_by` FOREIGN KEY (`requested_by`) REFERENCES `admin_users` (`id`),
  CONSTRAINT `fk_delreq_resolved_by`  FOREIGN KEY (`resolved_by`)  REFERENCES `admin_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: admin_action_log
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_action_log` (
  `id`                INT(11)      NOT NULL AUTO_INCREMENT,
  `admin_id`          INT(11)      NOT NULL,
  `action`            VARCHAR(50)  NOT NULL,
  `target_table`      ENUM('users','events','tickets') NULL DEFAULT NULL,
  `target_id`         INT(11)          NULL DEFAULT NULL,
  `delete_request_id` INT(11)          NULL DEFAULT NULL,
  `details`           VARCHAR(255)     NULL DEFAULT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_log_admin`  (`admin_id`),
  KEY `idx_log_target` (`target_table`, `target_id`),
  CONSTRAINT `fk_log_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- End of municipal_tickets schema patch
-- ============================================================
