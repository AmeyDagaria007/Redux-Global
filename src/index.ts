import {Middleware} from 'redux';
import { opendatabase, saveDatabase } from './db';

let db :IDBDatabase | undefined = undefined
let gbStoreName : string | undefined = undefined;

const createDB = async (dbName:string,version:number,store:Record<string,unknown>,storeName:string)=>{
    gbStoreName = storeName
   db =  await opendatabase(dbName,version,store,gbStoreName)
}

const dbMiddleWare:Middleware = (store) => (next) => (action) =>{
    const result = next(action)
    const state = store.getState()
    if(db != undefined && gbStoreName != undefined){
    saveDatabase(db,state,gbStoreName)
    }else{
        console.error('Cant Save as dn and gbStoreName is undefined')
    }
    return result
}

export {
    createDB,dbMiddleWare
}
