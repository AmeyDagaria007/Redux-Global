"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTabsListner = exports.hydrateReduxFromDB = exports.dbMiddleWare = exports.createDB = void 0;
const db_1 = require("./db");
let db = undefined;
let gbStoreName = undefined;
const createDB = async (dbName, version, storeName) => {
    gbStoreName = storeName;
    db = await (0, db_1.opendatabase)(dbName, version, gbStoreName);
};
exports.createDB = createDB;
const dbMiddleWare = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    if (db != undefined && gbStoreName != undefined) {
        (0, db_1.saveDatabase)(db, state, gbStoreName);
    }
    else {
        console.error("Cant Save as database and StoreName is undefined");
    }
    return result;
};
exports.dbMiddleWare = dbMiddleWare;
const hydrateReduxFromDB = async (dbName, storeName) => {
    const hyDrateAction = (data) => ({
        type: "HYDRATE_STORE_DB",
        payload: data,
    });
    let data = await (0, db_1.readDatabaseStore)(dbName, storeName);
    return [data, hyDrateAction(data)];
};
exports.hydrateReduxFromDB = hydrateReduxFromDB;
const addTabsListner = (cb) => {
    if (document != undefined) {
        document.addEventListener("visibilitychange", cb);
    }
};
exports.addTabsListner = addTabsListner;
