{
"firstName" : "steve",
"lastName" : "stevenson",
"age": "129",
"fbw": "36",
"profession" : "Musician",
"favoriteBands" : ["Radiohead", "Motorhead", "Machinehead", "The talking heads" ],
"email" : "steve@metallica.com"
}

    Initialize npm into your project with npm init -y
    Install the express.js npm package npm i express
    Create the file server.js

Task 2 - Setting up your server

Create your express.js server in the server.js file
Task 3 - Creating the validateUser endpoint

Create an endpoint which;

    Responds to the path /validateUser
    Responds to POST request methods

Task 4 - Creating middleware

    Create a middleware function that checks the object contains values for the keys firstName, lastName, age, fbw and email

    Create a middleware function that will check if the user is above 18 years old

    If any of the middleware fails, you should send a response with an error message that says why the user is not valid

    Example failure response

    {
      "message": "We can not validate your user. They are  below 18 years of age"
    }

Task 5 - Applying the middleware

    Apply all the middleware you created in Task 4 to the validateUser endpoint

    If the request passes successfully through the middleware, validateUser should send a response with a success message

    Example success response

    {
      "message" : "This user is valid!"
    }

Task 6 - Creating the sanitizeUser endpoint

Create an endpoint which;

    Responds to the path /sanitizeUser
    Responds to POST request methods

Task 7 - Creating middleware

    Create a middleware function that makes the firstName and lastName start with a capital letter
    Create a middleware function that sorts the favoriteBands array alphabetically
    Create a middleware function that will convert age and fbw to numbers

Task 8 - Applying the middleware

    Apply all the middleware you created in Task 7 to the sanitizeUser endpoint

    If the request passes successfully through the middleware, sanitizeUser should send a response with the updated POST data

Example response

{
"firstName" : "Steve",
"lastName" : "Stevenson",
"age": 129,
"fbw": 36,
"profession" : "Musician",
"favoriteBands" : ["Machinehead", "Motorhead", "Radiohead", "The Talking Heads"],
"email" : "steve@steve.com"
}
