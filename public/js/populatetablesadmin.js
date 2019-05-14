
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
function getclients(){
    $.ajax({
        type: 'GET',
        url: '/clients',
        dataType: 'json',
        success: (data) => {

            data.forEach( ( item ) => {
                const row = `<tr>
                    <td><a>${ item.id }</a><br></td>
                    <td><a>${ item.name }</a></td>
                    <td><a>${ item.mail }</a></td>
                    <td><a hrf="">ver</a></td>
                   </tr>`;
                $('#clientsT').append( row );
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

getowners(),getadmins(),getprojects(),getclients();