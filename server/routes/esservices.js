import { Client } from '@elastic/elasticsearch';
import fs from 'fs';
import path from 'path'
const Boom = require('boom');


const elasticURL = "https://localhost:4001";
const index = "fsplindex";
const pdfsplindex = "pdfsplindex";

function readCert() {
  const cert = fs.readFileSync(path.resolve(__dirname, "../certs/client.pem"));
  // console.log(cert)
  return cert;
}

async function connectToES(server, request) {
  readCert();
  try {
    const user = await server.plugins.security.getUser(request)
    if (user.roles.includes("fspl_read") || user.roles.includes("superuser")) {
      const client = new Client({

        node: elasticURL,
        auth: {
          username: 'fsplr',
          password: "kibana"
        }
        ,
        ssl: {
          ca: readCert(),
          rejectUnauthorized: false
        }
      });
      return client;
    }
  }
  catch (error) {
    throw error
  }
}


export default function (server) {

  server.route({
    path: '/api/visualization_fspl/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

  server.route({
    path: '/api/visualization_fspl/fetchTopViewedMessages',
    method: 'GET',
    handler: async (request, h) => {

      try {
        const client = await connectToES(server, request);
        if (!client) {
          return Boom.unauthorized();
        }
        const result = await client.search({
          index,
          body: {
            query: {
              match_all: {}
            },
            sort: {
              "views": {
                order: "desc"
              }
            },
            size: 100
          }
        });
        const hits = result.body.hits.hits;
        const indexes = hits.map(item => {
          return item._source;
        });
        //console.log(indexes);
        return { indexes };
      } catch (error) {
        console.log(error);
        return Boom.badRequest();
      }

    }
  });

}
