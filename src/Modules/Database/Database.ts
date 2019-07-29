import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { Client, QueryResult } from 'pg';
import { ErrorModule } from '../Error/Error';
import { ConfigModule } from '../Config/Config';
import SimpleSql from '@everydayheroes/simplesql';

/**
 * DatabaseModule
 * @description Newly Generated Module
 * @author ImOverlord
 */
@booster({
    type: "Module"
})
export class DatabaseModule {

    /** pg Client */
    private client: Client;
    /** SQL Engine */
    private engine: SimpleSql;

    constructor(
        private error: ErrorModule,
        private config: ConfigModule
    ) {
        this.engine = new SimpleSql('pgEngine');
        this.client = new Client({
            connectionString: this.config.getConfig().DB
        });
    }

    /**
     * init
     * @description Init Database
     */
    public init(): Promise<any> {
        return this.client.connect()
        .then(() => {
            return this.client.query("SET SCHEMA 'public'");
        });
    }

    /**
     * query
     * @description Query Database
     * @param command to send
     * @param args in command
     */
    public query(command: string, args?: Array<any>): Promise<QueryResult> {
        if (args === undefined)
            args = [];
        return new Promise((resolve, reject) => {
            this.client.query(command, args)
            .then((result: QueryResult) => {
                resolve(result);
            })
            .catch((error) => {
                reject(
                    this.error.createCustomError('Database', "Query Failed", error)
                );
            });
        });
    }

    /**
     * getSerial
     * @description get Table Serial
     * @param table where to find serial
     * @param key name of the serial
     */
    public getSerial(table: string, key: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.query(`SELECT currval(pg_get_serial_sequence($1, $2));`, [table, key])
            .then((result: QueryResult) => {
                resolve(result.rows[0].currval);
            })
            .catch((error) => {
                reject(
                    this.error.createCustomError('Database', "Query Failed", error)
                );
            });
        });
    }

    /**
     * insert
     * @description Insert data to table
     * @param tableName where to insert data
     * @param data to insert
     */
    public insert(tableName: string, data: object): Promise<QueryResult> {
        const req = this.engine.insert(tableName, data);
        req.query += "RETURNING *";
        return this.query(req.query, req.data);
    }

    /**
     * search
     * @description Find rows in table
     * @param tableName where to find data
     * @param data that should match rows to find
     */
    public search(tableName: string, data: object): Promise<QueryResult> {
        const req = this.engine.query(tableName, data);
        return this.query(req.query, req.data);
    }

}

inject.register("DatabaseModule", DatabaseModule);
