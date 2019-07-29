import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { Express, Request, Response } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import { SessionProvider } from '../../Providers/Session/Session';
import { IError } from '../../Interface/Error';
import { EventLoggerProvider } from '../../Providers/EventLogger/EventLogger';

/**
 * EventsRoute
 * @description Newly Generated Route
 * @author Booster-cli
 */
@booster({
    type: "Route"
})
export class EventsRoute {

    /** Express App */
    public app: Express;

    constructor(
        express: ExpressModule,
        private session: SessionProvider,
        private eventLogger: EventLoggerProvider
    ) {
        this.app = express.getApp();
        this.app.post('/event', this.event.bind(this));
    }

    /**
     * event
     * @param req HTTP Request
     * @param res HTTP Response
     */
    private event(req: Request, res: Response): void {
        const token = req.headers.authorization;
        const event = req.body.event;

        this.session.checkSession(token)
        .then((session) => {
            return this.eventLogger.logEvent(session, event);
        })
        .then(() => {
            res.json({
                code: "00",
                text: "Event Received"
            });
        })
        .catch((error: IError) => {
            res.json({
                code: error.code,
                text: error.why
            });
        });
    }
}

inject.register("EventsRoute", EventsRoute);
