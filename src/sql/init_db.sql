CREATE TABLE IF NOT EXISTS users
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE,
);

INSERT INTO users ("login", "password", "age", "isDeleted")
VALUES
    ('user1', 'pass1', 25, false),
    ('user2', 'pass2', 30, false),
    ('user3', 'pass3', 35, false);
