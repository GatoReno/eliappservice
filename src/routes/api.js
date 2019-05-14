const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');


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



router.get('/project-support/:id', (req, res) => {
    const {
        id
    } = req.params;


    //console.log(id)

    const query = knex.table('TC_')
        .innerJoin('PROJECTS_', 'TC_.id_proyecto', '=', 'PROJECTS_.id')
        .where('PROJECTS_.id', [id]);


    query.then((resx) => {
        res.json(resx)
    }).catch((err) => {
        console.log(err)
    });

});


router.get('/user-tc/:id', (req, res) => {
    const {
        id
    } = req.params;


    //console.log(id)

    const query = knex.table('TC_')
        .innerJoin('USERS_', 'TC_.id_usercreated', '=', 'USERS_.id')
        .where('USERS_.id', [id]);

    query.then((resx) => {
        res.json(resx);
    }).catch((err) => {
        console.log(err)
    });
});


router.get('/clients',(req,res)=>{
    const qu = pool.query('SELECT * FROM USERS_ where user = 1');

    qu.then((data)=>{
        res.json(data);
    });
})




module.exports = router;