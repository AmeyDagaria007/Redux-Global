"use strict";
//Create a promise based IndexDB API 
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDatabase = exports.readDatabaseStore = exports.readDatabaseKey = exports.opendatabase = void 0;
function createObjectStoreFromJSON(db, storeJson, storeName) {
    const store = db.createObjectStore(storeName, { keyPath: 'key' });
    Object.keys(storeJson).forEach((key) => {
        store.createIndex(key, key, { unique: false });
    });
}
function opendatabase(dbName, version, store, storeName) {
    return new Promise((resolve, reject) => {
        let db;
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
            createObjectStoreFromJSON(db, store, storeName);
        };
    });
}
exports.opendatabase = opendatabase;
async function readDatabaseKey(db, key, storeName) {
    const transaction = db.transaction(storeName, 'readonly');
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
exports.readDatabaseKey = readDatabaseKey;
async function readDatabaseStore(dbName, storeName) {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open(dbName);
        dbRequest.onsuccess = () => {
            const db = dbRequest.result;
            const transaction = db.transaction(storeName, 'readonly');
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
exports.readDatabaseStore = readDatabaseStore;
async function saveDatabase(db, reduxStore, storeName) {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(reduxStore);
    return new Promise((resolve, reject) => {
        request.onerror = () => {
            reject(request.error);
        };
        request.onsuccess = () => {
            resolve(request.result);
        };
    });
}
exports.saveDatabase = saveDatabase;
