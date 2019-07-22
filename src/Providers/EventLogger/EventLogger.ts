import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { ISession } from '../../Interface/Session';
import { DatabaseModule } from '../../Modules/Database/Database';
import { IUserEvents } from '../../Interface/UserEvents';

/**
 * EventLoggerProvider
 * @description Newly Generated Provider
 * @author Booster-cli
 */
@booster({
    type: "Provider"
})
export class EventLoggerProvider {

    constructor(
        private db: DatabaseModule
    ) { }

    /**
     * logEvent
     * @param session where event was done
     * @param event to log
     */
    public logEvent(session: ISession, event: any): Promise<any> {
        const userEvent: IUserEvents = {
            idUser: session.user.idUser,
            session: session.token,
            event: JSON.stringify(event)
        };
        return this.db.insert('UserEvents', userEvent);
    }

}

inject.register("EventLoggerProvider", EventLoggerProvider);
