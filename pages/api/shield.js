async function device(agent) {
  const { createHash } = await import('node:crypto');
  const parser = require('ua-parser-js');
  let ua = parser(agent);
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


export default async function handler(req, res) {
  if (req.headers.authorization) {
    if (req.headers.authorization != process.env.ACCESS_TOKEN) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
    let id = await device(req.headers['user-agent']);
    if (!id) {
      return res.status(401).json("Invalid Device Request");
    }
    let ip = req.headers['x-vercel-forwarded-for'];
    if (!ip) {
      return res.status(401).json("Invalid Device Request");
    }
    const { createHmac } = await import('node:crypto');
    const hmac = createHmac('sha256', process.env.TOKEN);
    const tag = String(new Date().getTime() + 30 * 1000);
    hmac.update(JSON.stringify([id, ip, tag]));
    return res.status(200).json({ tag: tag, hash: hmac.digest('hex') });
  } else {
    return res.status(200).json('In developement');
  }
}
