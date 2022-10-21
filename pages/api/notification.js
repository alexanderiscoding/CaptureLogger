import { token, telegramBotToken, telegramIDGroup } from '../../config';
import axios from 'axios'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
      return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  const authorization = req.headers.authorization.split(' ')[1];
  if (authorization != token) {
      return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
  if (req.body.message == '' || req.body.message == undefined) {
      return res.status(401).json({ message: 'Missing Message Notification' });
  }
  let message = "CaptureLogger - Notification %0aMessage: " + req.body.message;
  await axios.post('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?chat_id=' + telegramIDGroup + '&text=' + message)
  .then(function () {
    res.status(200).send('Enviada');
  })
  .catch(function (error) {
    res.status(500).send(error);
  });
}