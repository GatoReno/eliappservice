const express = require('express');
const router = express.Router();
const { firebase } = require('../../keys.js');
const { v4: uuidv4 } = require('uuid');





const pool = require('../../db');
const admin = require('../firebaseAdmin/firebaseAdmin.js').getAdminFiB();

const fibStorage = admin.storage()


const fs = require('fs');
const multer = require("multer")

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../imgs")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.fieldname + mime.extension)
    }

})


const upload = multer({ storage: storage })

const storageRef = admin.storage().bucket(firebase.storageKey);

async function uploadFile(path, filename) {

    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/imgs/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });


    return storage[0].metadata.mediaLink;
}

async function RemoveImgRefUrlFiB(URL) {
    await admin.storage.refFromURL(URL)
        .then(() => {
            //3.

            console.log("si se elimino")
        })
        .catch((err) => {
            console.log(err);
        })
}

router.post("/updateTicket/", (req, res) => {
    const bucket = admin.storage().bucket();
    const id = req.body.id;

    const oldImage = req.body.img
    console.log(oldImage)
    const name = req.files[0].filename;


    async function deleteImageFromFirebase(imageName) {
        await bucket.file("/imgs/" + imageName).delete();
    }
    deleteImageFromFirebase(oldImage);

    (async() => {
        const url = await uploadFile('\public\\uploads\\' + name, `${name}`);
        const insert = {

            ImagenDelTicket: url,
            nombreDeImagen: req.body.filename
        };
        console.log(url, name)

        pool.query(` UPDATE expensas_
        SET imagenDelTicket = '${url}', nombreDeImagen= '${name}'
        WHERE id = ${id}`)


    })();









    res.redirect("/dashboard")




})

//upload images to firebase
router.post('/expenses-add', (req, res) => {
    console.log(req.body)
    console.log(req.files)




    if (typeof req.files[0] === 'object') {
        console.log("existe file")
        const file = req.files[0]
        const name = file.originalname;


        (async() => {
            const url = await uploadFile('\public\\uploads\\' + name, `${name}`);
            const insert = {
                concepto: req.body.concepto,
                amount: req.body.amount,
                referencia: req.body.referencia,
                ImagenDelTicket: url,
                nombreDeImagen: name
            };


            pool.query("insert into expensas_ set ?", [insert])


        })();





    } else if (typeof req.files[0] == 'undefined') {
        console.log("no existe un file")
        const obj = JSON.parse(JSON.stringify(req.body))
        console.log(obj)
        const insert = {
            concepto: req.body.concepto,
            amount: req.body.amount,
            referencia: req.body.referencia,

        };


        pool.query("insert into expensas_ set ?", [insert])
    }

    res.redirect("/dashboard")


    // 

});





module.exports = router;