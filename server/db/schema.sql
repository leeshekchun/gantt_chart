DROP DATABASE IF EXISTS rangeTest_db;
CREATE DATABASE IF NOT EXISTS rangeTest_db;

USE rangeTest_db;

--range test project
DROP TABLE IF EXISTS project;
CREATE TABLE IF NOT EXISTS project (
  projectId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  projectName VARCHAR(100) NOT NULL,
  startDate TIME NOT NULL,
  duration INT
);

CREATE TABLE owner (
    ownerId INT NOT NULL AUTO_AINCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL DEFAULT '',
    -- lastName ARCHAR(50) NOT NULL DEFAULT '', 
    projectId INT,
    FOREIGN KEY (projectId)
    REFERENCES project(projectId)
    ON DELETE SET NULL

);

CREATE TABLE tasks (
    taskId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    projectId INT,
    task TEXT NOT NULL,
    FOREIGN KEY (projectId)
    REFERENCES project(projectId)
    ON DELETE SET NULL
);
