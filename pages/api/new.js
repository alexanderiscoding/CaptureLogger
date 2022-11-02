export default function handler(req, res) {
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
      'Content-Type': 'application/json',
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
  .then(async function (response) {
    const data = await response.json();
    if (process.env.SENDER_HOST != undefined) {
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
      return fetch(process.env.SENDER_HOST + '/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.SENDER_TOKEN
        },
        body: JSON.stringify({
          message: message
        })
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