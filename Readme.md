# API

Creating a rest api in nodejs........

To run this application, you must have docker installed on your machine

## Getting Started

### Launch app

#### build project
```
docker compose build
```

#### install dependencies
```
docker compose run app npm install
```

#### up project
```
docker compose up
```

### After launch app run
Use postman or equivalent software to make server requests.
#### Endpoint:
##### [POST] /blacklist
Allows you to add a number to the blacklist or not

body example: 
```
{
    "From": "+33753183607",
    "Message": "STOP"
}
```
response:
```
{
    "message": "Number added in the blacklist"
}
```

##### [GET] /blacklist
Retrieve blacklisted numbers

##### [POST] /blacklist/check
Check if a number is blacklisted

body example:
```
{
    "phoneNumber": "+33753183607"
}
```
response:
```
{
    "blacklisted": true
}
```

link useful:
- mongo-express -> http://localhost:8081


## Command useful

### Build project

```
docker compose build
```

### Up project

```
docker compose up
```

### Down container

```
docker compose down
```

### Run command inside a container app

```
docker compose run app sh
```