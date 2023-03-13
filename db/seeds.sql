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
    ("Michael", "Scott", 1, 2),
    ("Dwight", "Schrute", 2, 4),
    ("Jim", "Halpert", 2, 4),
    ("Stanley", "Hudson", 2, 4),
    ("Phyllis", "Lapin-Vance", 2, 4),
    ("Pam", "Halpert", 3, 4),
    ("Angela", "Martin", 4, 4),
    ("Kevin", "Malone", 5, 10),
    ("Oscar", "Martinez", 5, 10),
    ("Meredith", "Palmer", 6, 4),
    ("Kelly", "Kapoor", 7, 4),
    ("Creed", "Bratton", 8, 4),
    ("Darryl", "Philbin", 9, 4),
    ("Roy", "Anderson", 10, 16),
    ("Lonnis", "Collins", 10, 16);