import * as request from 'superagent';
import { baseUrl, apiKey } from '../config';

describe("Log an Event", () => {

    let session;

    beforeEach((done) => {
        request.post(`${baseUrl}/connect`)
        .send({
            apiKey
        })
        .end((err, res) => {
            if (err) throw err;

            session = res.body.data.session;
            done();
        });
    });

    it("Should receive event", () => {

        request.post(`${baseUrl}/event`)
        .set('Authorization', session)
        .send({
            event: {
                type: "event",
                version: "1.0.0"
            }
        })
        .end((err, res) => {
            if (err) throw err;

            expect(res.body.code).toBe("00");
        });
    });
});
