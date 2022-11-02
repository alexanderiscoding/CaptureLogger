export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != process.env.TOKEN) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.body.timestamp == undefined) {
    return res.status(406).json("Missing Timestamp Logger");
  }
  return fetch(process.env.CRUD_HOST + '/api/pagination', {
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
        timestamp: req.body.timestamp,
        limit: 20
      }
    })
  })
  .then(async function (response) {
    const data = await response.json();
    res.status(200).json(data);
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}
