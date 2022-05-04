const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');

//API


router.post('/api/login', (req, res) => {
    const {
        id
    } = req.body;
    const user = id;
    const token = jwt.sign({
        user
    }, 'seceto', {
        expiresIn: '3600s'
    });

    res.json({
        token
    });
});

//links

router.get('/api/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'seceto', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'protected',
                data: data //iat 
            });
        }
    });

});


//clientes ya exportado




//alumnos ya exportado






//maestros

router.get('/maestros', (req, res) => {
    const qu = pool.query('select * from personal_');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });
});


//personal ya exportado











//Ensure

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


//expenses ya exportado


//colegiaturas 




//Estados para tablas ya separado




//Events ya exportado



//Announcements ya exportado



module.exports = router;