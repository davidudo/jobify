# Jobify

Jobify is a fullstack web application where users can post job vacancies. This website is my first MERN stack web application. I built it to understand how to create MERN apps that can perform basic CRUD and authentication operations.

## Technologies Used
- NodeJS
- ExpressJS
- React
- MongoDB
- Mongoose
- Styled Components
- Helmet
- XSS Clean
- Express MongoDB Sanitize

## Screenshots

### Main Dashboard
![Dashboard](screenshots/dashboard.png)

### All Jobs Page
![All Jobs Page](screenshots/all-jobs.png)

### Add Job Page
![Add Job Page](screenshots/add-job.png)

### Update Profile Page
![Update Profile Page](screenshots/update-profile.png)

## Usage

- Create a `.env` file and add the below to the file
  ```
  PORT=4000 
  MONGO_URL=mongodb+srv://david_udo:Deanbolt3717*@nodewebprojects.kkmg6.mongodb.net/JobifyWebApp?retryWrites=true&w=majority
  JWT_SECRET=8y/B?E(H+MbQeThWmYq3t6w9z$C&F)J@
  JWT_LIFETIME='1d'
  ```

- To run only the client i.e the frontend application only, use
  ```bash
  npm run client
  ```

- To run only the server i.e the backend application only, use
  ```bash
  npm run server
  ```
- To run both the client and server of the application, use
  ```bash
  npm run start:dev
  ```

## Useful Websites
Below are all the websites that I used while building Jobify.

- [www.favicon.io](www.favicon.io)
- [www.undraw.com](www.undraw.com) 
- [www.allkeysgenerator.com](www.allkeysgenerator.com)
- [www.jwt.io](www.jwt.io)
- [www.mockaroo.com](www.mockaroo.com)
