const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');
router.get('/reiniciar-colegiaturas/', (req, res) => {
    console.log(req.body);

    const pago = req.body;

    const qu = pool.query("UPDATE clientes_ set estado = 'Deudor' ");

});



router.get('/colegiaturasReporte', (req, res) => {
    const id = req.params.id;
    
    const qu = pool.query(`
    SELECT  primariaTotal, preescolarT 
    FROM (
        select sum(colegiatura) pagos from alumnos_ where nivel = 'primaria' && Month(created_at) = Month(CURDATE()) && Year(created_at) = Year(CURDATE()) ;
    ) a
    INNER JOIN (
        select sum(colegiatura) pagos from alumnos_ where nivel = 'preescolar' && Month(created_at) = Month(CURDATE()) && Year(created_at) = Year(CURDATE()) ;
    ) b on 1=1
     
`);

    qu.then((data) => {
        res.json(data);
    });
});
module.exports = router;