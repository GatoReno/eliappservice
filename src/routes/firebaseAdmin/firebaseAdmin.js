var admin = require('firebase-admin');
var serviceAccount = require('../../permissions/joanmiroapp-firebase-adminsdk-sz3cw-a38725b20f.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://joanmiroapp.firebaseio.com"
});

function getAdminFiBInstance() {
    return admin;
}


module.exports = { getAdminFiB: getAdminFiBInstance };