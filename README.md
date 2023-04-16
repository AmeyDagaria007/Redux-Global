# Redux-Global

This package aims  to use indexDB to persisist the Redux Store in Web Storage so it can be used everywhere.

# Functions Exposed 

1 . createDB -> Call this function in index.ts or at earlieast to create a db in indexDB it takes databseName,version & storeName as Parameters 

2.dbMiddleWare -> Connect this middleware to your redux store middleware (Wheenver now redux store is updated db will be updated)

3.hydrateReduxFromDB -> it takes the dbname and storename as paramaters use the same that you have proided during creation time and it returns an array of data and action [data,action]. you can use the data and create your own action or use redux-action directly with type HYDRATE_STORE_DB

4.addTabsListner -> It adds an listner to window when tab changes and runs and it takes an cb function which runs whenever tab is changed


Thank You 

Please raise issue on git if you are having any trouble 

Author:-
Amey Dagaria