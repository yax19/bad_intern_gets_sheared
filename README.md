# The Bad Intern Gets Sheared

## Scenario

Your development team was asked to build a management system for a shepard. It will be used by the shepards to track which of their sheep has been shorn.

Unfortunately due to the team being understaffed, this project was left to the intern to complete and they have done a horrible job. They are *FURIOUS*! The account manager is in the conference room feeding the client donuts from the nearby bakery. The donut supply will be exhausted in 90 minutes. You need to have a working demo ready by then!

### The Client Expectation

When the system is running the client expects to be able to:

1. See a list of all sheep breeds
2. From the list of breeds, see a list of all individual sheep of that breed
3. See a list of all individual sheep
4. Add a sheep to the herd
5. Mark a sheep as sheared or unsheared
6. Remove a sheep from the herd

What they CURRENTLY see:
The system has errors when they try to start it and can get no further. When they last previewed the system, they complained that the logos seemed mis-sized and the actions on the sheep table were not aligned to the right.


### Methodology

1. Study the error message - what is broken and why can't the system turn on?
2. There may be multiple issues with the system that need to be fixed before it starts
3. Once it starts, test each piece of functionality they listed in their expectations. Does it work?

## Learning Goals

This scenario is designed to help practice several skills that you will need working on development teams:

1. Debugging
2. Reading and troubleshooting code written by others
3. Understanding a basic role-based authorization system

## System Setup

### Requirements

* Node 20.x+
* MongoDB 7+

(These are what the application was tested against, it may be possible to run on newer or older Node and MongoDB instances)

### Steps

Working in the ```starter_code``` folder:

1. Install required node packages (```npm i```)
2. Copy the ```.env-sample``` file to ```.env```
3. Update ```.env``` with the correct server addresses, credentials, and values
4. Update the secret value in ```.env```
5. Run the application with ```npm run start```. Note: The *FIRST* time you start the application, it will seed the database with sameple data. This may take some time.

### To Reseed

If you want to reseed the database and/or set it back to the initial state:

1. Stop the application if it is running
2. Run ```npm run reseed``` and it will force a reseed operation

Note: it will NOT reset the users.