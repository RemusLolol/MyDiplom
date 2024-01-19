CREATE TABLE savesOperations(
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    typeTam VARCHAR(255) NOT NULL,
    tamposhl DECIMAL(5,2) NOT NULL,
    transprash DECIMAL(5,2) NOT NULL,
    weightprod DECIMAL(5,2) NOT NULL,
    itogss DECIMAL(5,2) NOT NULL,
    itogssperweight DECIMAL(5,2) NOT NULl
);