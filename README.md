# Serverless Challenge

## Hello, this is my serverless challenge! 

### Serverless architecture
![My architecture for an AWS Serverless Api](https://i.ibb.co/tLW9LPG/Serverless-Challenge.png)

### Execution
With this API you can get, create, update and delete an employee from an company. 
In order to test it, you must first
1. Import the postman collection into your postman environment
2. Insert one employee according to the POST Insert one employee definition on the postman file
3. Insert one employee again
4. Use the GET GetEmployees postman definition to get all the employees
5. Use the PUT Update Employee postman definition to update a employee, based on the employeeId of one of the returned employees in the previous step
6. Use the PATCH Patch Employee postman definition to update a employee, based on the employeeId of one of the returned employees in the previous step. You can choose which attributes you want to update (be it age, name or position)
7. Use the GET Get one employee postman definition to retrieve data from the updated employee, based on the employeeId of one of the returned employees in the previous step
8. Use the DELETE Delete employee postman definition to delete data from one of the created employees, based on the employeeId of one of the returned employees on step 4.
9. Done! You have fully explored the API :smiley:

PS:  if you want a visual representation of the API methods, please check the Swagger docs as described below.

### Deploy and tests
In order to deploy, please type the specified command: `sls deploy`
In order to test the application, please type the specified command: `sls invoke test`


### Docs
- Swagger docs:
-- [JSON](https://github.com/HaroldBeyer/serverless-challenge/blob/997683b18d459dfc4ffbdf9101eac1fa1a2058bc/swagger.json)
-- [YAML](https://github.com/HaroldBeyer/serverless-challenge/blob/997683b18d459dfc4ffbdf9101eac1fa1a2058bc/swagger.yaml)
- [Postman collection](https://github.com/HaroldBeyer/serverless-challenge/blob/997683b18d459dfc4ffbdf9101eac1fa1a2058bc/Stefanini.postman_collection.json)
- Architecture
-- [Draw.io file](https://github.com/HaroldBeyer/serverless-challenge/blob/23490d71c3f6f0fb85b3852de5be994406ce5351/Serverless%20Challenge.drawio)
-- [Pdf](https://github.com/HaroldBeyer/serverless-challenge/blob/23490d71c3f6f0fb85b3852de5be994406ce5351/Serverless%20Challenge.pdf)
