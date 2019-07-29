import { testBed } from '../../injector';
import { SecurityModule } from './Security';
import { Injector } from '@booster-ts/core';

describe("Security", () => {

    let security: SecurityModule;
    let injector: Injector;

    beforeEach(() => {
        injector = testBed([
            {class: SecurityModule}
        ]);
        security = injector.inject(SecurityModule);
    });

    describe("compare", () => {
        it("Should match 2 string", () => {
            const str = "Hello";

            expect(security.compare(str, str)).toBeTruthy();
        });

        it("Should fail to match 2 string", () => {
            const str1 = "Hello";
            const str2 = "Bye";

            expect(security.compare(str1, str2)).toBeFalsy();
        });

        it("Should same size string", () => {
            const str1 = "Hello";
            const str2 = "Hella";

            expect(security.compare(str1, str2)).toBeFalsy();
        });

        it("Should handle undefined 1", () => {
            const str1 = undefined;
            const str2 = "HBye";

            expect(security.compare(str1, str2)).toBeFalsy();
        });

        it("Should handle undefined 2", () => {
            const str1 = "Hello";
            const str2 = undefined;

            expect(security.compare(str1, str2)).toBeFalsy();
        });

    });

});
