DROP TABLE IF EXISTS gantt_tasks;
DROP TABLE IF EXISTS gantt_links;

CREATE TABLE `rangeTest_db`.`gantt_tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `task` VARCHAR(45) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `duration` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `rangeTest_db`.`gantt_links` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `source` INT NOT NULL,
  `target` INT NOT NULL,
  PRIMARY KEY (`id`));


-- https://docs.dhtmlx.com/gantt/desktop__howtostart_nodejs.html