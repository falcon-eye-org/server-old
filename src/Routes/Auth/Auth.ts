import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { Express, Request, Response } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import { AuthentificationProvider } from '../../Providers/Authentification/Authentification';
import { ClientProvider } from '../../Providers/Client/Client';
import { IError } from '../../Interface/Error';

/**
 * AuthRoute
 * @description Newly Generated Route
 * @author Booster-cli
 */
@booster({
    type: "Route"
})
export default class AuthRoute {

    /** Express App */
    public app: Express;

    constructor(
        express: ExpressModule,
        private auth: AuthentificationProvider,
        private client: ClientProvider
    ) {
        this.app = express.getApp();
        this.app.post('/connect', this.connect.bind(this));
    }

    /**
     * connect
     * @description SDK Entrypoint
     * @param req HTTP Request
     * @param res HTTP Response
     */
    private connect(req: Request, res: Response): void {
        const apiKey = req.body.apiKey;

        this.auth.validateAPIKEY(apiKey)
        .then(() => {
            return this.client.createClient();
        })
        .then((session) => {
            res.status(200).json({
                code: "00",
                text: "Hello User",
                data: {
                    session
                }
            });
        })
        .catch((error: IError) => {
            res.status(200).json({
                code: error.code,
                text: error.why
            });
        });
    }
}

inject.register("AuthRoute", AuthRoute);
