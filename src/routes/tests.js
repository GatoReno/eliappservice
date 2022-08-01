const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/t/client/alumnos/:id', (req, res) => {
    const id_cliente = req.params;
    console.log(id_cliente);
    const qu = pool.query('SELECT * FROM alumnos_ where id_cliente = ?', [id_cliente.id]);

    qu.then((data) => {
        res.json(data);
    });
})

router.get('/t/client-by-mail/:mail', (req, res) => {

    let { mail } = req.params;
    const qu = pool.query('select * from clientes_ where mail = ?', [mail]);

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });
});


router.get('/t-datacliente', (req, res) => {

    const qu = pool.query('select * from alumnos_ where status = 1 ');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });

});

module.exports = router;