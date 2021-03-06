CREATE TABLE IF NOT EXISTS TileUsers (
    Email VARCHAR(50) NOT NULL,
    Password VARCHAR(500) NOT NULL,
    FullName VARCHAR(50) NOT NULL,
    Role INT NOT NULL,

    PRIMARY KEY (Email)
);

CREATE TABLE IF NOT EXISTS SessionIDs (
    Email VARCHAR(50) NOT NULL,
    SessionID VARCHAR(1000) NOT NULL,

    PRIMARY KEY (Email, SessionID),
    FOREIGN KEY (Email) REFERENCES TileUsers(Email)
);

CREATE TABLE IF NOT EXISTS PhoneNumbers (
    Email VARCHAR(50) NOT NULL,
    TelephoneNumber VARCHAR(50) NOT NULL,
    PRIMARY KEY (Email, TelephoneNumber),
    FOREIGN KEY (Email) REFERENCES TileUsers(Email)
);

CREATE TABLE IF NOT EXISTS Departments (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Manager VARCHAR(50) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (Manager) REFERENCES TileUsers(Email)
);

CREATE TABLE IF NOT EXISTS Recipes (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Size VARCHAR(50) NOT NULL,
    CreationDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CreatedBy VARCHAR(50) NOT NULL,

    MoldShape VARCHAR(50),
    BakerName VARCHAR(50),
    InitTemp FLOAT,
    Humidity FLOAT,
    DryingDuration TIME,
    DryingTemp FLOAT,
    BakingDuration TIME,
    BakingTemp FLOAT,
    PreviousVersion INT,
    Approved BOOLEAN,

    PRIMARY KEY (ID),
    FOREIGN KEY (PreviousVersion) REFERENCES Recipes(ID),
    FOREIGN KEY (CreatedBy) REFERENCES TileUsers(Email)
);

CREATE TABLE IF NOT EXISTS ApprovedRecipes (
    ID INT NOT NULL,
    ApprovalDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),
    FOREIGN KEY (ID) REFERENCES Recipes(ID)
);

CREATE TABLE IF NOT EXISTS UnapprovedRecipes (
    ID INT NOT NULL,

    CorrectionRequested TEXT,
    IsRejected BOOLEAN NOT NULL DEFAULT 0,

    PRIMARY KEY (ID),
    FOREIGN KEY (ID) REFERENCES Recipes(ID)
);

CREATE TABLE IF NOT EXISTS Materials (
    Code INT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Price FLOAT NOT NULL,
    Company VARCHAR(50) NOT NULL,
    Alternative INT,

    PRIMARY KEY (Code),
    FOREIGN KEY (Alternative) REFERENCES Materials(Code)
);

CREATE TABLE IF NOT EXISTS Comments (
    ByManager VARCHAR(50) NOT NULL,
    RecipeID INT NOT NULL,
    
    Comment TEXT,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ByManager, RecipeID),
    FOREIGN KEY (ByManager) REFERENCES TileUsers(Email),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(ID)
);

CREATE TABLE IF NOT EXISTS ContainsPaints (
    RecipeID INT NOT NULL,
    MaterialCode INT NOT NULL,
    
    Grammage FLOAT,

    PRIMARY KEY (RecipeID, MaterialCode),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(ID),
    FOREIGN KEY (MaterialCode) REFERENCES Materials(Code)
);

CREATE TABLE IF NOT EXISTS ContainsMaterials (
    RecipeID INT NOT NULL,
    MaterialCode INT NOT NULL,
    
    Amount FLOAT,
    WaterContent FLOAT,
    Density FLOAT,
    Viscosity FLOAT,
    ApplicationType VARCHAR(50),

    PRIMARY KEY (RecipeID, MaterialCode),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(ID),
    FOREIGN KEY (MaterialCode) REFERENCES Materials(Code)
);

