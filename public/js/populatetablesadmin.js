
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
                    <td>${ item.name } _ ${ item.lastnameP } _ ${ item.lastnameM }</td>
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
                    <td>${ item.parentesco }</td>
                    <td>${ item.mail }</td>
                    <td><a class="btn btn-default" href="/infocliente/${ item.id}">ver</a></td>
                   </tr>`;
                $('#clientsT').append( row );
            });
        }

    });
};

//getprojects()getowners()

function LookFor_Alumnos() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("alumnosT");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  function LookFor_Clients() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputclients");
    filter = input.value.toUpperCase();
    table = document.getElementById("clientsT");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  
getadmins(),getclients(),getclientsSelect(),getalumn(),getmaestros(),alumnosSelect();