Feature: Functional Testing for Application

# Login function and its test cases
#@functional
Scenario: User Authentication _ Positive
Given User navigates to the login page
When User enters a valid username
And User enters a valid password
And User clicks the Login button
Then User should be redirected to the homepage
Then User click on logout

#@functional
Scenario: User Authentication _ Negative_Invalid Username
Given User navigates to the login page
When User enters an invalid username
And User enters a valid password
Then User clicks the Login button and capture error message

#@functional
Scenario: User Authentication _ Negative_Invalid password
Given User navigates to the login page
When User enters a valid username
And User enters an invalid password
Then User clicks the Login button and capture error message

#@functional
Scenario: Login attempt with empty username and password fields
Given User navigates to the login page
When the username field is left empty
And the password field is left empty
Then the Login button should be disabled


#Register and its functions
#Toggle between login and register

#Add product function

#best with less number of data 
#@functional
Scenario: Add product_ Positive flow
Given User logs into the app dashboard
When User clicks on Add product
And User enters product details: name, description, price, discount, and upload an image
And User clicks on the Add Product button and confirm success message
Then User confirms the product data is present in the dashboard
Then User click on logout

#@functional
Scenario: Add product_ Negative_No Product Name
Given User logs into the app dashboard
When User clicks on Add product
And User enters product details without a product name: description, price, discount, and uploads an image
Then User verifies that the Add Product button is disabled and click on cancel button
Then User click on logout

#@functional
Scenario: Add product_ Negative_No Product Description
Given User logs into the app dashboard
When User clicks on Add product
And User enters product details without a product description: product name, price, discount, and uploads an image
Then User verifies that the Add Product button is disabled and click on cancel button
Then User click on logout

#@functional
Scenario: Add product_ Negative_No Product price
Given User logs into the app dashboard
When User clicks on Add product
And User enters product details without a price: product name, description, discount, and uploads an image
Then User verifies that the Add Product button is disabled and click on cancel button
Then User click on logout

#@functional
Scenario: Add product_ Negative_No Product discount
Given User logs into the app dashboard
When User clicks on Add product
And User enters product details without a discount: product name, description, price, and uploads an image
Then User verifies that the Add Product button is disabled and click on cancel button
Then User click on logout

#@functional
Scenario: Add product_ Negative_No upload Image
Given User logs into the app dashboard
When User clicks on Add product
And User enters product details without a image: product name, description, price, and discount
Then User verifies that the Add Product button is disabled and click on cancel button
Then User click on logout

#Edit Feature

#@functional
Scenario: Edit product_ Positive flow
Given User logs into the app dashboard
When User clicks on Edit product
And User changes all  product details: name, description, price, discount, and upload an image
And User clicks on the Edit Product button and confirm success message
Then User confirms the product data is present in the dashboard after edit
Then User click on logout

#@functional
Scenario: Edit product_ Without and with changing Product Name_Positive
Given User logs into the app dashboard
When User clicks on Edit product
And User remove the Product Name
Then User verifies that the Edit Product button is disabled and cancel button Enabled
When User clicks on Edit product
And User change only  Product Name
And User clicks on the Edit Product button and confirm success message
Then User confirms the product data is present in the dashboard after name
Then User click on logout

#@functional
Scenario: Edit product_ Without and with changing Product Description _Positive
Given User logs into the app dashboard
When User clicks on Edit product
And User remove the Product Description
Then User verifies that the Edit Product button is disabled and cancel button Enabled
When User clicks on Edit product
And User change only  Product Description
And User clicks on the Edit Product button and confirm success message
Then User confirms the product data is present in the dashboard after description
Then User click on logout

#@functional
Scenario: Edit product_ Without and with changing Product Price _Positive
Given User logs into the app dashboard
When User clicks on Edit product
And User remove the Product Price
Then User verifies that the Edit Product button is disabled and cancel button Enabled
When User clicks on Edit product
And User change only  Product Price
And User clicks on the Edit Product button and confirm success message
Then User confirms the product data is present in the dashboard after price
Then User click on logout

#@functional
Scenario: Edit product_ Without and with changing Product Discount _Positive
Given User logs into the app dashboard
When User clicks on Edit product
And User remove the Product Discount
Then User verifies that the Edit Product button is disabled and cancel button Enabled
When User clicks on Edit product
And User change only  Product Discount
And User clicks on the Edit Product button and confirm success message
Then User confirms the product data is present in the dashboard after discount
Then User click on logout

#@functional
Scenario: Delete with Multiple Product_Positive
Given User logs into the app dashboard
When User clicks on Delete product
Then User verify popup message
Then User click on logout

@functional
Scenario: Delete with Single Product_Positive
Given User logs into the app dashboard
When User clicks on Delete product
Then User verify popup message
Then User click on logout



#@functional , #Register and its functions
#Toggle between login and register
Scenario: Add produc/Edit Product_ Field Validation
Given User logs into the app dashboard
When User clicks on Add product
And User do field validation for product name
And User do field validation for product description
And User do field validation for product price
And User do field validation for product discount
And User do field validation for upload image
And user click on cancel button

#@functional -- not able to remove screenshot
Scenario: Edit product_ Without and with changing Product Image _Positive
Given User logs into the app dashboard
When User clicks on Edit product
And User remove the Product Image
Then User verifies that the Edit Product button is disabled and cancel button Enabled
When User clicks on Edit product
And User change only  Product Image
And User clicks on the Edit Product button and confirm success message
Then User confirms the product data is present in the dashboard after Image
Then User click on logout

