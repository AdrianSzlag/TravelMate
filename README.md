# Bookable

![image](https://github.com/AdrianSzlag/TravelMate/assets/92638498/1210c3c0-bf1e-4f52-82f0-6da47b22fb33)

Bookable is a MERN stack application that offers an all-in-one platform for booking a variety of services from places like hotels, restaurants, barber shops, and more. Its intuitive design and seamless user interface make it easy for you to plan your travel itinerary with the convenience you've always wished for.

## Features

- Responsive Design: Optimized for both desktop and mobile devices.
- Book hotels, restaurants, bars, barber shops, and many more with just a few clicks.
- View menus in restaurants and bars.
- Compare and choose the best services based on ratings and reviews.
- Geolocation and mapping through the MapLibre API.
- JWT-based authentication system.
- Scalable design.
- State management using Redux.
- Dockerized for easy setup and deployment.
- Uses Tailwind CSS for a modern and responsive design.
- Written in TypeScript for static typing.

<p float="left">
  <img src="https://github.com/AdrianSzlag/TravelMate/assets/92638498/d7ffc29f-87e7-4c40-b8d4-fc36f09644a2" width="320px" />
  <img src="https://github.com/AdrianSzlag/TravelMate/assets/92638498/03bdd609-b420-45db-858c-179a8d0e2a08" width="320px" /> 
  <img src="https://github.com/AdrianSzlag/TravelMate/assets/92638498/04ca7ff2-9316-485a-9119-316c07962daf" width="320px" />
</p>

## Technologies Used

- MongoDB: A NoSQL database used for storing and retrieving data.
- Express.js: A flexible web application framework for Node.js.
- React.js: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment used for server-side development.
- JSON Web Tokens (JWT): A standard for securely transmitting information between parties.
- Tailwind CSS: A utility-first CSS framework that enables rapid and flexible UI development.
- Redux: A predictable state container for JavaScript applications, used for efficient state management.
- Docker: A platform that allows applications to be packaged and run in isolated containers, ensuring consistency across different environments.
- MapLibre: An open-source mapping library for geolocation features.

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

### Happy Travelling!
