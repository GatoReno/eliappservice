const express = require('express');
const router = express.Router();



const passport = require('passport');
const pool = require('../db');
const helpers = require('../lib/helpers');


const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');


router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/auth/signup',
    failureFlash: true
}));

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/auth/signin',
        failureFlash: true
    })(req, res, next);
});

router.post('/update-info-admin', (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const {
        name,
        lastnameP,
        lastnameM,
        phone,
        calle,
        colonia,
        cp,
        estado,
        id
    } = req.body;

    const img = req.files[0];
    const imgfn = img.filename;

    userad = {
        name: name,
        lastnameP: lastnameP,
        lastnameM: lastnameM,
        phone: phone,
        calle: calle,
        colonia: colonia,
        cp: cp,
        estado: estado,

        status: 1,
        img: imgfn,
        admin: true
    };

    const queryk = pool.query('UPDATE USERS_ set ? where id = ? ', [userd, id]);


    queryk.then(() => {
        res.render('public/sucessUpdate');
    }).catch((err) => {
        console.log(err);
    });
});


router.post('/update-info-user-form', (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const {
        name,
        lastnameP,
        lastnameM,
        phone,
        calle,
        colonia,
        cp,
        estado,
        id
    } = req.body;

    const img = req.files[0];
    const imgfn = img.filename;


    const userd = {
        name: name,
        lastnameP: lastnameP,
        lastnameM: lastnameM,
        phone: phone,
        calle: calle,
        colonia: colonia,
        cp: cp,
        estado: estado,
        status: 1,
        img: imgfn,
        user: true
    };
    queryk = pool.query('UPDATE USERS_ set ? where id = ? ', [userd, id]);

    queryk.then(() => {
        res.render('public/sucessUpdate');
    }).catch((err) => {
        console.log(err);
    });
});



router.post('/signup-subadmin', async (req, res) => {
    //console.log(req.body);
    const mail = req.body.mail;
    //const name = req.body.name;
    const {

        pass,
        userName,
        id,
        role,
        name
    } = req.body;

    const newUser = {
        username: userName,
        name: name,
        mail: mail,
        id_usercreated: id,

        mail: mail,
        admin: null,
        admin : 1
    };

    

    newUser.pass = await helpers.encryptPass(pass);

    console.log(newUser);

    const query = pool.query('INSERT INTO USERS_ set ?', [newUser]);

    query.then((data) => {
        //console.log(data.toString());
        newUser.id = parseInt(data);
        console.log(newUser);
        res.redirect('/profile/', 200, req.flash('success', newUser.username + ' creado con éxito'));

    }).catch((err) => {
        console.log(err);

        res.redirect('/profile/', 500, req.flash('err: ' + err));
    });


});



router.post('/signup-client', async (req, res) => {
    //console.log(req.body);
    const mail = req.body.mail;
    //const name = req.body.name;
    const {

        pass,
        userName,
        id,
    
        name
    } = req.body;

    const newUser = {
        username: userName,
        name: name,
        mail: mail,
        id_usercreated: 0,

        mail: mail,
        tutor: 0,
        user : 1
    };

    

    newUser.pass = await helpers.encryptPass(pass);

    console.log(newUser);

    const query = pool.query('INSERT INTO USERS_ set ?', [newUser]);

    query.then((data) => {
        //console.log(data.toString());
        newUser.id = parseInt(data);
        console.log(newUser);
        res.redirect('/profile/', 200, req.flash('success', newUser.username + ' creado con éxito'));

    }).catch((err) => {
        console.log(err);

        res.redirect('/profile/', 500, req.flash('err: ' + err));
    });


});





module.exports = router;

module.exports = router;