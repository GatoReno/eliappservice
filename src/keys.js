require('dotenv').config()
'use strict';
module.exports = {
    database: {
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b59f84c8e51cbc',
        password: '9ef6b523',
        database: 'heroku_00af922c9869c8e'
    },
    firebase: {
        storageKey: 'gs://joanmiroapp.appspot.com'
    }
}
// mysql://b89790c716b125:c3b01f29@us-cdbr-iron-east-02.cleardb.net/heroku_16c41959ed8b28c?reconnect=true