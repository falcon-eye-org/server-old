import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { ErrorModule } from '../../Modules/Error/Error';
import { SecurityModule } from '../../Modules/Security/Security';
import { ConfigModule } from '../../Modules/Config/Config';

/**
 * AuthentificationProvider
 * @description Newly Generated Provider
 * @author Booster-cli
 */
@booster({
    type: "Provider"
})
export class AuthentificationProvider {

    /** Temp Test API Key */
    private apiKey: string;

    constructor(
        private security: SecurityModule,
        private error: ErrorModule,
        private config: ConfigModule
    ) {
        this.apiKey = this.config.getConfig().API_KEY;
    }

    /**
     * validateAPIKEY
     * @description Checks that api key is valid
     * @param key to check
     */
    public validateAPIKEY(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.security.compare(key, this.apiKey))
                resolve();
            else
                reject(this.error.createError('Auth', "01"));
        });
    }

}

inject.register("AuthentificationProvider", AuthentificationProvider);
