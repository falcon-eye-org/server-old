import * as request from 'superagent';
import { baseUrl, apiKey } from '../config';

describe("Api Key Authentification", () => {

    it("Should validate API Key", (done) => {
        request.post(`${baseUrl}/connect`)
        .send({
            apiKey
        })
        .end((err, res) => {
            if (err) throw err;

            expect(res.body.code).toBe("00");
            done();
        });
    });

    it("Should not validate API Key", (done) => {
        request.post(`${baseUrl}/connect`)
        .send({
            apiKey: 'failedApiKey'
        })
        .end((err, res) => {
            if (err) throw err;

            expect(res.body.code).toBe("01");
            done();
        });
    });

});
