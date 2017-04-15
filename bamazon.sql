CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE Products (
  ItemID INT AUTO_INCREMENT NOT NULL,
  ProductName VARCHAR(100) NULL,
  DepartmentName VARCHAR(100) NULL,
  Price DECIMAL(10,2) NULL,
  StockQuantity INT NULL,
  PRIMARY KEY (ItemID)
);
  
SELECT * FROM Products;


INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (1,'Immitation IKEA Couch','Home & Kitchen',30,50);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (2,'Metal desk','Home & Kitchen',100.78,25);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (3,'Surface Pro 3','Electronics',580,250);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (4,'Solid Blue Jeans','Clothing',20,100);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (5,'Nintendo Switch','Electronics',429.00,135);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (6,'Cheap Yamaha Piano','Musical Instruments',800,5);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (7,'Mind and World-John McDowell','Books',31.00, 10);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (8,'100-sheets of white A-4 Paper','Office Products',10.00,100);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (9,'Moral Luck-Bernard Williams','Books',32.00, 4);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES (10,'American Eagle Boxers','Clothing',16.00, 800);