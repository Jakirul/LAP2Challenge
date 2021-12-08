# LAP 2 Pair Task - Anonymous Posting
### By Guy Margalith and Jakirul Islam

## Description
This task was to create a web application similar to [Telegraph](https://telegra.ph/). We had to allow the user to create a post with a title, a pseudonym and a body which does not  require any login. Once they hit publish, the post should be stored in a database and the client should be redirected to a show path.

## Installation & Usage
### Docker
- In the **root directory**, run `bash _scripts/startDB.sh` or `docker compose up`. This should install all required dependencies (if not installed already) and make the application available on port `8080`
### Usage
- To use the program, run the above command and go to `localhost:8080`
- To remove all docker instances, run `bash _scripts/teardown.sh` or `docker compose down --volumes --remove-orphans` in the **root directory** 

## Technologies
 - HTML / CSS
 - JavaScript
 - Docker
 - Postgres
 - Node.js
 - Express.js
 - Cors
 - Nodemon
 - Bundles

## Changelog
- Got docker compose working properly
- Successfully got the server to run
- Added a database schema and Post model file
	- Completed the post model file at a later time
	- Linked Postgres to work as expected
- Started the front end design
	- Fetched the required routes to allow users to interact with the database
## Bugs
- None at the moment

## Wins & Challenges
### Wins
- Routes worked successfully
- POSTing and GETing worked from a Postgres database
### Challenges
- The port `8080` would sometimes not post or retrieve posts properly while live server/opening the HTML file manually would work. This issue fixed itself
