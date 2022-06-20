const express = require('express');
const router = express.Router();
const admin = require('./firebaseAdmin/firebaseAdmin.js').getAdminFiB();

router.get('/fbi-clients', (req, res) => {
    admin
        .auth()
        .listUsers(1000)
        .then((getUsersResult) => {
            //console.log('Successfully fetched user data:');
            //console.log(getUsersResult); 
            res.json(getUsersResult);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });
});


router.post('/fibRegistClient', (req, res) => {
    const { name, phone, email, id } = req.body;
    console.log(req.body);
    admin
        .auth()
        .createUser({
            email: email,
            emailVerified: false,
            phoneNumber: '+' + phone,
            password: '12345678',
            displayName: name,
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);

            req.flash('message', 'Cliente habilitado');
            res.redirect('/infocliente/' + id);
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });

});

router.get('/fbi-client-per-email/:email', (req, res) => {
    const { email } = req.params;
    console.log('looking 4 user data: ' + { email });
    admin.auth().getUserByEmail(email).then((getUsersResult) => {
            console.log('Successfully fetched user data:');
            console.log(getUsersResult);
            res.json(getUsersResult);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });

});


module.exports = router;