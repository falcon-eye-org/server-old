import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { IError, errorList } from '../../Interface/Error';

/**
 * ErrorModule
 * @description Newly Generated Module
 * @author Booster-cli
 */
@booster({
    type: "Module"
})
export class ErrorModule {

    constructor() { }

        /**
     * createError
     * @description Creates a documented Error
     * @param from where the error occured
     * @param code of the error (view errorList)
     * @param reason? why the error occured (overides default error reason)
     * @param systemError? system trace
     */
    public createError(from: string, code: string, reason?: string, systemError?: any): IError {
        const error: IError = {
            code,
            from,
            why: reason || errorList[code],
            systemError
        };
        return error;
    }

    /**
     * createCustomError
     * @description Create an undocumented error (code: 99)
     * @param from where the error occured
     * @param reason why the error occured
     * @param systemError? system trace
     */
    public createCustomError(from: string, reason: string, systemError?: any): IError {
        const code = '99';
        const error: IError = {
            code,
            from,
            why: reason || errorList[code],
            systemError
        };
        return error;
    }
}

inject.register("ErrorModule", ErrorModule);
