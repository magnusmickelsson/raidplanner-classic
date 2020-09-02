## What is this?

Raidplanner classic is a tool to setup raid composition and assign debuff slots for World of Warcraft classic raids.

## How do I start this thing?

* Git checkout this project to your local machine
* Open your IDE of choice (IDEA Ultimate preferred)
* Import Maven project, preferably setting up Spring Boot plugin
* Create Spring Boot run configuration for the class RaidplannerApplication
* Start the application
* Browse to http://localhost:8080/api/debuff to see all debuffs - if that works you're good to go. Have a look in ApiController for REST endpoints.

## Tech

* Spring Boot
* Kotlin
* Spring MVC REST API
