DROP DATABASE chessDB;
CREATE DATABASE chessDB;
USE chessDB;

DROP TABLE IF EXISTS `games`;
DROP TABLE IF EXISTS `moves`;

CREATE TABLE `games` (
  `gameID` int(11) NOT NULL AUTO_INCREMENT,
  `player1` varchar(45) NOT NULL,
  `player2` varchar(45) NOT NULL,
  PRIMARY KEY (`gameID`)
);

CREATE TABLE `moves` (
  `gameID` int(11) NOT NULL AUTO_INCREMENT,
  `playerID` varchar(45) NOT NULL,
  `move` varchar(100) DEFAULT NULL,
);

CREATE TABLE `players` (
  `playerID` varchar(45) NOT NULL,
  PRIMARY KEY (`playerID`)
);

CREATE TABLE 'users' (
  'userName' varchar(16) NOT NULL,
  'password' varchar(20) NOT NULL
)
