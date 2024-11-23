SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

USE ConvexityDB;

DROP TABLE IF EXISTS Passwords;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS UserTeams;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Timeslots;
DROP TABLE IF EXISTS EventTimeslots;
DROP TABLE IF EXISTS TeamEvents;

-- Passwords --

CREATE TABLE Passwords (
    PasswordID INT NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PRIMARY KEY (PasswordID),
    UNIQUE INDEX PasswordID_UNIQUE (PasswordID) INVISIBLE
);

-- Users --

CREATE TABLE Users (
    UserID INT NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(45) NOT NULL,
    PasswordID INT NOT NULL,
    UNIQUE INDEX Username_UNIQUE (Username),
    PRIMARY KEY (UserID),
    UNIQUE INDEX UserID_UNIQUE (UserID),
    INDEX fk_Passwords_Passwords_idx (PasswordID),
    CONSTRAINT fk_Passwords_Passwords
        FOREIGN KEY (PasswordID)
        REFERENCES Passwords (PasswordID)
);

-- Teams --

CREATE TABLE Teams (
    TeamID INT NOT NULL,
    TeamName VARCHAR(255) NOT NULL,
    TeamLeaderID INT NOT NULL,
    PRIMARY KEY (TeamID),
    UNIQUE INDEX TeamID_UNIQUE (TeamID),
    UNIQUE INDEX TeamName_UNIQUE (TeamName)
);

-- UserTeams --

CREATE TABLE UserTeams (
    UserTeamID INT NOT NULL,
    UserID INT NOT NULL,
    TeamID INT NOT NULL,
    PRIMARY KEY (UserTeamID),
    UNIQUE INDEX UserTeamID_UNIQUE (UserTeamID),
    INDEX fk_UserTeams_Users1_idx (UserID),
    INDEX fk_UserTeams_Teams1_idx (TeamID),
    CONSTRAINT fk_UserTeams_Users1
        FOREIGN KEY (UserID)
        REFERENCES Users (UserID),
    CONSTRAINT fk_UserTeams_Teams1
        FOREIGN KEY (TeamID)
        REFERENCES Teams (TeamID)
);

-- Events --

CREATE TABLE Events (
    EventID INT NOT NULL,
    EventName VARCHAR(255) NOT NULL,
    PRIMARY KEY (EventID)
);

-- Timeslots --

CREATE TABLE Timeslots (
    TimeslotID INT NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NULL,
    PRIMARY KEY (TimeslotID),
    UNIQUE INDEX TimeslotID_UNIQUE (TimeslotID)
);

-- EventTimeslots --

CREATE TABLE EventTimeslots (
    EventTimeslotID INT NOT NULL,
    EventID INT NOT NULL,
    TimeslotID INT NOT NULL,
    PRIMARY KEY (EventTimeslotID),
    UNIQUE INDEX EventTimeslotID_UNIQUE (EventTimeslotID),
    INDEX fk_EventTimeslots_Events1_idx (EventID),
    INDEX fk_EventTimeslots_Timeslots1_idx (TimeslotID),
    CONSTRAINT fk_EventTimeslots_Events1
        FOREIGN KEY (EventID)
        REFERENCES Events (EventID),
    CONSTRAINT fk_EventTimeslots_Timeslots1
        FOREIGN KEY (TimeslotID)
        REFERENCES Timeslots (TimeslotID)
);

-- TeamEvents --

CREATE TABLE TeamEvents (
    TeamEventID INT NOT NULL,
    TeamID INT NOT NULL,
    EventID INT NOT NULL,
    PRIMARY KEY (TeamEventID),
    UNIQUE INDEX TeamEventID_UNIQUE (TeamEventID),
    INDEX fk_TeamEvents_Teams1_idx (TeamID),
    INDEX fk_TeamEvents_Events1_idx (EventID),
    CONSTRAINT fk_TeamEvents_Teams1
        FOREIGN KEY (TeamID)
        REFERENCES Teams (TeamID),
    CONSTRAINT fk_TeamEvents_Events1
        FOREIGN KEY (EventID)
        REFERENCES Events (EventID)
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;