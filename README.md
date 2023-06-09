# What I did for this project
In this project I was responsible for the following parts:
- Server setup, the base of the server and later the configuration to easily switch between two databases, one that uses an ORM and one that uses SQL queries.
- The base OOP structure, Routing, Server setup, layers and classes.
- The posts structure, from creating a post, to getting all the posts etc.
- The session authentication and creation. Both the cookie management and saving the info in a database.
- Unit, Integration and E2E Testing for post and session structure.
- Database configuration and other database management.
- A lot of frontend work.
- Setup for sequelize models.
- Bug fixing and helping other with their code.

## Original Readme:

# SDG Website for our SDG Project

## Description and Usage
Welcome to our Project,
this was made by : 
- Sven Molenaar, 
- Madelief van Slooten, 
- Rowen Zaal, 
- William Nguyen 

The project offers the following features:

- Reading SDG-related news articles
- Reading SDG-related user posts
- Creating your own SDG-related post
- Creating your own account for the site
- Login and Logout with your own account
- Being able to update your account information
- Exploring an information page about the Sustainable Development Goals (SDGs) and how they are defined

Feel free to explore these features and interact with the site. Enjoy your experience!
## Languages
- CSS
- HTML
- JavaScript
- TypeScript

## Frameworks
- Angular
- Sequelize

## Project Setup

### Backend
To set up the backend server, please follow these steps:
1. Clone the repository: `git clone https://gitlab.fdmci.hva.nl/ad-software-development-2223/semester-2-101/database-detectives/backend.git`
2. Navigate to the "backend" directory: `cd backend`
3. Install the necessary dependencies: `npm install`
4. Run `npm start` to start the backend server.

### Frontend
To set up the frontend page, please follow these steps:
1. Clone the repository: `git clone https://gitlab.fdmci.hva.nl/ad-software-development-2223/semester-2-101/database-detectives/frontend.git`
2. Navigate to the "frontend" directory: `cd frontend`
3. Install the necessary dependencies: `npm install`
4. Run `ng serve` to start the frontend server.

### Create Files
Navigate to the backend folder and create a new .env file. Fill in this file according to the template provided in .env-example.

### Additional Commands
While not required, these commands can be useful for using the site and code:

#### Backend
- `npm run build`: Compiles the TypeScript code into JavaScript using the TypeScript compiler.
- `npm run build:live`: Uses Nodemon to watch for changes in the source files and automatically restarts the server.
- `npm run start`: Equivalent to `npm run build:live`.
- `npm run seed`: Fills the Sequelize Database with 10 predefined posts and 4 users.
- `npm run test`: Executes tests for the backend code.
- `npm run e2etest`: Executes an end-to-end test for the code.
