<h1 align="center">
  🏦 Bank Account Kata 🏦
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&amp;logo=typescript&amp;logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&amp;logo=express&amp;logoColor=%2361DAFB" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&amp;logo=docker&amp;logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&amp;logo=jest&amp;logoColor=white" alt="Jest">
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&amp;logo=eslint&amp;logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white" alt="GitHub Actions">
</p>


##  Technical Decisions
While developing this kata, I made several decisions that I would like to explain in more detail.

### Design Pattern
I followed Domain-Driven Design (DDD) and Hexagonal architecture as design patterns to structure the code and folders. The project consists of two main folders: `app`, which contains all configuration related to the project and entry points such as API controllers, and `Contexts`, which contains all classes related to the business domain. In the `Contexts` folder, we have the following structure:
- `Bank` represents a bounded context.
  - `Account` represents a module.
      - In the `application` folder we have the application services that manage the aggregate root. 
      - In the `domain` folder, we have the aggregate root along with value objects, domain events, domain services, and errors.
      - In the `infrastructure` folder we have the specific implementation of the domain services that are related to the infrastructure.
  - `Shared` represents common classes shared between modules.

### Database Management
I've implemented a real MongoDB database as repository.

### Containerization
A `docker-compose` file was added to contain the database. However, I intended to add the application to the containerization as well.

### Dependency Injection
Dependency injection pattern was implemented using .yml files.

### Linter
ESLint was added as the linter.

### CI/CD Pipeline
A CI/CD Pipeline was established using Github Actions. This pipeline builds the app, runs tests, and performs static analysis.

### Code formater
Prettier was added as the code formatter and integrated with pre-commit hooks.

### Config schema
Configuration by context was implemented using Convict, allowing validation of config files and supporting multiple contexts, such as having an isolated DB for testing purposes.

## Other considerations
There are some features that I couldn't implement due to the scope of the task but would have implemented in a real-world project.

### Event Bus
I would have added an event bus to pull domain events from the aggregate root in the application service and publish them at the end of the service.

### CQRS, Command Bus and Query Bus
Depending on project specifications and needs, I would probably have added these patterns as well.

## How to use

### Steps:
1. Execute `npm i` to install project dependencies.
2. Execute `npm run dev` to start the app.

Additionally, you can execute `npm run` to see all the commands related to the project.
