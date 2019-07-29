import { booster } from '@booster-ts/core';
import inject from '__SOURCE__/injector';
import { Express, Request, Response } from 'express';
import { ExpressModule } from '__SOURCE__/Modules/Express/Express';

/**
 * __NAME__Route
 * @description Newly Generated Route
 * @author Booster-cli
 */
@booster({
    type: "Route"
})
export class __NAME__Route {

    /** Express App */
    public app: Express;

    constructor(
        express: ExpressModule
    ) {
        this.app = express.getApp();
    }

    /**
     * init
     * @description Init __NAME__ Routes
     */
    public init(): void {

    }
}

inject.register("__NAME__Route", __NAME__Route);
