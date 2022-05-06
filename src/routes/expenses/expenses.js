const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');


const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');



router.post('/expenses-add', (req, res) => {
    console.log(req.body);

    const pago = req.body;

    const qu = pool.query('Insert into expensas_ set ?', [pago]);


    qu.then(async(result) => {
        if (result.insertId) {
            console.log(result);
            //const query = await pool.query('Update clientes_ set id_cartera = ? where id = ?', [result.insertId, id_cliente]);
            req.flash('message', 'Ticket creado con éxito!');
            res.redirect('/dashboard');
        }

    }).catch((err) => {
        console.log(err);
    });

});


router.get('/expenses-month-get', (req, res) => {
    console.log(req.body);

    const pago = req.body;

    const qu = pool.query('Select * from expensas_  Where Month(created_at) = Month(CURDATE()) || Year(created_at) = Year(CURDATE()) ');


    qu.then(async(result) => {
        console.log(result);
        res.json(result);


    }).catch((err) => {
        console.log(err);
    });

});
router.get('/expenses/current_month', (req, res) => {

    const qu = pool.query("SELECT * FROM expensas_ where  Month(created_at) = Month(CURDATE()) || Year(created_at) = Year(CURDATE()) ");

    qu.then((data) => {
        res.json(data);
    });
});





module.exports = router;