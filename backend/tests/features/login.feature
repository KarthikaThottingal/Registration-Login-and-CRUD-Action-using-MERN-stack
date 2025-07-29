Feature: API Testing for login functionality
#@api
Scenario:Successful login with valid credentials POST_login
When User send a POST request to "/login" request with correct credentials
Then User Validate the response statuscode should be 200
Then User Validate response should include a token, status true and message "Login Successfully."

#@api
Scenario:Login with invalid username POST_login_ Negative
When User send a POST request to "/login" request with invalid username
Then User Validate the response statuscode should be 400
Then User Validate response should include a status false and message "Username or password is incorrect!"

#@api
Scenario:Login with invalid password POST_login_ Negative
When User send a POST request to "/login" request with invalid password
Then User Validate the response statuscode should be 400
Then User Validate response should include a status false and message "Username or password is incorrect!"

#@api
Scenario:Login with empty username and password fields POST_login_ Negative
When User send a POST request to "/login" request with empty username and password
Then User Validate the response statuscode should be 400
Then User Validate response should include a status false and message "Add proper parameter first!"

#@api
Scenario:Login with error_No request body _ POST_login_ Negative
When User send a POST request to "/login" request with No request body
Then User Validate the response statuscode should be 400
Then User Validate response should include a status false and message "Add proper parameter first!"
