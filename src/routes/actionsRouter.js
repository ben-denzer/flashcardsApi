const express       = require('express');
const actionsRouter = express.Router();
const jwt           = require('jsonwebtoken');
const jwtInfo       = require('../../.jwtinfo').key;
const jsonParser    = require('body-parser').json();

const router = (connection) => {

    actionsRouter.post('/addCoin', jsonParser, (req, res) => {
        jwt.verify(req.body.token, jwtInfo, (err, user) => {
            if (err) return res.status(500).send();
            if (!user) return res.status(401).send();
            connection.query('UPDATE users SET coins=? WHERE user_id=?',
                [req.body.coins, user.user_id],
                (err, rows) => {
                    if (err) return res.status(200).send(JSON.stringify({error: 'server error'}));
                    res.status(200).send({success: 'coins updated'});
                }
            );
        });
    });

    actionsRouter.post('/logSkippedWord', jsonParser, (req, res) => {
        jwt.verify(req.body.token, jwtInfo, (err, user) => {
            if (err) return res.status(500).send();
            if (!user) return res.status(401).send();
            connection.query('INSERT INTO skippedWords(username_fk, word) VALUES(?,?)',
                [req.body.username, req.body.currentWord],
                (err, success) => {
                    if (err) return res.status(200).send(JSON.stringify({error: 'server error'}));
                    res.status(200).send({success: 'skippedWords updated'});
                }
            );
        });
    });

    return actionsRouter;
};

module.exports = router;