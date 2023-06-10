GRANT ALL PRIVILEGES ON sinemuscat.* TO 'root'@'localhost' IDENTIFIED BY '0000';

create database sinemuscat character set=utf8;

create table sinemuscat.USER {
    user_id VARCHAR(20) primary key,
    password    VARCHAR(20),
    name   VARCHAR(20),
    gender VARCHAR(1),
    birth date,
    phoneNumber VARCHAR(20),
    email VARCHAR(50),
    walletAddress VARCHAR(50),
    registerDate datetime,
    sns VARCHAR(10),
    totalPoints INT,
    unique key(user_id, email, phoneNumber)
} engine=InnoDB character set = utf8;