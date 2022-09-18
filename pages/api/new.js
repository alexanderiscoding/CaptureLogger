import { CRUDHost, CRUDToken } from '../../config';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const axios = require('axios');
  const type = req.body.type;
  const logger = req.body.logger;
  if(['debug', 'error', 'info', 'log', 'warn'].includes(type) && logger.length > 0 && logger.length < 5000){
    axios({
      method: 'post',
      url: CRUDHost+'/api/create',
      headers: {'authorization': CRUDToken},
      data: {
        table: {
          name: "logger"
        },
        column: {
          type: type,
          log: logger
        },
      }
    })
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
  }else{
    res.status(204).send("no data send.");
  }  
}