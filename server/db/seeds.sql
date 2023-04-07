INSERT INTO project (projectName,startDate, duration)
VALUES  ('NV35', '2023-04-15', 10),
        ('Cybertruck', '2023-04-20', 15);

INSERT INTO owner (firstName, projectId)
VALUES  ('Max', 1),
        ('Chris', 2);

INSERT INTO tasks (projectId, task)
VALUES  (1, 'Four Wheel Alignment'),
        (2, 'Calibrate DAS');