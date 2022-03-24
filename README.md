# galactic-federation-api

## API

public api url: https://api.galactic-federation.devspot.work

![image](https://user-images.githubusercontent.com/9491277/159808406-4f8c5a11-8e23-4e6f-826a-ada1cd62955e.png)

![image](https://user-images.githubusercontent.com/9491277/159808465-72795173-c6c3-4cdf-a9e7-1010d94aaa9b.png)

endopoints:

POST /topsecret <br/>
POST /topsecret_split/:satellite_name <br/>
GET /topsecret_split <br/>
DELETE /topsecret_split <br/>

postman collection:

https://documenter.getpostman.com/view/5573967/UVsTp22U

You can use this postman collection to facilitate testing the public endpoint with Curl or you prefered language.

![image](https://user-images.githubusercontent.com/9491277/159820344-1647ddf3-443c-49b7-a785-6dc8d1cf6ce3.png)


## Program:

the program version consumes a json file in the path program\satellites.json. You can modify the values as your preference.

![image](https://user-images.githubusercontent.com/9491277/159822018-c7c2f78e-45e8-4573-9f71-df9602a19777.png)


to run the program:

1. npm install

2.- "npm run program message" to calculate the message

![image](https://user-images.githubusercontent.com/9491277/159821899-5416dee2-de7f-4ef7-a5ab-d6eaecace844.png)


"npm run program location" to calculate the location

![image](https://user-images.githubusercontent.com/9491277/159821939-f0c8dcae-f337-4fc2-b5d5-04ad5a5aa841.png)




## libraries
Typescript\
express.js\
morgan\
jest\
ts-node-dev\

## deployment tools

Docker\
Docker Compose\
Kubernetes\

## API publishing

The API is published in a GCloud kubernetes instance\
The URL was assigned in godaddy under the domain devspot.work\
A SSL certificate was issued with the help of letsencrypt, certmanager and kubernetes for: api.galactic-federation.devspot.work
Http redirects to https

## good practices

Clean Architecture: application and domain layers were merged into "core" folder for simplicity in this project\
Solid principles\
Test Driven Development\: "npm run test" to run tests :) \


