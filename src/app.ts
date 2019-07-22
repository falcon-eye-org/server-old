// tslint:disable: no-console
import injector, { loadFiles } from './injector';
import { ExpressModule } from './Modules/Express/Express';
import { DatabaseModule } from './Modules/Database/Database';

const express = injector.inject(ExpressModule);
const database = injector.inject(DatabaseModule);

Promise.all([
    express.init(),
    database.init()
])
.then(() => {
    loadFiles('./Routes');
    console.log("App Started");
})
.catch((error) => {
    console.error(error);
    process.exit(1);
});
