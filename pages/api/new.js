import { token, CRUDHost, CRUDToken, telegramBotToken, telegramIDGroup } from '../../config';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != token) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.body.log == undefined) {
    return res.status(406).json("Missing Text Logger");
  }
  fetch(CRUDHost + '/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': CRUDToken
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
        data: req.body.data,
        version: req.body.version,
        uniqueId: req.body.uniqueId,
        brand: req.body.brand,
        model: req.body.model,
        systemName: req.body.systemName,
        systemVersion: req.body.systemVersion,
        timestamp: new Date().getTime()
      }
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (telegramBotToken != "") {
      let message;
      if (req.body.message) {
        if (req.body.application) {
          message = "Um novo CaptureLogger foi registrado %0aApplication: " + req.body.application + " %0aID: " + data + "%0aMessage: " + req.body.message;
        } else {
          message = "Um novo CaptureLogger foi registrado %0aID: " + data + "%0aMessage: " + req.body.message;
        }
      } else {
        message = "Um novo CaptureLogger foi registrado %0aID: " + data;
      }
      fetch('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?chat_id=' + telegramIDGroup + '&text=' + message).catch(function (error) {
        res.status(500).json(error);
      });
    }
    res.status(200).json(data);
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}