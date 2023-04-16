# Redux-Global

This Package is aimed to store the redux state in indexDb so we can persisit it .

## How To Use 
Create Database in IndexDB

function = createDB

it has createDb function which you can call it as index.ts or at the start of your web app 

Parameters

@dbName = Database Name 

@version = version number 

@storeName = name of the database store 


## Using it with React-Redux 

functin = dbMiddleWare

it exposes an middleware dbMiddleWare which you can plug in the redux store middleware 

## Retrieve Data 

function = hydrateReduxFromDB

@parameters

@dbName = Databse Name similiar to one that you have used in create one 

@storeName = similar to one that you have used in create one 

This function returns the data & redux-action as an array [data,action] 

@@Returns - [db,action]

to get data and make your own action you can use [0] as first argument is the data from store 
to get action with type "HYDRATE_STORE_DB" and payload as data you can use [1]


## It aslo exposes and function which takes input a callback function and runs when tab is changes 

function = addTabsListner

@parameter = cb = callback function which should be run when tab is changed


