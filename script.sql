CREATE SCHEMA mesadireta;

CREATE TABLE mesadireta.user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) UNIQUE,
  email VARCHAR(45) UNIQUE,
  createdAt VARCHAR(45) NULL,
  updatedAt VARCHAR(45) NULL,
  group_id VARCHAR(45) NULL
);

CREATE TABLE mesadireta.email_report (
  status VARCHAR(45) NULL,
  sender VARCHAR(45) NULL,
  receiver VARCHAR(45) NULL,
  subject VARCHAR(45) NULL,
  html_content VARCHAR(45) NULL
);