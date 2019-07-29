import * as request from 'superagent';
import { baseUrl, apiKey } from '../config';

describe("Not Authentified", () => {

    it("Should fail to log Event", () => {

        request.post(`${baseUrl}/event`)
        .send({
            event: {
                type: "event",
                version: "1.0.0"
            }
        })
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("02");
        });
    });
});
