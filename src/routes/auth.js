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
        admin: 1
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
        admin: 1
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

    // alumno cliente padre cliente madre

    const {
        name_alumno,
        lastnameP_alumno,
        lastnameM_alumno,
        alergias_alumno,
        tiposangre_alumno,
        talla_alumno,
        peso_alumno,
        precede_alumno,
        clave_alumno
    } = req.body;

    const alumno = {
        name: name_alumno,
        lastnameP: lastnameP_alumno,
        lastnameM: lastnameM_alumno,
        alergias: alergias_alumno,
        tiposangre: tiposangre_alumno,
        talla: talla_alumno,
        peso: peso_alumno,
        precede: precede_alumno,
        clave: clave_alumno,
        status: 1
    }

    console.log(alumno);


    // cliente padre
    const {
        name_padre,
        escolaridad_padre,
        ocupacion_padre,
        trabajo_padre,
        phone_padre,
        oficina_padre,
        mail_padre
    } = req.body;


    const padre = {
        name_padre,
        escolaridad_padre,
        ocupacion_padre,
        trabajo_padre,
        phone_padre,
        oficina_padre,
        mail_padre
    }


    //cliente madre

    const {
        name: name_madre,
        escolaridad: escolaridad_madre,
        ocupacion: ocupacion_madre,
        trabajo: trabajo_madre,
        phone: phone_madre,
        oficina: oficina_madre,
        mail: mail_madre
    } = req.body;

    const madre = {
        name: name_madre,
        escolaridad: escolaridad_madre,
        ocupacion: ocupacion_madre,
        trabajo: trabajo_madre,
        phone: phone_madre,
        oficina: oficina_madre,
        mail: mail_madre
    }


    const queryalumn = pool.query('INSERT INTO alumnos_ set  ?', [alumno]);
    queryalumn.then((err, resx) => {
        if (err) throw err;

        if (resx.length > 0) {
            /*
            const alumn = resx[0];
            // console.log(alumn);

            const id = alumn.insertId;
            const cartera = {
                id_alumno: id
            }
            //return id;

            const querycart = await pool.query('INSERT INTO cartera_ set  ?', [cartera]);
            */

            const alumn = resx[0];

            const cartera = {id_alumno: alumn.insertId}
try{
    const resCart =  pool.query('INSERT INTO cartera_ set cartera = ?', [cartera]);
    const resUserp =  pool.query('INSERT INTO users_ set  = ?', [padre]);
    const resUserm =  pool.query('INSERT INTO users_ set  = ?', [madre]);
    if(resCart) console.log(resCart.id);
            if(resUserp) console.log(resUserp.id);
            if(resUserm) console.log(resUserm.id);
}
catch(e){
    console.log(e)
}
         
            const cart = resx[0];
            const idcart = cart.insertId;

        
        }
    }).catch((err) => {
        console.log(err)
    });






});





module.exports = router;

module.exports = router;