const express = require('express');
const router = express.Router();

const pool = require('../db')

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');

router.get('/', (req,res) => {

    res.render('public/main');    
});



router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('public/profile');
});


router.get('/dashboard',isLoggedIn,(req,res)=>{
    res.render('dashboard/dashboard');
});

router.get('/dashboard/clients',isLoggedIn,(req,res)=>{
    res.render('dashboard/clients');
});

router.get('/restart-clogiaturas',(req,res)=>{
    try{
        const clientes =  pool.query("update clientes_ set estado = 'Deudor'where estado = 'Vigente';");
        const alumos =  pool.query("update alumnos_ set estado = 'Deudor' where estado = 'Vigente';");
         if(clientes) console.log(clientes.id);
                if(alumos) console.log(alumos.id); 
    }
    catch(e){
        console.log(e)
    }

    res.redirect('/dashboard/', 200, req.flash('success',  ' colgiaturas restuaradas '));
});


router.get('/get-usersall',(req,res)=>{
    const admins = [];
    pool.query('SELECT * FROM USERS_');
    query.then((data)=>{
        data.forEach((data) => {
            admins.push(data);
          });
          //console.log(admins)
          res.json(admins);
    }).catch((err)=>{
        console.log(err);
    });

});







//Info for admin
router.get('/get-admins',(req,res)=>{
    const admins = [];
    const query = pool.query('SELECT * FROM USERS_ where admin');
    query.then((data)=>{
        data.forEach((data) => {
            admins.push(data);
          });
          //console.log(admins)
          res.json(admins);
    }).catch((err)=>{
        console.log(err);
    });

});



router.get('/logout',isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;