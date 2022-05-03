const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');


//Estados para tablas


router.get('/alumnos-count/', (req, res) => {

    const qu = pool.query("SELECT count(*) totalAlumnos from alumnos_ ;");

    qu.then((data) => {
        res.json(data);
    });
});







module.exports = router;