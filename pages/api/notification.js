import { token, telegramBotToken, telegramIDGroup } from '../../config';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != token) {
		return res.status(401).json("Invalid Authentication Credentials");
	}
  if (req.body.message == undefined) {
    return res.status(406).json("Missing Message Notification");
  }
  let message = "CaptureLogger - Notification %0aMessage: " + req.body.message;
  fetch('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?chat_id=' + telegramIDGroup + '&text=' + message).then(function () {
    res.status(200).json('Send');
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}