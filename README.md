# Full Stack Ecommerce Store
This is a full-stack ecommerce project. 

# Features

## Authentication and Authorization
Authentication and authorization have been implemented in this project using JSON Web Tokens (JWT). When a user successfully logs in or signs up, a JWT token is generated on the backend with a 24-hour expiration time. This token is then stored on the frontend and included in subsequent requests to authorize access to protected routes, such as product editing or deletion.<br>

## Password Hashing
Passwords are securely hashed before being inserted into the database. This ensures that even if the database is compromised, the actual passwords remain protected.<br>

## Email and Password Validation
During the signup process, email and password validation has been implemented to ensure data integrity and security. The following requirements are enforced:<br>

**Email validation:** The entered email address must be valid.<br>
**Password validation:** The entered password must meet the following criteria:<br>
 - Minimum length of eight characters.<br>
 - Must contain at least one number.<br>
 - Must contain at least one special character.<br>
 - Must contain at least one uppercase letter.<br>

## *As a User*
As a user, you have access to the following features:

**Dark/Light mode:** You can toggle between dark and light mode for a personalized viewing experience.<br>
**Product View:** You can view products on the website.<br>
**Add to Cart:** You can add products to your cart.<br>
**Cart Page:** You can view the items in your cart and edit product quantity or remove products from your cart.<br>
**Checkout Page:** You can proceed to the checkout page to enter your credit card information and view your card information.<br>


## *As an Admin*
After signing up or loggin in, you have access to the following features:<br>


**Admin Home:** You can sign up or log in to access the admin home.<br>
**Add Products:** You can add new products to the store.<br>
**Edit Products:** You can edit existing products in the store.<br>
**Delete Products:** You can delete products from the store.<br>
**Dark/Light mode:** You can toggle between dark and light mode for a personalized viewing experience.<br>


## Admin Login
To login as an admin, click the "Login" button in the navbar and enter the following credentials:<br>

Username: **test@email.com**<br>
Password: **Example@1**<br>

*Note:* You can sign up as well<br>

## Backend Repository
The backend repository for this project can be found at https://github.com/abdulaimusah/mystore-backend.

## Project URL
The live project can be found at https://mystore-5y1b.onrender.com/

## Technologies Used

- ReactJS: A JavaScript library for building user interfaces.
- ExpressJS: A fast and minimalist web application framework for Node.js.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.
- MongoDB: A popular NoSQL database for storing and retrieving data.
- JSON Web Tokens (JWT): A compact and secure method of representing claims between parties as a JSON object.
- Yup: A JavaScript schema builder for validating and transforming data.
- bcrypt: A library used for hashing passwords and ensuring secure password storage.

These technologies were carefully selected to provide a robust and efficient development environment, as well as to deliver a seamless and responsive user experience.<br>
