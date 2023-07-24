-- Create database
CREATE DATABASE jacobs_shop;

-- Create users table
CREATE TABLE `jacobs_shop`.`users` (
  `id` int NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone_number` bigint(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (id)
);