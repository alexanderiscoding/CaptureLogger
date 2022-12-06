import { makerSender } from '../../lib/senders';

async function create(hashCode) {
  return fetch(process.env.CLOUD_HOST + '/api/database/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      name: "CaptureLogger/logger/",
      id: hashCode,
      column: {
        timestamp: Date.now()
      }
    })
  }).then(async function () {
    return true;
  }).catch(function (error) {
    console.log(error);
    return false;
  });
}

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
      id: 'CaptureLogger/logger/' + hashCode
    })
  }).then(async function (response) {
    const data = await response.json();
    if (data) {
      return false;
    } else {
      let created = await create(hashCode);
      if (created) {
        return true;
      } else {
        return false;
      }
    }
  }).catch(function (error) {
    console.log(error);
    return false;
  });
}

function makerNotification(agent, application, version, message, data, token, host) {
  const parser = require('ua-parser-js');
  let ua = parser(agent);
  let structure;
  if (ua.device.type == 'mobile') {
    structure = makerSender(
      application,
      version,
      ua.device.vendor,
      ua.device.model,
      ua.os.name,
      ua.os.version,
      null,
      message,
      data,
      token,
      host,
      process.env.SENDER_SERVICE,
      process.env.SENDER_MODE
    );
  } else {
    structure = makerSender(
      application,
      version,
      ua.engine.name,
      ua.engine.version,
      ua.os.name,
      ua.os.version,
      ua.cpu.architecture,
      message,
      data,
      token,
      host,
      process.env.SENDER_SERVICE,
      process.env.SENDER_MODE
    );
  }
  return structure;
}

async function sendNotification(structure) {
  let sender;
  await fetch(process.env.SENDER_HOST + structure[0].url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.SENDER_TOKEN
    },
    body: JSON.stringify(structure[1])
  }).then(function () {
    sender = true;
  }).catch(function (error) {
    console.log(error);
    sender = false;
  });
  return sender;
}

async function device(agent, ip) {
  const { createHash } = await import('node:crypto');
  const parser = require('ua-parser-js');
  let ua = parser(agent);
  if (ua.device.type == 'mobile') {
    if ([ua.device.vendor, ua.device.model, ua.os.name, ua.os.version].includes(undefined)) {
      return false;
    } else {
      const hash = createHash('sha256');
      hash.update(JSON.stringify([ua.device.vendor, ua.device.model, ua.os.name, ua.os.version, ip]));
      return hash.copy().digest('hex');
    }
  } else {
    if ([ua.engine.name, ua.engine.version, ua.os.name, ua.os.version, ua.cpu.architecture].includes(undefined)) {
      return false;
    } else {
      const hash = createHash('sha256');
      hash.update(JSON.stringify([ua.engine.name, ua.engine.version, ua.os.name, ua.os.version, ua.cpu.architecture, ip]));
      return hash.copy().digest('hex');
    }
  }
}

async function tagHash(id, date) {
  const { createHmac } = await import('node:crypto');
  const hmac = createHmac('sha256', process.env.TOKEN);
  hmac.update(JSON.stringify([id, date]));
  return hmac.digest('hex');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if ([req.body.action, req.body.input, req.body.output, req.body.version, req.headers.tag, req.headers['user-agent'], req.headers['x-vercel-forwarded-for']].includes(undefined)) {
    return res.status(406).json("Missing Information");
  }
  let id = await device(req.headers['user-agent'], req.headers['x-vercel-forwarded-for']);
  if (!id) {
    return res.status(401).json("Invalid Device Request");
  }
  let hash = await tagHash(id, req.headers.tag);
  if (Date.now() > Number(req.headers.tag)) {
    return res.status(401).json("Authentication Credentials Expired");
  }
  if (req.headers.hash != hash) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  let approved = await check(req.body.action, req.body.input, req.body.output, id, req.body.version);
  if (!approved) {
    return res.status(401).json("Invalid Body Request");
  }
  const { randomBytes } = await import('node:crypto');
  const token = randomBytes(8).toString('hex');
  return fetch(process.env.CLOUD_HOST + '/api/firestore/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      table: {
        name: "CaptureLogger"
      },
      column: {
        logger: req.body.application ?
          { "action": req.body.action, "input": req.body.input, "output": req.body.output, "version": req.body.version, "application": req.body.application }
          :
          { "action": req.body.action, "input": req.body.input, "output": req.body.output, "version": req.body.version },
        timestamp: Date.now(),
        token: token
      }
    })
  }).then(async function (response) {
    const data = await response.json();
    if (process.env.SENDER_HOST) {
      let structure = makerNotification(req.headers['user-agent'], req.body.application, req.body.version, req.body.message, data, token, req.headers.host);
      let sended = await sendNotification(structure);
      if (sended) {
        res.status(200).json(data);
      } else {
        res.status(500).json('Send notification not working.');
      }
    } else {
      res.status(200).json(data);
    }
  }).catch(function (error) {
    console.log(error);
    res.status(500).json("Insert information in Cloud failed.");
  });
}
