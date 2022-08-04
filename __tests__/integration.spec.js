const request = require('supertest');
const { matchers } = require('jest-json-schema');
const app = require('../app')
expect.extend(matchers);

const cacheSchema = {
  $id: 'cacheSchema',
  type: 'array',

  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
    value: {
      type: 'string',
    },
    debug: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      // format: 'date',
    },
  }

};

describe('testing cache API ', () => {
  test('GET /cache', (done) => {
    request(app)
      .get('/cache?key=key1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)

        if (res.body && res.body) {
          expect(res.body).toMatchSchema(cacheSchema)
        }
        done()
      });
  })

  test('waiting', (done) => {
    setTimeout(done, 60000)
  }, 60000)

  test('GET /cache', (done) => {
    request(app)
      .get('/cache?key=key1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)

        if (res.body && res.body) {
          expect(res.body).toMatchSchema(cacheSchema)
          expect(res.body.debug).toBe("Cache miss")
        }
        done()
      });
  })


  test('404', (done) => {
    request(app)
      .get('/unknown')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      });
  })

})