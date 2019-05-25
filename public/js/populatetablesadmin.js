
// -- /get-owners
function getowners(){
    
    $.ajax({
        type: 'GET',
        url: '/get-owners',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<tr>
                    <td><img src="${ item.img }"></td>
                    <td>${ item.name }</td>
                    <td><button>Eliminar</button></td>
                </tr>`;
                $('#ownerT').append( row );
            });
        }

    });
    //$("#ownerT").load();

};

function getprojects(){
    
    $.ajax({
        type: 'GET',
        url: '/get-projects',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<tr>
                    <td><img width="155px" src="/uploads/${ item.img }"></td>
                    <td>${ item.title }</td>
                    <td><a href="/projects/update-project/${item.id}" class="btn btn-default">Editar</a></td>
                    <td><a href="" class="btn btn-danger">Eliminar</a></td>
                </tr>`;
                $('#projectsT').append( row );
            });
        }

    });
    //$("#ownerT").load();

};

function getclientsSelect(){
    $.ajax({
        type: 'GET',
        url: '/clients',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<option value="${ item.id }">
                    ${ item.name }
                   </option>`;
                $('#clientselect').append( row );
            });
        }

    });
};


function alumnosSelect(){
    $.ajax({
        type: 'GET',
        url: '/alumnos',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<option value="${ item.id }">
                    ${ item.name } - ${ item.lastnameP } - ${ item.lastnameM } 
                   </option>`;
                $('#alumnosSelect').append( row );
            });
        }

    });
};

function getadmins(){
    
    $.ajax({
        type: 'GET',
        url: '/get-admins',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<tr>
                    <td><input value="${ item.id }"></td>
                    <td>${ item.name }</td>
                    <td><a class="btn btn-default">Ver</a></td>
                </tr>`;
                $('#usersT').append( row );
            });
        }

    });
    //$("#ownerT").load();

};


function getalumn(){
    
    $.ajax({
        type: 'GET',
        url: '/alumnos',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<tr>
                    <td><input value="${ item.name }"></td>
                    <td>${ item.created_at }</td>
                    <td></td>
                    <td><a href="/infoalumno/${ item.id }" class="btn btn-default">Ver</a></td>
                </tr>`;
                $('#alumnosT').append( row );
            });
        }

    });
    //$("#ownerT").load();

};


function getmaestros(){
    
    $.ajax({
        type: 'GET',
        url: '/maestros',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<tr>
                    <td><input value="${ item.name }"></td>
                    <td>${ item.created_at }</td>
                    <td></td>
                    <td><a href="/infomaestro/${ item.id }" class="btn btn-default">Ver</a></td>
                </tr>`;
                $('#maestrosT').append( row );
            });
        }

    });
    //$("#ownerT").load();

};



function getclients(){
    $.ajax({
        type: 'GET',
        url: '/clients',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<tr>
                    
                    <td>${ item.name }</td>
                    <td></td>
                    <td>${ item.mail }</td>
                    <td><a class="btn btn-default" href="/infocliente/${ item.id}">ver</a></td>
                   </tr>`;
                $('#clientsT').append( row );
            });
        }

    });
};

//getprojects()getowners()
getadmins(),getclients(),getclientsSelect(),getalumn(),getmaestros(),alumnosSelect();