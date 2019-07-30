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
     * @description Log 1 event
     * @param session session of the user's event
     * @param event to log
     */
    public logEvent(session: ISession, event: object): Promise<any> {
        const userEvent: IUserEvents = {
            idUser: session.user.idUser,
            session: session.token,
            event: JSON.stringify(event)
        };
        return this.db.insert('UserEvents', userEvent);
    }

    /**
     * logEvents
     * @description Log Multiple Events
     * @param session of the user's event
     * @param events Array of events to log
     */
    public logEvents(session: ISession, events: Array<object>): Promise<any> {
        const logs = [];
        events.forEach((event) => {
            logs.push(this.logEvent(session, event));
        });
        return Promise.all(logs);
    }

}

inject.register("EventLoggerProvider", EventLoggerProvider);
