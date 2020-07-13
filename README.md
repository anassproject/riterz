## Riterz App
Riterz is a fullstack MERN stack app that enables amateur writers to either browse, or register and publish their own works or both!

### the backend:
In the backend side I started by creating a simple REST API to perform the necessary data manipulation actions that will be sent through axios request on the frontend, the database used is MongoDB abviously, hosted on the cloud.

#### 1 - BooksRoute:
there are of course two types of routes in here, private and public.
Private routes require a valid user token which is assigned whenever a previously registered user is logged in, actions which require a JWT token are: **displaying of the user's saved books, creating, editing and deleting a book** while fetching the published books or a specific book is available without a token or being registered.

#### 2 - userRoute:
includes only two post routes, a register and a login route.
- in the register route we validate the form, check if the email already belongs to another account, then encrypt the password, create and save the new user to the database (using Mongoose ODM and MongoDB Atlas cloud database)
- as for the login route, we validate form once again, and check if the email exists and the password is correct, if all is well we send a generated token as a response, which will be caught and stored in the local storage in the frontend, to pass as a header when performing private action and to identify the user performing the action of course, otherwhise we return an error with user friendly text describing the issue.

### the frontend:
the frontend is fairly simple, I used React router to manage the routing and axios to send requests to the backend API, in case there is a private action involved we get the user token from the local storage after it has been assigned when the user logged in, then we pass the token in the header of the axios request for a successful authentication.

The project is hosted on Heroku: [here](https://riterz.herokuapp.com/).
