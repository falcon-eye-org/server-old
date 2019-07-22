import * as request from 'superagent';
import { baseUrl, apiKey } from '../config';

describe("New Client", () => {

    it("Should create a new Account", (done) => {
        request.post(`${baseUrl}/connect`)
        .send({
            apiKey
        })
        .end((err, res) => {
            if (err) throw err;

            expect(res.body.code).toBe("00");
            expect(res.body.data.session).toBeDefined();
            done();
        });
    });
});
