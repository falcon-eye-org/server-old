import { booster } from '@booster-ts/core';
import inject from '../../injector';

/**
 * SecurityModule
 * @description Newly Generated Module
 * @author Booster-cli
 */
@booster({
    type: "Module"
})
export class SecurityModule {

    constructor() { }

    /**
     * compare
     * @description Compares 2 string
     * @param str1 to compare
     * @param str2 to compare
     */
    public compare(str1: string, str2: string): boolean {
        let mismatch = 0;

        if (typeof str1 !== 'string' || typeof str2 !== 'string')
            return false;
        mismatch = str1.length === str2.length ? 0 : 1;
        if (mismatch)
            str2 = str1;
        for (let i = 0; i < str1.length; i++)
            mismatch |= (str1.charCodeAt(i) ^ str2.charCodeAt(i));
        return mismatch === 0;
    }

}

inject.register("SecurityModule", SecurityModule);
