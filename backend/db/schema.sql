DROP TABLE IF EXISTS gantt_tasks;
DROP TABLE IF EXISTS gantt_links;

CREATE TABLE gantt_tasks (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL,
  `owner` VARCHAR(50) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
    ON DELETE SET NULL
);

CREATE TABLE gantt_links (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
    PRIMARY KEY (`id`)
    ON DELETE SET NULL
);

-- https://docs.dhtmlx.com/gantt/desktop__howtostart_nodejs.html