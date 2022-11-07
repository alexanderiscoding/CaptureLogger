export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if ([req.query.id, req.query.token].includes(undefined)) {
    return res.status(406).json("Missing Authentication Credentials");
  }
  return fetch(process.env.CRUD_HOST + '/api/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CRUD_TOKEN
    },
    body: JSON.stringify({
      table: {
        name: "CaptureLogger"
      },
      column: {
        id: req.query.id
      }
    })
  })
  .then(async function (response) {
    const data = await response.json();
    if (data.token != req.query.token) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
    res.status(200).json(data.log);
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}