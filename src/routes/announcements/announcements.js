const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');


router.get('/announcements-all/', (req, res) => {

    const qu = pool.query('select * from anuncios_');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });
});



router.get('/delete-announcement/:id', (req, res) => {

    const { id } = req.params;
    const qu = pool.query('delete from anuncios_ where id = ?', [id]);

    qu.then((result) => {
        req.flash('message', 'Evento anuncio con éxito');
        res.render('dashboard/events');

    }).catch((err) => {
        req.flash('error', err);
        res.render('dashboard/events');
    });
});
router.get('/announcements-monthnow/', (req, res) => {

    const qu = pool.query('SELECT *' +
        ' FROM  anuncios_ ' +
        ' WHERE MONTH(event_date) = MONTH(CURRENT_DATE())' +
        ' AND YEAR(event_date) = YEAR(CURRENT_DATE())');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });
});

router.post('/add-announcement/', (req, res) => {

    const { event_date, title, description } = req.body;
    const event = {
        title,
        description
    }
    const qu = pool.query('Insert into anuncios_ set ?', [event]);

    qu.then((result) => {
        console.log(result)
        if (result.insertId) {
            req.flash('message', 'Anuncio creado con éxito');
            res.render('dashboard/events');
        } else {

            req.flash('error', 'Puede que haya habido un error');
            res.render('dashboard/events');
        }

    }).catch((err) => {
        console.log(err);
    });

});





module.exports = router;