const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');


router.post('/add-personal', (req, res) => {
    console.log(req.body);
    const {
        name,
        telefono,

        sueldo,
        curp,
        profesion,
        email,
        rfc,
        fingreso,
        estudios,
        porhora,
    } = req.body;

    const maestro = {
        name: name,
        estudios: estudios,
        porhora: porhora,
        telefono: telefono,

        sueldo: sueldo,
        curp: curp,
        profesion: profesion,
        email: email,
        rfc: rfc,
        fecha_ingreso: fingreso
    }



    const qu = pool.query('Insert into personal_ set ?', [maestro]);

    qu.then((result) => {
        if (result.insertId) {
            req.flash('message', 'Personal creado con éxito');
            res.render('dashboard/dashboard');
        }

    }).catch((err) => {
        console.log(err);
    });

});


router.get('/data_personal/:id', (req, res) => {

    const {
        id
    } = req.params;
    const qu = pool.query('select * from personal_ where id = ?', [id]);



    qu.then((data) => {

        console.log(data)
        data.forEach((data) => {
            res.json(data);
        });



    }).catch((err) => {
        console.log(err)
    });

});

router.get('/info_personal/:id', (req, res) => {

    const {
        id
    } = req.params;
    const qu = pool.query('select * from personal_ where id = ?', [id]);

    const maestro = [];

    qu.then((data) => {

        console.log(maestro)
        data.forEach((data) => {
            maestro.push(data);
        });

        res.render('public/info', {
            maestro
        });

    }).catch((err) => {
        console.log(err)
    });

});

module.exports = router;