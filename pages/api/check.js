import { token } from '../../config';

export default function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (req.headers.authorization != token) {
		return res.status(401).json("Invalid Authentication Credentials");
	}
  res.status(200).json('Autorized');
}