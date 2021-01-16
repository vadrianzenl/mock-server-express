BPI DUMMY DATA
=========

BPI DUMMY DATA is a mock server project. It can be used for integrate the requests from [BPI-X Frontend](https://bitbucket.org/ibkteam/bpi-web-app-front) application and response actions that have been configured. 

## Table of Contents
* [About the project](#about-the-project)
    * [Dependency Stack](#dependency-stack)
    * [Files Structure](#files-structure)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [How to use it](#how-to-use-it)
    * [Register Service Endpoint](#register-service-endpoint)
    * [Add file](#add-file)
* [Examples](#examples)

## About the project

An action in the project could be a json object response, pdf file response or any HTTP error. For setting this actions is necessary to consider two main steps:

* Register the endpoint in [config.js](routes/config.js) file.
* Add the json|pdf file to [data](src/data) folder with the structure define in the configuration file.     

### Dependency Stack

The following table is a list of the major dependencies we use along with their purpose and links to supplemental documentation.

| **Dependency**         | **Purpose**                                                                 | **Docs**          |
| :--------------------- | :-------------------------------------------------------------------------- | :---------------- |
| Cookie Parser          | Parse Cookie header and populate req.cookies with an object keyed by the cookie names | [Official Docs](https://github.com/expressjs/cookie-parser) |
| Cors                   | Middleware that can be used to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options. | [Official Docs](https://github.com/expressjs/cors) |
| Express                | Framework to use HTTP utility methods and middleware for create the mock project  | [Official Docs](https://expressjs.com/en/4x/api.html) |
| Http Errors            | Library for create HTTP errors  | [Official Docs](https://github.com/jshttp/http-errors) |
| Node Notifier          | Send cross platform native notifications  | [Official Docs](https://github.com/mikaelbr/node-notifier) |
| Nodemon                | Utility that will monitor for any changes in the source and automatically restart the server  | [Official Docs](https://github.com/remy/nodemon#nodemon) |

### Files Structure
    .
    ├── bin    
    │   └── www                
    ├── public  
    │   └── stylesheets
    │       └── style.css              
    ├── routes  
    │   └── config.js
    │   └── index.js                    
    ├── src  
    │   └── data/
    │   └── action.js                   
    ├── views
    │   └── error.pug
    │   └── index.pug
    │   └── layout.pug                    
    ├── app.js
    ├── package.json
    ├── package-lock.json              
    └── README.md
     
## Getting Started

### Prerequisites
##### Node JS
You can get the complete guide about installation on [NodeJS](https://nodejs.org/en/) page.

##### npm

```bash
npm install npm@latest -g
```

###  Installation

##### Cloning the project

```bash
git clone git clone https://<username>@bitbucket.org/ibkteam/bpi-dummy-data.git

cd bpi-dummy-data/
```

##### Installing dependencies

```bash
npm install
```

We are using this command for install dependencies with the version specified on `package-lock.json`.

##### Run mock server

```bash
npm start
```

## How to use it 

For settings new actions is necessary to consider the next steps:

### Register Service Endpoint

First, you need to register the service endpoint in [config.js](routes/config.js) file. For this, add new object to data array. 

The object structure is show it in the following table.

| **Prop Name**    | **Type**    | **Values**           | **Required**  | **Default**    | **Description**                      |
| :--------------- | :---------- | :------------------- | :------------ | :------------- | :----------------------------------- |
| url              | String      |                      | true          |                | Backend service name without the context. Only domains are necessaries |
| method           | String      | GET, POST, ALL       | false         | ALL            | Http request method |
| file             | String      |                      | false         |                | Response file path. By default the mock server consider the url prop as the path file |
| responseType     | String      | json, pdf            | false         | json           | Response file type |
| params           | Boolean     |                      | false         | false          | Request params for show the response action |
| typeRequest      | String      | single, object, all  | false         | single         | Request body type. **Single** value is a simple property with a key:value format. **Object** value consider a object property and **all** value consider all request body |
| typeParam        | String      | prop, value, content | false         | prop           | Type param to consider. **Prop** consider the property value in the request body, **value** evaluate the different properties values in the value array and **content** consider all request body content |
| prop             | Object      |                      | false. It's required only if **typeRequest** prop is setting | | Request property name. Structure: { val: '<request-property-name>' }  |
| children         | Object      |                      | false. It's required only if **typeRequest: 'object'** is setting | | Request children property name when consider a object type request. Structure: { val: '<request-property-name>' }  |
| values           | Array       |                      | false. It's required only if **typeParam: 'value'** is setting | | List of the different request property values. Structure: { id: '<request-property-value>', json: '<file-path>' }  |
| responseError    | Boolean     |                      | false         | false          | Consider response http error |
| error            | Object      |                      | false. It's required only if **responseError: true** is setting | | Http error settings. Structure: { code: <http-error-code>, message: '<error-message>', json: '<error-file-path>' } |
| error.code       | Integer     |                      | false         | 500            | Http error code |
| error.message    | String      |                      | false         | Default http error message | Error message. Use **message: 'json'** for specific json file and put the file path on property below |
| error.json       | String      |                      | false         | default.json   | Error file path |
| timeout          | Integer     |                      | false         | 0              | Service timeout in milliseconds |

### Add File

Add the file to [data](src/data) folder with the structure define in the [config.js](routes/config.js) file.

## Examples

* Configure service: ***https://bancaporinternet.interbank.pe/bpi/api/campaignRestService/myCampaigns***

Add to data array in configuration file
```bash
...
{ url: 'campaignRestService/myCampaigns' }
...
```

Add **myCampaigns.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── campaignRestService
        │           └── myCampaigns.json
        └── ...

* Configure service with different file: ***https://bancaporinternet.interbank.pe/bpi/api/campaignRestService/myCampaigns***

Add to data array in configuration file
```bash
...
{ 
    url: 'campaignRestService/myCampaigns' 
    file: 'other/folder/newCampaigns'
}
...
```

Add **newCampaigns.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── other
        │       └── folder
        │           └── newCampaigns.json
        └── ...

* Configure service with different response file type: ***https://bancaporinternet.interbank.pe/bpi/api/informationRestService/info/download***

Add to data array in configuration file
```bash
...
{ 
    url: 'informationRestService/info/download', 
    method: 'GET',
    responseType: 'pdf' 
}
...
```

Add **download.pdf** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── informationRestService
        │           └── info
        │               └── download.pdf
        └── ...

* Configure service with single request params: ***https://bancaporinternet.interbank.pe/bpi/api/productRestService/products/operationType***

Add to data array in configuration file
```bash
...
{ 
    url: 'productRestService/products/operationType', 
    params: true,
    prop: { val: 'operationType' }
}
...
```

Add files to data folder with the different request property values.
Request:
```json
{ "operationType": "ACCOUNT_CLOSURE" }
```
Add **account_closure.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── productRestService
        │           └── products
        │               └── operationType
        │                   └── account_closure.json
        └── ...

Request:
```json
{ "operationType": "PAGSRV" }
```
Add **pagsrv.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── productRestService
        │           └── products
        │               └── operationType
        │                   └── pagsrv.json
        └── ...

* Configure service with object request params: ***https://bancaporinternet.interbank.pe/bpi/api/newService/myService***

Add to data array in configuration file
```bash
...
{ 
    url: 'newService/myService', 
    params: true,
    typeRequest: 'object'
    prop: { val: 'user' },
    children: { val: 'code' }
}
...
```

Add files to data folder with the different request property values.
Request:
```json
{
  "user": {
    "code": "0001"
  }
}
```
Add **0001.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── newService
        │           └── myService
        │               └── 0001.json
        └── ...

Request:
```json
{
  "user": {
    "code": "0002"
  }
}
```
Add **0002.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── newService
        │           └── myService
        │               └── 0002.json
        └── ...

* Configure service with a list of request property values: ***https://bancaporinternet.interbank.pe/bpi/api/creditCardRestService/refinancing/simulate***

Add to data array in configuration file
```bash
...
{ 
    url: 'creditCardRestService/refinancing/simulate', 
    params: true,
    typeRequest: 'value',
    prop: { val: 'quotas' },
    values: [
      {
        id: 3,
        json: 'quotas3'
      },
      {
        id: 6,
        json: 'quotas6'
      },
      {
        id: 12,
        json: 'quotas12'
      }
    ]
}
...
```

Add files to data folder with the different request property values.

    ├── ...                 
        ├── src  
        │   └── data
        │       └── creditCardRestService
        │           └── refinancing
        │               └── simulate
        │                   └── quotas3.json
        │                   └── quotas6.json
        │                   └── quotas12.json
        └── ...

Request example:
```json
{ "quotas": 3 }
```

* Configure service with all request body content: ***https://bancaporinternet.interbank.pe/bpi/api/myService/content/body***

Add to data array in configuration file
```bash
...
{ 
    url: 'myService/content/body', 
    params: true,
    typeRequest: 'all',
    typeParam: 'content',
    values: [
      {
        id: {
            code: '01',
            name: 'Warhol',
            lastName: 'Richard'
        },
        json: 'responseFile1'
      },
      {
        id: {
          code: '02',
          name: 'Pepito',
          lastName: 'Perez'
        },
        json: 'responseFile2'
      },
    ]
}
...
```

Add files to data folder with the different request property values.

    ├── ...                 
        ├── src  
        │   └── data
        │       └── myService
        │           └── content
        │               └── body
        │                   └── responseFile1.json
        │                   └── responseFile2.json
        └── ...

Request example:
```json
{ 
  "code": "02",
  "name": "Pepito",
  "lastName": "Perez"
}
```

* Configure service with response error: ***https://bancaporinternet.interbank.pe/bpi/api/customerConfigurationRestService/transactionalLimit/update/up***

Add to data array in configuration file
```bash
...
{ 
    url: 'customerConfigurationRestService/transactionalLimit/update/up', 
    responseError: true,
    error: {
      code: 424,
      message: 'json',
      json:
        'customerConfigurationRestService/transactionalLimit/update/up/error'
    }
}
...
```

Add **error.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── customerConfigurationRestService
        │           └── transactionalLimit
        │               └── update
        │                   └── up
        │                       └── error.json
        └── ...

* Configure service with timeout response: ***https://bancaporinternet.interbank.pe/bpi/api/debtRestService/sunat***

Add to data array in configuration file
```bash
...
{ 
    url: 'debtRestService/sunat', 
    timeout: 1000
}
...
```

Add **sunat.json** file to data folder

    ├── ...                 
        ├── src  
        │   └── data
        │       └── debtRestService
        │           └── sunat.json
        └── ...
