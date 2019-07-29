import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { defaultConfig, IConfig } from '../../Interface/Config';

/**
 * ConfigModule
 * @description Newly Generated Module
 * @author Booster-cli
 */
@booster({
    type: "Module"
})
export class ConfigModule {

    /** Server Config */
    private config = defaultConfig;

    constructor() {
        for (const key of Object.keys(process.env))
            if (key.match(/FALCON/)) {
                const index = key.indexOf('_');
                const keyConfig = key.substr(index + 1);
                this.config[keyConfig] = process.env[key];
            }
    }

    /**
     * getConfig
     * @description Current Config
     */
    public getConfig(): IConfig {
        return this.config;
    }

}

inject.register("ConfigModule", ConfigModule);
