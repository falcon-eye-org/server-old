import { booster } from '@booster-ts/core';
import inject from '../../injector';
import uuid = require('uuid/v4');
import { DatabaseModule } from '../../Modules/Database/Database';
import { IUsers } from '../../Interface/Users';
import { SessionProvider } from '../Session/Session';

/**
 * ClientProvider
 * @description Newly Generated Provider
 * @author Booster-cli
 */
@booster({
    type: "Provider"
})
export class ClientProvider {

    constructor(
        private db: DatabaseModule,
        private session: SessionProvider
    ) { }

    /**
     * createClient
     * @description Creates a new Client
     * @returns Session Token
     */
    public createClient(): Promise<string> {
        return new Promise((resolve, reject) => {
            const unique = uuid();
            const user: IUsers = {
                idUser: unique,
                identifier: unique
            };
            this.db.insert('Users', user)
            .then((result) => {
                const user = result.rows[0];
                const session = this.session.createNewSession(user);
                resolve(session);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

inject.register("ClientProvider", ClientProvider);
