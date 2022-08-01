const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');


//Estados para tablas

router.post('/delete-alumno', (req, res) => {
    const { id_user, id_usercreated } = req.body;
    const query = pool.query('DELETE FROM alumnos_ where id = ?', [id_user]);

    query.then(() => {


        req.flash('message', 'Alumno eliminado con éxito');
        res.redirect('/dashboard');
    }).catch((err) => {
        res.json(err)
    });
});

router.post('/update-alumno', (req, res) => {
    const alumno = req.body;
    const id = req.body.id;



    const qu = pool.query('UPDATE alumnos_ set ? where id = ? ', [alumno, id]);


    qu.then((response) => {
        try {

            req.flash('success', 'Datos actualizados');
            //res.redirect('/infoalumno/' + req.body. id);
            res.redirect('back');
        } catch (err) {
            console.log(err)
        }
    }).catch((err) => {
        console.log(err)
    });
});





router.post('/add-alumno', (req, res) => {
    console.log(req.body);
    const {
        name_alumno,
        lastnameP_alumno,
        lastnameM_alumno,
        alergias_alumno,
        seccion_alumno,
        tiposangre_alumno,
        talla_alumno,
        peso_alumno,
        precede_alumno,
        clave_alumno,
        id_client,
        colegiatura
    } = req.body;

    const alumno = {
        name: name_alumno,
        lastnameP: lastnameP_alumno,
        lastnameM: lastnameM_alumno,
        nivel: seccion_alumno,
        alergias: alergias_alumno,
        tiposangre: tiposangre_alumno,
        talla: talla_alumno,
        peso: peso_alumno,
        precede: precede_alumno,
        clave: clave_alumno,
        id_cliente: id_client,
        colegiatura: colegiatura,
        status: 'alta en sistema'
    }



    const qu = pool.query('Insert into alumnos_ set ?', [alumno]);

    qu.then(async(result) => {
        if (result.insertId) {
            const cartera = {
                id_alumno: result.insertId,
                status: 'alta en sistema, sin pagos aún'
            }
            const query = await pool.query('Insert into cartera_ set ?', [cartera]);
            req.flash('message', 'Datos generados con éxito');
            res.render('dashboard/dashboard');
        }


    }).catch((err) => {
        console.log(err);
    });

});



router.get('/alumnos-count/', (req, res) => {

    const qu = pool.query("SELECT count(*) totalAlumnos from alumnos_ ;");

    qu.then((data) => {
        res.json(data);
    });
});
router.get('/alumnos', (req, res) => {


    //where id_cartera
    const qu = pool.query('select * from alumnos_ ');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });

});
router.get('/alumno/:id', (req, res) => {
    const {
        id
    } = req.params;
    const qu = pool.query('select * from alumnos_ where id = ?', [id]);
    qu.then((resp) => {
        // console.log(error, result, rows, fields);
        res.json(resp)

    }).catch((err) => {
        console.log(err);
    });

});

router.get('/infoalumno/:id', (req, res) => {

    const {
        id
    } = req.params;
    const qu = pool.query('select * from alumnos_ where id = ?', [id]);

    const alumno = [];

    qu.then((data) => {


        data.forEach((data) => {
            alumno.push(data);
        });

        res.render('public/info', {
            alumno
        });

    }).catch((err) => {
        console.log(err)
    });

});

router.get('/alumnosPrim', (req, res) => {
    console.log(req.body);

    const pago = req.body;
    const qu = pool.query('SELECT * FROM alumnos_ where nivel = "primaria"');
    qu.then(async(result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
});


router.get('/alumnosPree', (req, res) => {
    console.log(req.body);

    const pago = req.body;
    const qu = pool.query('SELECT * FROM alumnos_ where nivel = "preescolar"');
    qu.then(async(result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/alumnos-nivel-count/', (req, res) => {

    const qu = pool.query(`
            SELECT  primero, segundo, tercero, cuarto, quinto, sexto
    FROM (
         select Count(*) primero from alumnos_ where grado like '1' 
         ) a
    INNER JOIN (
         select Count(*) segundo from alumnos_ where grado like '2' 
         ) b on 1=1
             INNER JOIN (
         select Count(*) tercero from alumnos_ where grado like '3' 
         ) c on 1=1
             INNER JOIN (
         select Count(*) cuarto from alumnos_ where grado like '4' 
         ) d on 1=1
             INNER JOIN (
         select Count(*) quinto from alumnos_ where grado like '5' 
         ) e on 1=1
             INNER JOIN (
         select Count(*) sexto from alumnos_ where grado like '6' 
         ) f on 1=1            
                 `);

    qu.then((data) => {
        res.json(data);
    });
});

router.get('/alumnos-genero-count/', (req, res) => {

    const qu = pool.query(`SELECT  masculinos, femeninos, total
                FROM (
                    select Count(*) masculinos from alumnos_ where sexo like 'masculin' 
                    ) a
                INNER JOIN (
                    select Count(*) femeninos from alumnos_ where sexo like 'femenino' 
                    ) b on 1=1
                 INNER JOIN (
                    select Count(*) total from alumnos_  
                    ) c on 1=1
                 `);

    qu.then((data) => {
        res.json(data);
    });
});

router.get('/alumnos-estados-count/', (req, res) => {

    const qu = pool.query(`SELECT totalVigentes, totalNoVigentes, totalEnProrroga, estadoSinAsignar
    FROM (
         SELECT count(*) totalVigentes from alumnos_ where estado = 'Vigente'
         ) a
    INNER JOIN (
         SELECT count(*) totalNoVigentes from alumnos_ where estado = 'Deudor' || estado = 'Prorroga'
         ) b on 1=1
    INNER JOIN (
        SELECT count(*) totalEnProrroga from alumnos_ where estado = 'Prorroga'
        ) c on 1=1
        INNER JOIN (
        SELECT count(*) estadoSinAsignar from alumnos_ where estado IS NULL
        ) d on 1=1`);

    qu.then((data) => {
        res.json(data);
    });
});

router.get('/alumn/search/', function(req, res) {


    req.getConnection(function(err, connection) {
        pool.query('SELECT * FROM pacjenci WHERE name LIKE "%' + req.query.key + '%"', function(err, rows, fields) {
            if (err)
                console.log("Error inserting : %s ", err);
            var data = [];
            for (i = 0; i < rows.length; i++) {
                data.push(rows[i]);
            }
            res.end(JSON.stringify(data));

        });
    });

});
router.get('/alumnos-sincartera', (req, res) => {



    const qu = pool.query('select * from alumnos_ where status = 1 ');

    qu.then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    });

});












module.exports = router;