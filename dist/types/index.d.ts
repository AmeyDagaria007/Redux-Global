import { Middleware } from "redux";
declare const createDB: (dbName: string, version: number, storeName: string) => Promise<void>;
declare const dbMiddleWare: Middleware;
declare const hydrateReduxFromDB: (dbName: string, storeName: string) => Promise<unknown[]>;
declare const addTabsListner: (cb: () => {}) => void;
export { createDB, dbMiddleWare, hydrateReduxFromDB, addTabsListner };
