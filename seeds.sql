INSERT INTO department (id, name)
VALUES (1, "Finance"),
       (2, "Marketing"),
       (3, "Engineering"),
       (4, "Accounting");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "President", 100000, 3),
       (2, "Vice-President", 75000, 4),
       (3, "Treasurer", 50000, 1),
       (4, "Secretary", 40000, 1);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES (1, "Lance", "Carpenter", 3, 2),
       (2, "Terrence", "McKinney", 2, 3),
       (3, "Lucas", "Hormozi", 1, NULL),
       (4, "Stephen", "Tortellini", 4, 1);
