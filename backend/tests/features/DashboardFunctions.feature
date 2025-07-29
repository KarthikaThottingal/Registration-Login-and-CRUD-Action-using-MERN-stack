Feature: API Testing for CURD functionality in dashboard
# Add product
Background:
When User send a POST request to "/login" request with correct credentials

@api
Scenario:User add Product with api POST_add-product_Positive
When User send a POST request to "/add-product" request with name, desciption, price, discount, file
Then User Validate the addProductResponse statuscode should be 200, status true and message "Product Added successfully."

@api
Scenario:User add Product with api POST_add-product_ no name_ Negative
When User send a POST request to "/add-product" request with desciption, price, discount, file
Then User Validate the addProductResponse statuscode for product activities should be 400, status false and message "Add proper parameter first!"

@api
Scenario:User add Product with api POST_add-product_ no description Negative
When User send a POST request to "/add-product" request with name, price, discount, file
Then User Validate the addProductResponse statuscode for product activities should be 400, status false and message "Add proper parameter first!"

@api
Scenario:User add Product with api POST_add-product_ no price Negative
When User send a POST request to "/add-product" request with name, desciption, discount, file
Then User Validate the addProductResponse statuscode for product activities should be 400, status false and message "Add proper parameter first!"

@api
Scenario:User add Product with api POST_add-product_ no discount Negative
When User send a POST request to "/add-product" request with name, desciption, price, file
Then User Validate the addProductResponse statuscode for product activities should be 400, status false and message "Add proper parameter first!"

@api
Scenario:User add Product with api POST_add-product_ no file Negative
When User send a POST request to "/add-product" request with name, desciption, price, discount
Then User Validate the addProductResponse statuscode for product activities should be 400, status false and message "Add proper parameter first!"

#To test 'Get/ get_product 
@api
Scenario:User get Product details with api GET_get-product_Positive
When User send a GET request to "/get-product" to fetch all data
Then User Validate the getProductResponse statuscode for product activities should be 200, status true, with data and title "Product retrived."

#To test 'POST/delete_product 

@api
Scenario:User delete Product with api POST_delete-product_Positive
When User send a GET request to "/get-product" to fetch all data
When User send a POST request to "/delete-product" to the first element in the get product list
Then User Validate the deleteProductResponse statuscode for product activities should be 200, status true and title "Product deleted."

@api
Scenario:User delete Product with api POST_delete-product_No Product ID_Negative
When User send a POST request to "/delete-product"  without  product id
Then User Validate the deleteProductResponse statuscode for product activities should be 400, status false and title "Add proper parameter first!"

@api
Scenario:User delete Product with api POST_delete-product_invalid ID
When User send a POST request to "/delete-product" with invalid ID
Then User Validate the deleteProductResponse statuscode for product activities should be 200, status true and title "Product deleted."

#Need special data setup for this
#@api
Scenario: User get Product details  with api GET_get-product_No Data_Negative #to test
When User send a GET request to "/get-product" to fetch all data
Then User Validate the getProductResponse statuscode for product activities should be 400, status false, without data and title "There is no product!"