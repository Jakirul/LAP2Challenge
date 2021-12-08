CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    pseudonym VARCHAR(255),
    body VARCHAR(255)
)

INSERT INTO posts(title, pseudonym, body)
VALUES
    ('test title', 'batman', 'this is a test title'),
    ('test title2', 'robin', 'this is another test title');
