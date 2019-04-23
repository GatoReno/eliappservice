'use strict';
const express = require('express');
const router = express.Router();
//middles
const fs = require('fs');
const Path = require('path');
const stripe = require('stripe')(process.env.STSK);
const pool = require('../db');

require('../lib/handlebars');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');


router.get('/add', async (req, res) => {

    const owners = await pool.query('SELECT * FROM USERS_ where owner ');
    console.log(owners);
    res.render('projects/add-project', {
        owners: owners
    });

});






router.post('/add-project',  (req, res) => {
    const pdf = req.files[1];
    const img = req.files[0];

    const pdfn = pdf.filename;
    const imgn = img.filename;

    console.log(pdfn);
    console.log(imgn);
    const {
        title,
        fullname,
        mail,
        phone,
        univer,
        mail_investigator,
        name_investigator,
        cvu,
        area,
        url,
        urlyt,
        descrip,
        id_owner
    } = req.body;


    const proj = {
        title: title,
        fullname: fullname,
        mail: mail,
        phone: phone,
        university: univer,
        mail_investigator: mail_investigator,
        name_investigator: name_investigator,
        cvu: cvu,
        area: area,
        url: url,
        urlyt: urlyt,
        description: descrip,
        img: imgn,
        onepayer: pdfn,
        Id_usercreated: 0,
        id_owner: id_owner
    };
    const qu =  pool.query('INSERT INTO PROJECTS_ set ?', [proj]);
    qu.then(() => {
        req.flash('success', 'Proyecto generado');
        res.redirect('projects/projects');

    }).catch((err) => {
        console.log(err)
    });







});


router.get('/get-projects', async (req, res) => {

    const projects = await pool.query('SELECT * FROM PROJECTS_ ');
    console.log(projects);
    res.render('projects/projects', {projects});

  
  });


  router.get('/get-project/:id', (req, res) => {
    const {
      id
    } = req.params;
    const queyk = pool.query('SELECT * FROM PROJECTS_ where id = ?',[id]);
    const links = [];
  
    queyk.then((data) => {
  
      data.forEach((data) => {
        links.push(data);
      });
      //console.log(projects);
      res.render('projects/view', {
        links
      });
    }).catch((err) => {
      res.send('error: ' + err);
      //res.render('err/err',{err: err});
    });
  
  
  });




  router.get('/update-project/:id_project', (req, res) => {
    const {
      id_project
    } = req.params;
    const queyk = pool.query('SELECT * FROM PROJECTS_ where id = ?',[id_project]);
    const projects = [];
  
    queyk.then((data) => {
  
      data.forEach((data) => {
        projects.push(data);
      });
      //console.log(projects);
      res.render('projects/edit-project', {
        projects
      });
    }).catch((err) => {
      res.send('error: ' + err);
      //res.render('err/err',{err: err});
    });
  
  });
  
  router.post('/update-info-project', (req, res) => {
    const {
      id,
      mail,
      phone,
      url,
      urlyt
    } = req.body;
  
    console.log(id, mail, phone, url, urlyt);
    const proj ={
      mail: mail,
      phone: phone,
      url: url,
      urlyt: urlyt
    };
    const queryk =  pool.query('UPDATE PROJECTS_ set ? where id = ? ', [proj, id]);

  
    queryk.then(() => {
      res.render('public/main');
    }).catch((err) => {
      console.log(err);
    });
  });
  
  
  
  // FALTA EL UPDATE DE ESTOS ARCHIVOS Y ELIMINAR ARCHIVOS VIEJOS
  router.post('/update-pdf-project', (req, res) => {
    //const pdf = req.files;
    const {
      id
    } = req.body;
    console.log(req.body);
  
  });
  
  router.post('/update-img-project', (req, res) => {
    //const img = req.files;
    //const {id} = req.body;
    console.log(req.body);
  
  });
  

  //ST


  router.post('/buy-tc', isLoggedIn, async (req, res) => {

    const {
      user_id,
      project_id
    } = req.body;
  
  
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    });
  
  
  
    const charge = await stripe.charges.create({
      amount: '2300',
      currency: 'mxn',
      customer: customer.id,
      description: 'Pago valido por una TrustCoin'
  
    });
  
    
      console.log(charge.id)
  
      console.log(charge);

      const charg = {
        id_proyecto: project_id,
        id_usercreated: user_id,
        id_st: charge.id,
        amount: charge.amount
      };
  
      const query =  pool.query('INSERT into TC_ set ?',[charg]);
      
     
  
      query.then(() => {
        res.render('projects/charges', {
          charge
        }).catch((err) => {
          console.log(err)
        });
      });
   
  
    // res.render('buy: ');
  });
  


module.exports = router;