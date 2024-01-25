var request = require('request');
describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2*2).toBe(4)
    })
})

describe('get messages', () => {
    it('should retrurn 200 ok', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it("should retrurn a list, that's not empty", (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('get messages from a user', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('name should be tim', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            if(err) {
                done.fail(err); // fail the test with error encountered
            } else {
                try {
                    const messages = JSON.parse(res.body);
                    expect(messages[0].name).toEqual('tim');
                    done();
                } catch (error) {
                    done.fail(err); //fail the test while parsing error encountered
                }
            }
        })
    })
    it('name should be Ilyas', (done) => {
        request.get('http://localhost:3000/messages/Ilyas', (err, res) => {
            if(err) {
                done.fail(err); // fail the test with error encountered
            } else {
                try {
                    const messages = JSON.parse(res.body);
                    expect(messages[0].name).toEqual('Ilyas');
                    done();
                } catch (error) {
                    done.fail(err); //fail the test while parsing error encountered
                }
            }
        })
    })
})