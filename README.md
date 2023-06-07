# Travel Mate
Travel Mate is a MERN stack application that provides you with an all-in-one platform to book your travel experiences including hotels, restaurants, bars, barber shops, and various other services. Its intuitive design and seamless user interface make it easy for you to plan your travel itinerary with the convenience you've always wished for.

## Features
* Book hotels, restaurants, bars, barber shops, and many more with just a few clicks.
* View menus in various restaurants and bars.
* Compare and choose the best services based on ratings and reviews.
* JWT-based authentication system.
* Robust and scalable design.
* State management using Redux.
* Dockerized for easy setup and deployment.
* Uses Tailwind CSS for a modern and responsive design.
* Written in TypeScript for static typing.

## Technologies Used
* MongoDB: A NoSQL database used for storing and retrieving data.
* Express.js: A flexible web application framework for Node.js.
* React.js: A JavaScript library for building user interfaces.
* Node.js: A JavaScript runtime environment used for server-side development.
* JSON Web Tokens (JWT): A standard for securely transmitting information between parties.
* Tailwind CSS: A utility-first CSS framework that enables rapid and flexible UI development.
* Redux: A predictable state container for JavaScript applications, used for efficient state management.
* Docker: A platform that allows applications to be packaged and run in isolated containers, ensuring consistency across different environments.

## Setup & Installation
The application is dockerized, so you can get it up and running with Docker installed.

Step 1: Clone the repository to your local machine.
```
git clone https://github.com/AdrianSzlag/bookingApp.git
cd bookingApp
```
Step 2: Set the required .env variables in the backend folder.
```
JWT_SECRET=<your JWT secret> 
```
Step 3: Start the Docker services:
```
docker-compose up
```

## Running the App
Once the Docker containers are up, the application should be available at http://localhost:5173

## Usage
To start using the app, you first need to create an account. Click on the 'Sign up' button and fill out the form. Once registered, you can log in using the 'Sign in' button.

After logging in, you can start exploring the various features of Travel Mate. Browse through the list of services, check out menus, make bookings, and manage your bookings all through the app.

## Contributing
We love your input! We want to make contributing to this project as easy and transparent as possible. If you want to report a bug or submit your ideas, feel free to open an issue.

### Happy Travelling!
