CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    pseudonym VARCHAR(255),
    body VARCHAR(255),
    date DATE
);

INSERT INTO posts(title, pseudonym, body, date)
VALUES
    ('test title', 'batman', 'this is a test title', '2021-12-08'),
    ('test title2', 'robin', 'this is another test title', '2021-12-08');
