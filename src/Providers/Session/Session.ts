import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { IUsers } from '../../Interface/Users';
import * as jwt from 'jsonwebtoken';
import { ISession } from '../../Interface/Session';
import uuid = require('uuid/v4');
import { ConfigModule } from '../../Modules/Config/Config';
import { ErrorModule } from '../../Modules/Error/Error';

/**
 * SessionProvider
 * @description Newly Generated Provider
 * @author Booster-cli
 */
@booster({
    type: "Provider"
})
export class SessionProvider {

    /** testing signing key */
    private key: string;

    constructor(
        private config: ConfigModule,
        private error: ErrorModule
    ) {
        this.key = this.config.getConfig().JWT_KEY;
    }

    /**
     * createNewSession
     * @description Creates a new Session
     * @param user to create session for
     */
    public createNewSession(user: IUsers): string {
        const session: ISession = {
            token: uuid(),
            user
        };
        const token = jwt.sign(session, this.key);
        return token;
    }

    /**
     * checkSession
     * @description Checks if valide session
     * @param token to check
     */
    public checkSession(token: string): Promise<ISession> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.key, {}, (error, decoded: ISession) => {
                if (error)
                    reject(this.error.createError('Session', '', undefined, error));
                else
                    resolve(decoded);
            });
        });
    }

}

inject.register("SessionProvider", SessionProvider);
