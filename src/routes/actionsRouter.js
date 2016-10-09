const express       = require('express');
const actionsRouter = express.Router();
const jwt           = require('jsonwebtoken');
const jwtInfo       = require('../../.jwtinfo').key;
const jsonParser    = require('body-parser').json();

const router = (connection) => {

    actionsRouter.post('/addCoin', jsonParser, (req, res) => {
        jwt.verify(req.body.token, jwtInfo, (err, user) => {
            if (err) return res.status(500).send();
            console.log(req.body.coins, user.user_id);
            connection.query('UPDATE users SET coins=? WHERE user_id=?',
                [req.body.coins, user.user_id],
                (err, rows) => {
                    if (err) return res.status(200).send(JSON.stringify({error: 'server error'}));
                    res.status(200).send({success: 'coins updated'});
                }
            );
        });
    });

    return actionsRouter;
};

module.exports = router;