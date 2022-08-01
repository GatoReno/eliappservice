var form = document.getElementById('fibUserForm');
if (form.attachEvent) {
    form.attachEvent("submit", cachSubmit);
} else {
    form.addEventListener("submit", cachSubmit);
}


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDO7k5yUXRcjuZp6LjkTAsH5Lnnfzvj3q0",
    authDomain: "joanmiroapp.firebaseapp.com",
    databaseURL: "https://joanmiroapp.firebaseio.com",
    projectId: "joanmiroapp",
    storageBucket: "gs://joanmiroapp.appspot.com",
    messagingSenderId: "575083241288",
    appId: "1:575083241288:web:1938e40fb269769dbddd7d",
    measurementId: "G-34Q9M01T63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//console.log("auth: ", firebase.auth(firebaseOther)); 
//fibUserForm

function cachSubmit(e) {

    if (e.preventDefault) e.preventDefault();

    console.log(e);
    var name_padre = $('#name_padre').val();
    var parentesco = $('#parentesco').val();
    var escolaridad_padre = $('#escolaridad_padre').val();
    var ocupacion_padre = $('#ocupacion_padre').val();
    var trabajo_padre = $('#trabajo_padre').val();
    var phone_padre = $('#phone_padre').val();
    var mail_padre = $('#mail_padre').val();
    var pass = $('#pass_padre').val();

    var userfib = {
        name: name_padre,
        parentesco: parentesco,
        degree: escolaridad_padre,
        ocupation: ocupacion_padre,
        work: trabajo_padre,
        phone: phone_padre,
        email: mail_padre,
        password: pass
    }

    createFibUser(userfib);

    return false;
}

function createFibUser(userfib) {
    console.log(userfib);

    firebase
        .auth()
        // .createUser({
        //   email: userfib.email,
        //   emailVerified: false,
        //   degree:userfib.degree,
        //   ocupation: userfib.ocupation,
        //   work: userfib.work,
        //   parentesco: userfib.parentesco,
        //   phoneNumber: userfib.phone,
        //   password: userfib.password,
        //   displayName: userfib.name,
        //   //photoURL: 'http://www.example.com/12345678/photo.png',
        //   disabled: false,
        // })
        .createUserWithEmailAndPassword(userfib.email, userfib.password)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });

}

function getclientsFiB() {
    $.ajax({
        type: 'GET',
        url: '/fbi-clients',
        dataType: 'json',
        success: (data) => {
            // console.log(data);
            data.users.forEach((user) => {
                const row = `<tr>
                    
                    <td>${ user.displayName}  </td>
                    <td></td>
                    <td>${ user.email }</td>
                    <td><a class="btn btn-default" href="/infocliente/${ user.uid}">ver</a></td>
                   </tr>`;
                $('#clientsT').append(row);
            });

        }

    });
};





getclientsFiB();