import {sender} from '../../lib/senders';

export default function handler(req, res) {
  const { randomBytes } = require('node:crypto');
  const token = randomBytes(8).toString('hex');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != process.env.TOKEN) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.body.log == undefined) {
    return res.status(406).json("Missing Text Logger");
  }
  return fetch(process.env.CRUD_HOST + '/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CRUD_TOKEN
    },
    body: JSON.stringify({
      table: {
        name: "CaptureLogger"
      },
      column: {
        log: req.body.log,
        application: req.body.application,
        filename: req.body.filename,
        line: req.body.line,
        network: req.body.network,
        host: req.body.host,
        version: req.body.version,
        uniqueId: req.body.uniqueId,
        brand: req.body.brand,
        model: req.body.model,
        systemName: req.body.systemName,
        systemVersion: req.body.systemVersion,
        timestamp: new Date().getTime(),
        token: token
      }
    })
  })
  .then(async function (response) {
    const data = await response.json();
    if (process.env.SENDER_HOST != undefined) {
      let structure = sender(req.body.application, req.body.filename, req.body.line, req.body.network, req.body.host, req.body.version, req.body.uniqueId, req.body.brand, req.body.model, req.body.systemName, req.body.systemVersion, req.body.message, data, token, process.env.CRUD_HOST, process.env.SENDER_SERVICE, process.env.SENDER_MODE);
      let apiUrl;
      switch (process.env.SENDER_SERVICE) {
        case "1":
          switch (process.env.SENDER_MODE) {
            case "1":
              apiUrl = process.env.SENDER_HOST + '/api/telegram';
              break;
            case "2":
              apiUrl = process.env.SENDER_HOST + '/api/telegram';
              break;
            case "3":
              apiUrl = process.env.SENDER_HOST + '/api/telegram';
              break;
          }
          break;
        case "2":
          switch (process.env.SENDER_MODE) {
            case "1":
              apiUrl = process.env.SENDER_HOST + '/api/discord';
              break;
            case "2":
              apiUrl = process.env.SENDER_HOST + '/api/discordembed';
              break;
            case "3":
              apiUrl = process.env.SENDER_HOST + '/api/discordembed';
              break;
          }
          break;
        case "3":
          switch (process.env.SENDER_MODE) {
            case "1":
              apiUrl = process.env.SENDER_HOST + '/api/slackmarkdown';
              break;
            case "2":
              apiUrl = process.env.SENDER_HOST + '/api/slackcard';
              break;
            case "3":
              apiUrl = process.env.SENDER_HOST + '/api/slackinformation';
              break;
          }
          break;
        case "4":
          switch (process.env.SENDER_MODE) {
            case "1":
              apiUrl = process.env.SENDER_HOST + '/api/gchat';
              break;
            case "2":
              apiUrl = process.env.SENDER_HOST + '/api/gchatcard';
              break;
            case "3":
              apiUrl = process.env.SENDER_HOST + '/api/gchatinformation';
              break;
          }
          break;
      }
      return fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.SENDER_TOKEN
        },
        body: JSON.stringify(structure)
      })
      .then(function () {
        res.status(200).json(data);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
    } else {
      res.status(200).json(data);
    }
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}