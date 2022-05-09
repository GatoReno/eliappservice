const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');
const admin = require('../firebaseAdmin/firebaseAdmin.js').getAdminFiB();
const fs = require('fs');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');



router.post('/expenses-add', (req, res) => {
   //checking req body
    console.log(req.body);

    const {concepto,amount,referencia,ImagenDeTicket} = req.body;
    

    //confirmar que ImagenDeTicket sea una imagen // podrias o no usar multer

    // if(ImagenDeTicket){
    //     //EXIST
    //      //subir img a Fib
    //     // ImagenDeTicket = var link "AWAIT" adminFiB.storage().ref("images/" + filename).put(filedeMulter) o puede ser sin el
    //     // link me debe devolver el url de la imagen
       
    // }else{ ImagenDeTicket = ""}

    // //creas pago con los otros params de req body
    // const pago = {
    //     concepto,
    //     amount,
    //     referencia,
    //     ImagenDeTicket  

    // }

    // const qu = pool.query('Insert into expensas_ set ?', [pago]);

    // //decomentas query
    
    // qu.then(async(result) => {
    //     if (result.insertId) {
    //         console.log(result);
    //         //const query = await pool.query('Update clientes_ set id_cartera = ? where id = ?', [result.insertId, id_cliente]);
    //         req.flash('message', 'Ticket creado con éxito!');
    //         res.redirect('/dashboard');
    //     }

    // }).catch((err) => {
    //     console.log(err);
     
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