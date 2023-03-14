const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../../db');
const { firebase } = require('../../keys.js');
const { v4: uuidv4 } = require('uuid');
const admin = require('../firebaseAdmin/firebaseAdmin.js').getAdminFiB();


const {
    isLoggedIn,
    isNotLoggedIn
} = require('../../lib/auth');
router.get('/infocliente/:id', (req, res) => {



    const {
        id
    } = req.params;
    const qu = pool.query('select * from clientes_ where id = ?', [id]);



    //vuelve aqui

    const cliente = [];

    qu.then((data) => {
        data.forEach((data) => {

            cliente.push(data);
        });

        res.render('public/info', {
            cliente

        });

    }).catch((err) => {
        console.log(err)
    });



});




router.post('/update-client', (req, res) => {
    const client = req.body;
    const id = req.body.id;



    const qu = pool.query('UPDATE clientes_ set ? where id = ? ', [client, id]);


    qu.then((response) => {
        try {
            console.log(response)
            req.flash('success', 'Datos actualizados');
            //res.redirect('/infoalumno/' + req.body. id);
            res.redirect('back');
        } catch (err) {
            console.log(err)
        }
    }).catch((err) => {
        console.log(err)
    });


    /*
     */

});
//multer
const multer = require("multer");
const { data } = require('jquery');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../imgs")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.fieldname + mime.extension)
    }

})


const storageRef = admin.storage().bucket(firebase.storageKey);
const upload = multer({ storage: storage })

//upload File 
async function uploadFileContrato(path, filename) {


    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/imgs/contratos/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });


    return storage[0].metadata.mediaLink;
}

// check image value contrato
function checkImageValue(myFile) {

    const [file] = miContrato.files
    if (file) {
        document.getElementById("img").src = URL.createObjectURL(file)
    }
    console.log(file)
    var fileHolder = myFile.files[0];
    var filename = fileHolder.name;
}



router.post('/enviarContrato', async(req, res) => {
    const bucket = admin.storage().bucket();



    // const name = req.files[0].filename;


    async function deleteImageFromFirebase(imageName) {
        try { await bucket.file("/imgs/contratos/" + imageName).delete() } catch (err) {
            console.log(err)

        }

    }



    const id = req.body.id;
    //const idAlumno = req.body.idalumno (el input seria maso o menos <input type="hidden" name="alumnoId" value="document.getElementById("alumnosselect")
    const alumno = await pool.query(`select * from alumnos_ where id_cliente = ?`, [id])




    //arreglar esto. siempre nombra el documento con el id del primero de los niños. 
    //hacer dinamico para poder cambiar el id dependiendo al niño.

    if (typeof req.files[0] === 'object') {
        console.log("existe file")
        const file = req.files[0]
        const name = file.originalname;
        const idAlumno = req.body.idAlumno
        const seccionAlumno = req.body.seccionAlumno

        console.log(req.body)

        try {

            let oldImage = `contrato_${id}_${idAlumno}_${seccionAlumno}`
            deleteImageFromFirebase(oldImage);

            (async() => {
                const url = await uploadFileContrato('\public\\uploads\\' + name, `contrato_${id}_${idAlumno}_${seccionAlumno}`);
                const insert = {
                    url: url,
                    clienteId: `${id}`,
                    alumnoId: `${idAlumno}`,
                    tipoDeContrato: `${seccionAlumno}`


                };
                const insert2 = {
                    contrato: url
                };
                pool.query("update alumnos_ set ? where id = ?", [insert2, idAlumno]);
                // pool.query("insert into alumnos_ set ? where id = ?", [insert2, alumno[0].id])





                res.redirect(`/dashboard`);



            })();



        } catch (error) {
            (async() => {
                const url = await uploadFileContrato('\public\\uploads\\' + name, `contrato_${id}_${idAlumno}_${seccionAlumno}`);
                const insert = {
                    url: url,
                    clienteId: `${id}`,
                    alumnoId: `${idAlumno}`,
                    tipoDeContrato: `${seccionAlumno}`



                };
                pool.query("insert contrato set ?", [insert])


                res.redirect("/dashboard")
                console.log(error)


            })();
        }
    }
});



router.get('/clients', (req, res) => {
    const qu = pool.query('SELECT * FROM clientes_ ');

    qu.then((data) => {
        res.json(data);
    });
})
router.get('/clientes-count/', (req, res) => {

    const qu = pool.query("SELECT count(*) totalClientes from clientes_ ;");

    qu.then((data) => {
        res.json(data);
    });
});


router.get('/cliente/:id', (req, res) => {
    const { id } = req.params;

    const qu = pool.query('SELECT * FROM clientes_ where id = ? ', [id]);

    qu.then((data) => {
        res.json(data);
    });
})

router.post('/delete-cliente', (req, res) => {
    const { id_user, id_usercreated } = req.body;


    const query = pool.query('DELETE FROM clientes_ where id = ?', [id_user]);

    query.then(() => {


        req.flash('message', 'Cliente eliminado con éxito');
        res.redirect('/dashboard');
    }).catch((err) => {
        res.json(err)
    });
});


router.post('/add-client', (req, res) => {


    const {
        name_padre,
        escolaridad_padre,
        ocupacion_padre,
        trabajo_padre,
        phone_padre,
        oficina_padre,
        mail_padre,
        parentesco
    } = req.body;


    const client = {
        name: name_padre,
        escolaridad: escolaridad_padre,
        ocupacion: ocupacion_padre,
        trabajo: trabajo_padre,
        phone: phone_padre,
        oficina: oficina_padre,
        mail: mail_padre,
        parentesco: parentesco,
        id_cartera: 0,
        estado:"Agregado a sistema"
    }

    //console.log(client)

    const qu = pool.query('Insert into clientes_ set ?', [client]);

    qu.then((result) => {
        if (result.insertId) {
            req.flash('message', 'Cliente creado con éxito');
            res.render('dashboard/dashboard');
        }

    }).catch((err) => {
        console.log(err);
    });

});


router.get('/clientes-estados-count/', (req, res) => {

    const qu = pool.query(`
                                    SELECT totalVigentes, totalNoVigentes, totalEnProrroga, estadoSinAsignar FROM(
                                        SELECT count( * ) totalVigentes from clientes_ where estado = 'Vigente'
                                    ) a INNER JOIN(
                                        SELECT count( * ) totalNoVigentes from clientes_ where estado = 'Deudor' || estado = 'Prorroga'
                                    ) b on 1 = 1 INNER JOIN(
                                        SELECT count( * ) totalEnProrroga from clientes_ where estado = 'Prorroga'
                                    ) c on 1 = 1 INNER JOIN(
                                        SELECT count( * ) estadoSinAsignar from clientes_ where estado IS NULL
                                    ) d on 1 = 1 `);

    qu.then((data) => {
        res.json(data);
    });
});
router.get('/client/alumnos/:id', (req, res) => {
    const id_cliente = req.params;

    const qu = pool.query('SELECT * FROM alumnos_ where id_cliente = ?', [id_cliente.id]);

    qu.then((data) => {
        res.json(data);
    });
})


router.get('/cliente-pagos-all/:id', (req, res) => {

    const id = req.params.id;

    const qu = pool.query('Select * from  pagos_ where id_cliente = ? order by created_at  desc ', [id]);


    qu.then(async(result) => {

        res.json(result);


    }).catch((err) => {
        console.log(err);
    });

});


router.get('/clientesEnDeuda', (req, res) => {


    const pago = req.body;
    const qu = pool.query('SELECT * FROM clientes_ where estado = "deudor"');
    qu.then(async(result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
});



module.exports = router;