CREATE DATABASE instit43_GrandeOurse_DB;
USE instit43_GrandeOurse_DB;

-- Tabela User
CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOM VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,  -- For security, ensure this column is appropriately hashed and salted!
    ROLE INT NOT NULL CHECK (ROLE IN (0, 1))  -- 0 for user, 1 for admin
);

-- Tabela Departements
CREATE TABLE Departements (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabela DailyTotals
CREATE TABLE DailyTotals (
    Date DATE PRIMARY KEY,
    PO DECIMAL(10, 2),
    TPS DECIMAL(10, 2),
    TVQ DECIMAL(10, 2),
    Total_Des_Departements DECIMAL(10, 2),
    Rabais DECIMAL(10, 2)
);

-- Tabela DailyEntry
CREATE TABLE DailyEntry (
    Date DATE NOT NULL,
    ID_DEPT INT NOT NULL,
    MONTANT DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (Date) REFERENCES DailyTotals(Date),
    FOREIGN KEY (ID_DEPT) REFERENCES Departements(ID),
    PRIMARY KEY (Date, ID_DEPT)
);

-- Tabela Periode
CREATE TABLE Periode (
    ID_Periode INT AUTO_INCREMENT PRIMARY KEY,
    TypePeriode VARCHAR(255) NOT NULL,
    DateDebut DATE,
    Mois INT,
    Trimestre INT,
    Année INT NOT NULL
);

-- Tabela TotalDansLaPeriode
CREATE TABLE TotalDansLaPeriode (
    TypedeLigne VARCHAR(255) NOT NULL,
    ID_Periode INT NOT NULL,
    Totalization DECIMAL(10, 2),
    FOREIGN KEY (ID_Periode) REFERENCES Periode(ID_Periode),
    PRIMARY KEY (TypedeLigne, ID_Periode)
);

-- Tabela de associação TotalizeTotal
CREATE TABLE TotalizeTotal (
    Date DATE NOT NULL,
    TypedeLigne VARCHAR(255) NOT NULL,
    ID_Periode INT NOT NULL,
    FOREIGN KEY (Date) REFERENCES DailyTotals(Date),
    FOREIGN KEY (TypedeLigne, ID_Periode) REFERENCES TotalDansLaPeriode(TypedeLigne, ID_Periode),
    PRIMARY KEY (Date, TypedeLigne, ID_Periode)
);

-- Tabela de associação TotalizeEntry
CREATE TABLE TotalizeEntry (
    Date DATE NOT NULL,
    ID_DEPT INT NOT NULL,
    TypedeLigne VARCHAR(255) NOT NULL,
    ID_Periode INT NOT NULL,
    FOREIGN KEY (Date, ID_DEPT) REFERENCES DailyEntry(Date, ID_DEPT),
    FOREIGN KEY (TypedeLigne, ID_Periode) REFERENCES TotalDansLaPeriode(TypedeLigne, ID_Periode),
    PRIMARY KEY (Date, ID_DEPT, TypedeLigne, ID_Periode)
);