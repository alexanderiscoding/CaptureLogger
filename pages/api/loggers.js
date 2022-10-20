import { token, CRUDHost, CRUDToken } from '../../config';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }
    const authorization = req.headers.authorization.split(' ')[1];
    if (authorization != token) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }
    const type = req.body.type;
    if (type == '' || type == undefined) {
        return res.status(401).json({ message: 'Missing Type Logger' });
    }
    const timestamp = req.body.timestamp;
    if (timestamp == null || timestamp == undefined) {
        return res.status(401).json({ message: 'Missing Timestamp Logger' });
    }
    const axios = require('axios');
    axios({
        method: 'post',
        url: CRUDHost + '/api/pagination',
        headers: { 'authorization': CRUDToken },
        data: {
            table: {
                name: "CaptureLogger"
            },
            column: {
                where: "true",
                name: "type",
                operator: "==",
                value: type,
                timestamp: timestamp,
                limit: 20
            },
        }
    })
    .then(function (response) {
        res.status(200).send(response.data);
    })
    .catch(function (error) {
        if (error.response.status == 400) {
            res.status(400).send(error.response.data);
        } else {
            res.status(500).send(error);
        }
    });
}