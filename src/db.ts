//Create a promise based IndexDB API

function createObjectStoreFromJSON(
  db: IDBDatabase,
  storeName: string
) {
  const store = db.createObjectStore(storeName, { autoIncrement: true});
  
}

export function opendatabase(
  dbName: string,
  version: number,
  storeName: string
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    request.onerror = () => {
      console.error("Rejeected While Opening up DB");
      reject(request.error);
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      createObjectStoreFromJSON(db, storeName);
    };
  });
}

export async function readDatabaseKey(
  db: IDBDatabase,
  key: string,
  storeName: string
): Promise<unknown> {
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  const request = store.get(key);
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject(request.error);
    };
    request.onsuccess = () => {
      resolve(request.result?.value);
    };
  });
}

export async function readDatabaseStore(
  dbName: string,
  storeName: string
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(dbName);
    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const resultRq = store.getAll();
      resultRq.onerror = () => {
        reject(resultRq.error);
      };
      resultRq.onsuccess = () => {
        resolve(resultRq.result);
      };
    };
  });
}

export async function saveDatabase(
  db: IDBDatabase,
  reduxStore: Record<string, unknown>,
  storeName: string
): Promise<unknown> {
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  const delRq = store.clear();
  return new Promise((resolve,reject)=>{
  delRq.onsuccess = ()=>{  
  const request = store.add(reduxStore);
    request.onerror = () => {
      reject(request.error);
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
  }
  delRq.onerror = ()=>{
    reject(delRq.error)
  }
  })
}
