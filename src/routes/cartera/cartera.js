const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');


router.post('/cartera-update', (req, res) => {
    const {
        id_alumno,
        id_cartera
    } = req.body;

    const qu = pool.query('Update cartera_ set id_alumno = ?, status = ? where id = ?', [id_alumno, 'alta-en-sistema', id_cartera]);
    qu.then(async(resp, error, result, rows, fields) => {
        console.log(error, result, rows, fields);
        if (resp.affectedRows > 0) {
            const query2 = await pool.query('Update alumnos_ set id_cartera = ? ,  status = ?  where id =  ?', [id_cartera, 'alta-en-sistema', id_alumno]);
            req.flash('message', 'Cartera modificada con éxito');
            res.render('dashboard/dashboard');
        }
    }).catch((errr) => {
        console.log(errr)
    });;
});

router.post('/cartera-add', (req, res) => {
    console.log(req.body);
    const {
        id_cliente
    } = req.body;

    const wallet = {
        id_cliente: id_cliente,
        status: 'sin asignar'
    }
    const qu = pool.query('Insert into cartera_ set ?', [wallet]);

    qu.then(async(result) => {
        if (result.insertId) {
            const query = await pool.query('Update clientes_ set id_cartera = ? where id = ?', [result.insertId, id_cliente]);
            req.flash('message', 'Cartera creado con éxito');
            res.render('dashboard/dashboard');
        }

    }).catch((err) => {
        console.log(err);
    });

});

router.get('/carteras/:id', (req, res) => {
    const {
        id
    } = req.params;
    const qu = pool.query(' select cartera_.id id , alumnos_.name name  from cartera_ inner join  alumnos_ ON alumnos_.id_cartera = cartera_.id where cartera_.id_cliente = 32', [id]);

    const carteras = [];

    qu.then((data) => {

        data.forEach((data) => {
            carteras.push(data);
        });

        res.json(carteras);

    }).catch((err) => {
        console.log(err)
    });

});
router.get('/infocartera/:id', (req, res) => {

    const {
        id
    } = req.params;
    const qu = pool.query('select * from cartera_ where id = ?', [id]);

    const cartera = [];

    qu.then((data) => {

        data.forEach((data) => {
            cartera.push(data);
        });

        res.render('public/info', {
            cartera
        });

    }).catch((err) => {
        console.log(err)
    });

});
router.get('/alumno-cartera/:id', (req, res) => {
    const { id } = req.params;
    const qu = pool.query('SELECT * FROM cartera_ where id_alumno = ? ', [id]);
    qu.then((data) => {
        res.json(data);
    });
})
router.get('/cliente-carteras/:id', (req, res) => {
    const { id } = req.params;

    const qu = pool.query('select * from cartera_ where id_cliente = ?', [id]);
    qu.then((resp) => {
        res.json(resp);
    }).catch((err) => {
        console.log(err);
    });
});


module.exports = router;