export declare function opendatabase(dbName: string, version: number, store: Record<string, unknown>, storeName: string): Promise<IDBDatabase>;
export declare function readDatabaseKey(db: IDBDatabase, key: string, storeName: string): Promise<unknown>;
export declare function readDatabaseStore(dbName: string, storeName: string): Promise<unknown>;
export declare function saveDatabase(db: IDBDatabase, reduxStore: Record<string, unknown>, storeName: string): Promise<unknown>;
