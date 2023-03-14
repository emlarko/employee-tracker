INSERT INTO department (name) 
VALUES ("Corporate and HR"),
    ("Management"),
    ("Sales"),
    ("Reception"),
    ("Accounting"),
    ("Product Oversight"),
    ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Financial Officer", 90000, 1),
    ("Vice President of Sales", 80000, 1),
    ("Human Resources", 50000, 1),
    ("Regional Manager", 60000, 2),
    ("Sales Representative", 40000, 3),
    ("Receptionist", 27000, 4),
    ("Senior Accountant", 50000, 5),
    ("Accountant", 42000, 5),
    ("Supplier Relations", 40000, 6),
    ("Customer Service", 30000, 6),
    ("Quality Assurance", 40000, 6),
    ("Warehouse Foreman", 40000, 7),
    ("Dock Worker", 28000, 7);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Wallace", 1, NULL),
    ("Jan", "Levinson", 2, 1),
    ("Toby", "Flednerson", 3, 2),
    ("Michael", "Scott", 4, 2),
    ("Dwight", "Schrute", 5, 4),
    ("Jim", "Halpert", 5, 4),
    ("Stanley", "Hudson", 5, 4),
    ("Phyllis", "Lapin-Vance", 5, 4),
    ("Pam", "Beesly", 6, 4),
    ("Angela", "Martin", 7, 4),
    ("Kevin", "Malone", 8, 10),
    ("Oscar", "Martinez", 8, 10),
    ("Meredith", "Palmer", 9, 4),
    ("Kelly", "Kapoor", 10, 4),
    ("Creed", "Bratton", 11, 4),
    ("Darryl", "Philbin", 12, 4),
    ("Roy", "Anderson", 13, 16),
    ("Lonnis", "Collins", 13, 16);