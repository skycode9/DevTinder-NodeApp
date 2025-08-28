## Homework

- Create a repository
- Initiliize the repossitory
- npm init -y (package.json)
- Create src/app.js file
- npm i express (node_modules, package-lock.json, check the dependenci in package.json)
- Create a server (const app = require('express'))
- Listen to port 3030
- Write a request handler for "/", "/test", "/hello"
- Install nodemon and update the scripts inside the package.json
- What are the dependencies in package.json?
- What is the "-g" flag in npm i nodemon?
- What is diffrence between ~ and ^ in package.json?
- What is the difference between devDependencies and dependencies?
- What is the difference between package.json and package-lock.json?

## Routes and Request Handlers

- Play with the routes and route extensions ex. '/hello', '/', '/hello/2'
- Order of the routes matter most.
- Install a Postman and make a workspace/collection > Test API calls
- Write the logic of GET, POST, PUT, DELETE, PATCH API calls and test them in Postman
- Exploren rounting and use of ?, +, \*, (), | in the routes
- Use of regex in the routes /a/, /\*fly$/
- Reading the query parmas ?name=akash&age=22 in the route
- Reading the route parameters /:name/:age --> Dynamic Routes

## Middlewares and Error Handlers

- Multiple routes with the handler play with code
- next()
- next functions and errors along with res.send()
- app.use("/route", rH, [rh1,rh2] ,rh3, rh4);
- What is Middleware? and why we use it?
- Diffrence between app.use and app.all
- Write a dummy auth middleware and test it for admin and user routes
- Error Handling with app.use(err, req, res, next) and try catch method

## Database & Schema, Models and Mongoose

- Create a free culster on a MongoDB website
- Install a mongoose liabrary (npm i mongoose)
- Connect your application to the Database --> <ConnectionURL>/DBname
- Call the ConnectDB fn and connect the Databse and after run the application on port like 3030
- Create a UserSchema and UserModel
- Create POST/SignUp API to add data to the Database
- Push some documents using API calls from postman
