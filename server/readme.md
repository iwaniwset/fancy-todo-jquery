# Kanban_App
My Assets App is an application to manage activity
    * RESTful endpoint for asset's CRUD operation
    * JSON formatted response

&nbsp;

## RESTful endpoints

### Method GET /tasks

> Get all assets

_request Header_
`````
{
    "token": "<your access token>"
}
`````

_request Body_
`````
not needed
`````

_Response (200)_
`````
{
    "status": 200,
    "msg": "Success Find ALl",
    "tasks": [
        {
            "id": 6,
            "title": "demo",
            "description": "jangan ada iklan diantara kita",
            "assignTo": "arnold",
            "category": "Backlog",
            "UserId": 1,
            "createdAt": "2020-10-09T13:56:47.339Z",
            "updatedAt": "2020-10-09T14:51:40.979Z"
        }
    ]
}
`````

_Error Response_
`````
> statusCode : 500
    {
        "errors": [
            "internal server error"
        ]
    }
> statusCode : 401
    {
        "errors": [
            "Please Login First"
        ]
    }
`````


### Method POST /tasks

> Get all assets

_request Header_
`````
{
    "token": "<your access token>"
}
`````

_request Body_
`````
    title "<string>",
    description "<string>",
    assignTo "<string>",
    category "<string>",
`````

_Response (201)_
`````
{
    "task": {
        "id": 8,
        "title": "phase1",
        "description": "Mengerjakan movieApps",
        "assignTo": "iwan",
        "category": "Backlog",
        "UserId": 2,
        "updatedAt": "2020-10-09T14:58:42.713Z",
        "createdAt": "2020-10-09T14:58:42.713Z"
    }
}
`````

_Error Response_
`````
> statusCode : 500
    {
        "errors": [
            "internal server error"
        ]
    }
> statusCode : 400 (bad request)
   {
    "errors": [
        "Title is Required",
        "Description is Required",
        "AssignTo is Required",
        "Category is Required"
    ]
}
`````


### Method DELETE /tasks/:id

> Get all assets

_request Header_
`````
{
    "token": "<your access token>"
}
`````

_request Body_
`````
    "<not needed>"
`````

_Response (200)_
`````
Restore data that has been deleted
{
    "task": {
        "id": 8,
        "title": "phase1",
        "description": "Mengerjakan movieApps",
        "assignTo": "iwan",
        "category": "Backlog",
        "UserId": 2,
        "createdAt": "2020-10-09T14:58:42.713Z",
        "updatedAt": "2020-10-09T14:58:42.713Z"
    }
}
`````

_Error Response_
`````
> statusCode : 500
    {
        "errors": [
            "internal server error"
        ]
    }
> statusCode : 404 (Not Found)
    {
        "errors": [
            "Task Not Found"
        ]
    }
> statusCode : 401 (Unauthorized)
    {
        "errors": [
            "Please Login First"
        ]
    }
`````

### Method UPDATE /tasks/:id

> Get all assets

_request Header_
`````
{
    "token": "<your access token>"
}
`````

_request Body_
`````
    title "<string>",
    description "<string>",
    assignTo "<string>",
    category "<date>",
`````

_Response (200)_
`````
{
    "status": 200,
    "msg": "Task id updated",
    "task": {
        "id": 9,
        "title": "makan makan",
        "description": "Lulus Phase2",
        "assignTo": "iwan",
        "category": "Done",
        "UserId": 3,
        "createdAt": "2020-10-09T15:09:02.137Z",
        "updatedAt": "2020-10-09T15:10:17.457Z"
    }
}
`````

_Error Response_
`````
> statusCode : 500
    {
        "errors": [
            "internal server error"
        ]
    }
> statusCode : 400 (bad request)
    {
        "errors": [
            "Task Not Found"
        ]
    }
> statusCode : 401 (Unauthorized)
    {
    "errors": [
        "you're not authorize"
    ]
}
`````


### REGISTER
### Method POST /users/register

> Get all assets

_request Header_
`````
{
    <not needed>
}
`````

_request Body_
`````
    email "<string>",
    password "<string>",
`````

_Response (201)_
`````
{
    {
    "id": 2,
    "email": "nurul@mail.com",
    "organization": "Hacktiv8",
    "msg": "register success"
}
}
`````

_Error Response_
`````
> statusCode : 500
    {
        "errors": [
            "internal server error"
        ]
    }
> statusCode : 400 (bad request)
    {
        {
    "errors": [
        "Please check email Format"
    ]
}
    }
`````


### LOGIN
### Method POST /user/login

> Get all assets

_request Header_
`````
{
    <not needed>
}
`````

_request Body_
`````
    email "<string>",
    password "<string>",
`````

_Response (200)_
`````
{
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJudXJ1bEBtYWlsLmNvbSIsImlhdCI6MTYwMjI1NTM5NX0.joxX0phzSsJvvHIPNDBRimKpX73Uj-3F84k1u5pKmBM"
}
}
`````

_Error Response_
`````
> statusCode : 500
    {
        "errors": [
            "internal server error"
        ]
    }
> statusCode : 400 (bad request)
    {
        {
    "errors": [
        "invalid email or password"
    ]
}
    }
`````






