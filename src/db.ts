//Create a promise based IndexDB API 


function createObjectStoreFromJSON(db :IDBDatabase,storeJson :Record<string,unknown>,storeName :string) {
const store = db.createObjectStore(storeName,{keyPath:'key'})
Object.keys(storeJson).forEach((key)=>{
    store.createIndex(key,key,{unique:false})
})
}

export function opendatabase (name : string = 'redux-db',version : number = 1,store : Record<string,unknown>,storeName : string = 'redux-store'   ):Promise<IDBDatabase> {
return new Promise((resolve,reject)=>{
    let db : IDBDatabase;
    const request = indexedDB.open(name,version)
    request.onerror = ()=>{
        console.error("Rejeected While Opening up DB")
        reject(request.error);
    }
    request.onsuccess = ()=>{
        resolve(request.result)
    }
    request.onupgradeneeded = () =>{
        const db = request.result;
        createObjectStoreFromJSON(db,store,storeName)
    }
})
}

export async function readDatabaseKey(db :IDBDatabase,storeName:string = 'redux-store',key : string) :Promise<unknown>{
   const transaction = db.transaction(storeName,'readonly')
   const store = transaction.objectStore(storeName)
   const request =  store.get(key)
   return new Promise((resolve,reject)=>{
    request.onerror = () => {
        reject(request.error)
    }
    request.onsuccess = ()=>{
        resolve(request.result?.value)
    }
   })
}

export async function readDatabaseStore(db:IDBDatabase,storeName:string = 'redux-store'):Promise<IDBObjectStore>{
    const transaction = db.transaction(storeName,'readonly')
    const store = transaction.objectStore(storeName)
    return store
}

export async function saveDatabase(db:IDBDatabase,storeName:string = 'redux-store',reduxStore:Record<string,unknown>):Promise<unknown>{
    const transaction = db.transaction(storeName,'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.put(reduxStore)
    return new Promise((resolve,reject)=>{
        request.onerror = ()=>{
            reject(request.error)
        }
        request.onsuccess = ()=>{
            resolve(request.result)
        }
    })
}


