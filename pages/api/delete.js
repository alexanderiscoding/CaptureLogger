import { token, CRUDHost, CRUDToken } from '../../config';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != token) {
		return res.status(401).json("Invalid Authentication Credentials");
	}
  if (req.body.id == undefined) {
    return res.status(406).json("Missing ID Logger");
  }
  fetch(CRUDHost + '/api/delete', {
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
        id: id
      }
    })
  })
  .then(function () {
    res.status(200).json("Deleted");
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}