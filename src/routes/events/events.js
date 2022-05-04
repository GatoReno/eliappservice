const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');


router.get('/events-page/', (req, res) => {

    res.render('dashboard/events');
});

router.get('/events-all/', (req, res) => {

    const qu = pool.query('select * from events_');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });
});


router.get('/delete-event/:id', (req, res) => {

    const { id } = req.params;
    const qu = pool.query('delete from events_ where id = ?', [id]);

    qu.then((result) => {
        req.flash('message', 'Evento eliminado con éxito');
        res.render('dashboard/events');

    }).catch((err) => {
        req.flash('error', err);
        res.render('dashboard/events');
    });
});
router.get('/events-monthnow/', (req, res) => {

    const qu = pool.query('SELECT *' +
        ' FROM  events_' +
        ' WHERE MONTH(event_date) = MONTH(CURRENT_DATE())' +
        ' AND YEAR(event_date) = YEAR(CURRENT_DATE())');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });
});



router.post('/add-event/', (req, res) => {

    const { event_date, title, description } = req.body;
    const event = {
        title,
        event_date,
        description
    }
    const qu = pool.query('Insert into events_ set ?', [event]);

    qu.then((result) => {
        console.log(result)
        if (result.insertId) {
            req.flash('message', 'Evento creado con éxito');
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