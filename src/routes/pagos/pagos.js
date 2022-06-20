const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');
router.post('/pago', (req, res) => {
    const {
        id_cliente,
        id_cartera_alumno,
        mes,
        colegiatura
    } = req.body;



});
router.get('/alumno_pagos/:id', (req, res) => {
    const {
        id
    } = req.params;
    const qu = pool.query('select * from pagos_ where id_alumno = ?', [id]);
    qu.then((resp) => {
        // console.log(error, result, rows, fields);
        res.json(resp)

    }).catch((err) => {
        console.log(err);
    });

});
router.get('/pagos-personal-list/:id', (req, res) => {

    const id = req.params.id;
    const qu = pool.query(' SELECT * from pagos_personal where id = ?', [id]);
    qu.then(async(result) => {

        res.json(result);
    }).catch((err) => {
        console.log(err);
    });

});
router.post('/pago-add', (req, res) => {


    const pago = req.body;
    const qu = pool.query('Insert into pagos_ set ?', [pago]);
    qu.then(async(result) => {
        if (result.insertId) {
            //const query = await pool.query('Update clientes_ set id_cartera = ? where id = ?', [result.insertId, id_cliente]);
            req.flash('message', 'Pago creado con éxito! Actualiza la info de este cliente segun corresponda!');
            res.redirect('infocliente/' + req.body.id_cliente);
        }
    }).catch((err) => {
        console.log(err);
    });
});
router.post('/pago-add-personal', (req, res) => {


    const pago = req.body;
    const qu = pool.query('Insert into pagos_personal set ?', [pago]);
    qu.then(async(result) => {
        if (result.insertId) {
            //const query = await pool.query('Update clientes_ set id_cartera = ? where id = ?', [result.insertId, id_cliente]);
            req.flash('message', 'Pago creado con éxito! Actualiza la info de este cliente segun corresponda!');
            res.redirect('info_personal/' + req.body.id_staff);
        }
    }).catch((err) => {
        console.log(err);
    });
});


router.get('/client/pagos/:id', (req, res) => {
        const id_cliente = req.params.id;

        const qu = pool.query('SELECT * FROM pagos_ where id_cliente = ?', [id_cliente]);

        qu.then((data) => {
            res.json(data);
        });
    })
    //pagos

router.get('/pago/data/:id', (req, res) => {
    const id = req.params.id;

    const qu = pool.query('SELECT * FROM pagos_ where id = ?', [id]);

    qu.then((data) => {
        res.json(data);
    });
});

router.get('/pagos/all', (req, res) => {


    const qu = pool.query('SELECT * FROM pagos_ ');

    qu.then((data) => {
        res.json(data);
    });
});


router.get('/pagos/current_year/', (req, res) => {


    const qu = pool.query('SELECT * FROM pagos_ where YEAR(created_at) = YEAR(CURDATE())');

    qu.then((data) => {
        res.json(data);
    });
});

router.get('/pagos/current_month/', (req, res) => {

    const qu = pool.query('SELECT * FROM pagos_ where Month(created_at) = Month(CURDATE()) && YEAR(created_at) = YEAR(CURDATE())');

    qu.then((data) => {
        res.json(data);
    });
});
router.get('/pagos/current_month/count', (req, res) => {

    const qu = pool.query('SELECT count(*) totalPagosMes FROM pagos_ where Month(created_at) = Month(CURDATE()) && YEAR(created_at) = YEAR(CURDATE())');

    qu.then((data) => {
        res.json(data);
    });
});
router.get('/pagos/current_month/all_pagos', (req, res) => {

    const qu = pool.query("SELECT count( DATE_FORMAT(created_at,'%d/%m/%Y') ) total FROM pagos_ where Month(created_at) = Month(CURDATE());");

    qu.then((data) => {
        res.json(data);
    });
});
router.get('/pagos/current_month/dates', (req, res) => {

    const qu = pool.query("SELECT distinct DATE_FORMAT(created_at,'%d/%m/%Y') created_at  FROM pagos_ where Month(created_at) = Month(CURDATE())");

    qu.then((data) => {
        res.json(data);
    });
});

router.get('/pagos/current_month/count_per_day', (req, res) => {

    const qu = pool.query("SELECT DATE_FORMAT(created_at,'%d/%m/%Y') day , count(created_at) pagos FROM pagos_ where Month(created_at) = Month(CURDATE()) group by Day(created_at);");

    qu.then((data) => {
        res.json(data);
    });
});
router.get('/pagos-cliente-all-accounts/:id', (req, res) => {
    const id = req.params.id;

    const qu = pool.query(`
        SELECT  pagos, saldofavor , saldoencontra 
        FROM (
        select sum(amount) pagos from pagos_ where id_cliente =  ${id}  
        ) a
        INNER JOIN (
        select sum(saldo_afavor) saldofavor from pagos_ where id_cliente =   ${id} 
        ) b on 1=1
        INNER JOIN (
        select sum(saldo_pendiente) saldoencontra from pagos_ where id_cliente =  ${id} 
        ) c on 1=1  
    `);

    qu.then((data) => {
        res.json(data);
    });
});

module.exports = router;