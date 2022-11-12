export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != process.env.TOKEN) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.body.hash == undefined) {
    return res.status(406).json("Missing Hash Logger");
  }
  return fetch(process.env.CLOUD_HOST + '/api/database/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      id: 'CaptureLogger/' + req.body.hash
    })
  })
    .then(async function (response) {
      const data = await response.json();
      if (data == null) {
        fetch(process.env.CLOUD_HOST + '/api/database/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': process.env.CLOUD_TOKEN
          },
          body: JSON.stringify({
            name: "CaptureLogger",
            id: req.body.hash,
            column: {
              timestamp: Date.now()
            }
          })
        })
          .catch(function (error) {
            res.status(500).json(error);
          });
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
