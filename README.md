# Semester Project 2 - AuctionZone

## Project Description
This is my submission for Semester Project 2. We were tasked with creating an auction site where users can place bids on listings using credits. 
Any feedback is appreciated. This is an school project so contributions is not accepted.

## Workflow Tech Stack
Here is an overview of the different tools that were used to complete this project:

**Planning tools:**
- Trello (with a Gantt plugin to create Gantt charts)

**Design:**
- Figma

**Coding:**
- HTML
- JavaScript
- SASS
- Bootstrap
- Node

**Hosting:**
- Netlify: https://dreamy-palmier-2e3ff8.netlify.app/

## Project Setup
- Clone this repository: [https://github.com/Noroff-Anders/Semester-project-2.git](https://github.com/Noroff-Anders/Semester-project-2.git)
- In the terminal, run the following commands:
  - To install all dependencies: `npm install`
  - To run the project: `npm start`
  - For compiling Sass to CSS: `npm run build`
  - Command for Sass to watch for changes: `npm run watch`

## How AuctionZone Works
AuctionZone is a place where users can bid on each other's listings using credits. A user has to register with a Noroff.no or stud.noroff.no email to start bidding. Users are credited with 1000 tokens at signup for bidding.

**User Stories:**

When the user is logged in:
- A user can log in or register with a Noroff email.
- A user can bid on other users' listings. The bid amount has to be higher than the highest bid and lower than the user's current available credits. If the end date of the listing is older than today's date, the user cannot bid on the listing.
- A user can also view other bids on a listing.
- A user can create listings with a title, description, media, and an end date. Only the title and end date are required.
- A user can update the user's avatar on the profile page by clicking the username in the navbar.
- The user's credits will always be visible in the navbar. If a user makes a bid, the input value is removed from local storage data and updated in the nav.
- The user can log out with the logout button in the navbar.
- A user can delete their own listings on the profile page. (Note: there is an error when the user deletes a post; the profile page will not reload. The post is, however, deleted and may cause some confusion for the user).

A user that is not logged in:
- Can see and open the listings but cannot place bids.
- Can search through the listings.


