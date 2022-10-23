import { token, CRUDHost, CRUDToken, telegramBotToken, telegramIDGroup } from '../../config';
import axios from 'axios'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req);
  if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
      return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  const authorization = req.headers.authorization.split(' ')[1];
  if (authorization != token) {
      return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
  const log = req.body.log;
  if (log == '' || log == undefined) {
      return res.status(401).json({ message: 'Missing Text Logger' });
  }
  await axios.post(CRUDHost+'/api/create', {
      table: {
        name: "CaptureLogger"
      },
      column: {
        log: log,
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
    },{
        headers: {
          'authorization': CRUDToken
        }
    })
    .then(async function (response) {
      if(telegramBotToken != ""){
        let message;
        if(req.body.message){
          if(req.body.application){
            message = "Um novo CaptureLogger foi registrado %0aApplication: " + req.body.application + " %0aID: " + response.data + "%0aType: " + type + "%0aMessage: " + req.body.message;
          }else{
            message = "Um novo CaptureLogger foi registrado %0aID: " + response.data + "%0aType: " + type + "%0aMessage: " + req.body.message;
          }
        }else{
          message = "Um novo CaptureLogger foi registrado %0aID: " + response.data + "%0aType: " + type;
        }        
        await axios.post('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?chat_id=' + telegramIDGroup + '&text=' + message).catch(function (error) {
          res.status(500).send(error);
        });
      }
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).send(error);
    }); 
}
