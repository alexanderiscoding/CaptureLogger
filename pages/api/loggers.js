import { token, CRUDHost, CRUDToken } from '../../config';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != token) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.body.timestamp == undefined) {
    return res.status(406).json("Missing Timestamp Logger");
  }
  fetch(CRUDHost + '/api/pagination', {
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
        timestamp: req.body.timestamp,
        limit: 20
      }
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    res.status(200).json(data);
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}
