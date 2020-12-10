const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');
var serviceAccount =  require('../permissions/joanmiroapp-firebase-adminsdk-sz3cw-a38725b20f.json');

 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://joanmiroapp.firebaseio.com"
  });


router.get('/fbi-clients',(req,res)=>{
    admin
    .auth()
    .listUsers(1000)
    .then((getUsersResult) => {
        console.log('Successfully fetched user data:');
        //console.log(getUsersResult); 
        res.json(getUsersResult);
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
    });
});


module.exports = router;