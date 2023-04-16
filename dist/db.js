"use strict";
//Create a promise based IndexDB API
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDatabase = exports.readDatabaseStore = exports.readDatabaseKey = exports.opendatabase = void 0;
function createObjectStoreFromJSON(db, storeName) {
    const store = db.createObjectStore(storeName, { autoIncrement: true });
}
function opendatabase(dbName, version, storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);
        request.onerror = () => {
            console.error("Rejected While Opening up DB");
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
exports.opendatabase = opendatabase;
async function readDatabaseKey(db, key, storeName) {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
        request.onerror = () => {
            console.error("Error while Reading byKey");
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
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const resultRq = store.getAll();
            resultRq.onerror = () => {
                console.error("Error while Reading The DB");
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
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const delRq = store.clear();
    return new Promise((resolve, reject) => {
        delRq.onsuccess = () => {
            const request = store.add(reduxStore);
            request.onerror = () => {
                console.error("Error While Saving Data in DB");
                reject(request.error);
            };
            request.onsuccess = () => {
                resolve(request.result);
            };
        };
        delRq.onerror = () => {
            console.error("Error while Deleting Data from DB");
            reject(delRq.error);
        };
    });
}
exports.saveDatabase = saveDatabase;
