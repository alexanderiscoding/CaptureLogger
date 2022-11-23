import { makerSender } from '../../lib/senders';

async function check(action, input, output, device, version) {
  const { createHash } = await import('node:crypto');
  const hash = createHash('sha256');
  hash.update(JSON.stringify([action, input, output, device, version]));
  let hashCode = hash.copy().digest('hex');
  return fetch(process.env.CLOUD_HOST + '/api/database/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      id: 'CaptureLogger/' + hashCode
    })
  })
    .then(async function (response) {
      const data = await response.json();
      if (data == null) {
        fetch(process.env.CLOUD_HOST + '/api/database/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': process.env.CLOUD_TOKEN
          },
          body: JSON.stringify({
            name: "CaptureLogger",
            id: hashCode,
            column: {
              timestamp: Date.now()
            }
          })
        })
          .catch(function (error) {
            console.log(error);
            return false;
          });
        return true;
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

async function device(ua) {
  const { createHash } = await import('node:crypto');
  if (ua.device.type == 'mobile') {
    if ([ua.device.vendor, ua.device.model, ua.os.name, ua.os.version].includes(undefined)) {
      return false;
    } else {
      const hash = createHash('sha256');
      hash.update(JSON.stringify([ua.device.vendor, ua.device.model, ua.os.name, ua.os.version]));
      return hash.copy().digest('hex');
    }
  } else {
    if ([ua.engine.name, ua.engine.version, ua.os.name, ua.os.version, ua.cpu.architecture].includes(undefined)) {
      return false;
    } else {
      const hash = createHash('sha256');
      hash.update(JSON.stringify([ua.engine.name, ua.engine.version, ua.os.name, ua.os.version, ua.cpu.architecture]));
      return hash.copy().digest('hex');
    }
  }
}

async function sendNotification(structure) {
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
  let sender;
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.SENDER_TOKEN
    },
    body: JSON.stringify(structure)
  })
    .then(function () {
      sender = true;
    })
    .catch(function (error) {
      console.log(error);
      sender = false;
    });
  return sender;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if ([req.body.action, req.body.input, req.body.output, req.body.version].includes(undefined)) {
    return res.status(406).json("Missing Logger");
  }
  const { createHmac, randomBytes } = await import('node:crypto');
  let id;
  let ua;
  if (req.headers.tag) {
    const parser = require('ua-parser-js');
    ua = parser(req.headers['user-agent']);
    id = await device(ua);
    if (!id) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
    let ip = req.headers['x-vercel-forwarded-for'];
    if (!ip) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
    const hmac = createHmac('sha256', process.env.TOKEN);
    hmac.update(JSON.stringify([id, ip, req.headers.tag]));
    let hash = hmac.digest('hex');
    if (new Date().getTime() > Number(req.headers.tag)) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
    if (req.headers.hash != hash) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
  } else {
    return res.status(406).json("Missing Authentication Credentials");
  }
  let approved = await check(req.body.action, req.body.input, req.body.output, id, req.body.version);
  if (!approved) {
    return res.status(401).json("Invalid Body Request");
  }
  const token = randomBytes(8).toString('hex');
  return fetch(process.env.CLOUD_HOST + '/api/firestore/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      table: {
        name: "CaptureLogger"
      },
      column: {
        log: { "action": req.body.action, "input": req.body.input, "output": req.body.output },
        application: req.body.application,
        version: req.body.version,
        timestamp: new Date().getTime(),
        token: token
      }
    })
  })
    .then(async function (response) {
      const data = await response.json();
      if (process.env.SENDER_HOST != undefined) {
        let structure;
        if (ua.device.type == 'mobile') {
          structure = makerSender(
            req.body.application,
            req.body.version,
            ua.device.vendor,
            ua.device.model,
            ua.os.name,
            ua.os.version,
            null,
            req.body.message,
            data,
            token,
            'https://' + req.headers.host,
            process.env.SENDER_SERVICE,
            process.env.SENDER_MODE
          );
        } else {
          structure = makerSender(
            req.body.application,
            req.body.version,
            ua.engine.name,
            ua.engine.version,
            ua.os.name,
            ua.os.version,
            ua.cpu.architecture,
            req.body.message,
            data,
            token,
            'https://' + req.headers.host,
            process.env.SENDER_SERVICE,
            process.env.SENDER_MODE
          );
        }
        let sended = await sendNotification(structure);
        if (sended) {
          res.status(200).json(data);
        } else {
          res.status(500).json('Sender notification not working.');
        }
      } else {
        res.status(200).json(data);
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}