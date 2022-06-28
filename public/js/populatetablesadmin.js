// -- /get-owners
/*function getowners(){
    
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

};*/


function getclientsSelect() {
    $.ajax({
        type: 'GET',
        url: '/clients',
        dataType: 'json',
        success: (data) => {

            data.forEach((item) => {
                const row = `<option value="${ item.id }">
                    ${ item.name }
                   </option>`;
                $('#clientselect').append(row);
            });
        }

    });
};



function getadmins() {

    $.ajax({
        type: 'GET',
        url: '/get-admins',
        dataType: 'json',
        success: (data) => {

            data.forEach((item) => {
                const row = `<tr>
                    <td><input value="${ item.id }"></td>
                    <td>${ item.name }</td>
                    <td><a class="btn btn-default">Ver</a></td>
                </tr>`;
                $('#usersT').append(row);
            });
        }

    });
    //$("#ownerT").load();

};


function getalumn() {

    $.ajax({
        type: 'GET',
        url: '/alumnos',
        dataType: 'json',
        success: (data) => {

            data.forEach((item) => {
                const row = `<tr>
                    <td>${ item.name }  ${ item.lastnameP }  ${ item.lastnameM }</td>
                    <td>${ item.created_at }</td>
                    <td>${ item.estado }</td>
                    <td><a href="/infoalumno/${ item.id }" class="btn btn-default">Ver</a></td>
                </tr>`;
                $('#alumnosT').append(row);
            });
            getalumnGenders();
            getalumnLevels();
        }

    });

};


function getalumnGenders() {

    $.ajax({
        type: 'GET',
        url: '/alumnos-genero-count',
        dataType: 'json',
        success: (data) => {
            $('#genero-data').empty();
            $('#genero-data').append(`boys : ${ data[0].masculinos }  / girls : ${ data[0].femeninos } / total : ${ data[0].total }`);

        }
    });
}


function getalumnLevels() {

    $.ajax({
        type: 'GET',
        url: '/alumnos-nivel-count',
        dataType: 'json',
        success: (data) => {
            $('#nivel-data').empty();
            $('#nivel-data').append(`
                first : ${ data[0].primero }  / 
                second : ${ data[0].segundo } / 
                thrid : ${ data[0].tercero } /
                fourth : ${ data[0].cuarto } / 
                fifth : ${ data[0].quinto } / 
                sixth : ${ data[0].sexto } / 
                
                `);

        }
    });
}

function getmaestros() {

    $.ajax({
        type: 'GET',
        url: '/maestros',
        dataType: 'json',
        success: (data) => {

            data.forEach((item) => {
                const row = `<tr>
                    <td><input value="${ item.name }"></td>
                    <td>${ item.created_at }</td>
                    <td></td>
                    <td><a href="/info_personal/${ item.id }" class="btn btn-default">Ver</a></td>
                </tr>`;
                $('#maestrosT').append(row);
            });
        }

    });
    //$("#ownerT").load();

};



function getclients() {
    $.ajax({
        type: 'GET',
        url: '/clients',
        dataType: 'json',
        success: (data) => {

            data.forEach((item) => {
                const row = `<tr>
                    
                    <td>${ item.name} / ${ item.parentesco }</td>
                    <td>${ item.estado }</td>
                    <td>${ item.mail }</td>
                    <td><a class="btn btn-default" href="/infocliente/${ item.id}">ver</a></td>
                   </tr>`;
                $('#clientsT').append(row);
            });
        }

    });
};
0
//tableGastosTitle


function getexpensassall() {
    $.ajax({
        type: 'GET',
        url: '/expenses-month-get',
        dataType: 'json',
        success: (data) => {
            console.log(data)


            //console.log(data);
            $('#gastosT').empty();

            $('#tableGastosTitle').empty();
            $('#tableGastosTitle').append('Gastos del mes ');
            var imgId = 0;

            data.forEach((item) => {

                var img = item.imagenDelTicket
                var imgName = item.nombreDeImagen
                console.log(item.id)

                var row = `<tr>
                <td>${ item.concepto }</td>
                <td>$ ${ item.amount } mx</td>                    
                <td>$ ${ item.created_at } mx</td>
              
                  `;

                if (img != null) {
                    row += `<td> <a  id="${imgId}"href="${img}">   Descargar imagen </a> </td>
                    
                   `

                }

                var id = item.id;
                var c = item.concepto


                row += `<td> <a  data-toggle="modal" data-target="#modal_dash"
                 onclick="return modal_updateTicketImage(${id}, '${c}', '${imgName}')"   >   Actualizar imagen </a> </td> </tr>`


                //hacer que desaparezca el hyperlink si href es null
                $('#gastosT').append(row);



                imgId++

            });

        }
    });
};




function getpagosall() {
    $.ajax({
        type: 'GET',
        url: '/pagos/all',
        dataType: 'json',
        success: (data) => {
            //console.log(data);
            $('#pagosT').empty();

            $('#saldo_concepto').empty();
            $('#saldo_concepto').append('saldo pendiente');
            $('#tablepagostitle').empty();
            $('#tablepagostitle').append('Todos los pagos hasta hoy');

            data.forEach((item) => {
                const row = `<tr>
                <td>${ item.concepto } / ${ item.created_at }</td>
                   
                    <td>$ ${ item.amount } mx</td>                    
                    <td>$ ${ item.saldo_pendiente } mx</td>
                    <td><a class="btn btn-default"  data-toggle="modal" data-target="#modal_dash" onclick="return modal_pagosInfo(${ item.id})">ver</a></td>
                   </tr>`;
                $('#pagosT').append(row);
            });
        }
    });
};





function LookFor_Pagos() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputPagos");
    filter = input.value.toUpperCase();
    table = document.getElementById("pagosT");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            //console.log(txtValue)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


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


function LookFor_Gastos() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputGastos");
    filter = input.value.toUpperCase();
    table = document.getElementById("gastosT");
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



function modal_reiniciarColegiaturas() {
    $('#modal_title_dash').empty();
    $('#modal_body_dash').empty();

    $('#modal_title_dash').append('<h4>Seguro quieres reiniciar las colegiaturas?</h4>');
    var st = `<p>Al hacer esto actualizaras a todos los clientes y a todos los alumnos como deudores.</p>
    <small>Sabiendo esto seguro deseas continuar?<small><br>
        <a class="btn btn-success" href="/restart-clogiaturas" >Si estoy seguro, continuar</a>
    `;

    $('#modal_body_dash').append(st);

}



function modal_addTicket() {
    $('#modal_title_dash').empty();
    $('#modal_body_dash').empty();

    $('#modal_title_dash').append('<h4>Agregar Ticket de compra</h4>');
    var st = `
    <small>Deseas agregar algun concepto a los gatos del mes?<small><br>
    <hr>
    <form method="POST" action="/expenses-add" enctype="multipart/form-data">
            <label>Concepto</label>
            <input name="concepto" required class="form-control" placeholder="Compra de inmueble / despensa / mantenimiento / pago de agua /  pago de luz" type="text">
            <br>


    
            <label>Cantidad</label>
            <input name="amount" required class="form-control" placeholder="" type="number">
            <br>
            

            <hr>
            <label>Referencia o ticket</label>
            <input name="referencia" required class="form-control" placeholder="numero de referencia / factura / etc" type="">
            <br>
            
            <label>Adjunte una imagen de ticket (Opcional)</label>
            <input type="file" onchange="checkImageValue(this)" id="myFile" name="ImagenDelTicket">
            <img id="img" width="200px" style="margin-top:5px">
            <hr>

          
           
            <input type="submit"  value="Save" class="btn btn-success "/>
            

    </form>
    `;

    $('#modal_body_dash').append(st);

}


function modal_updateTicketImage(id, concepto, img) {

    $('#modal_title_dash').empty();
    $('#modal_body_dash').empty();

    $('#modal_title_dash').append('<h4>Actualizar imagen de Ticket</h4>');
    var st = `
    <small>Concepto: ${concepto}  <small><br>
    <hr>
    <form method="post" action="/updateTicket" enctype="multipart/form-data">
          
            <label>Adjunte una imagen de ticket (Opcional)</label>
            <input type="file" onchange="checkImageValue(this)" id="myFile" name="ImagenDelTicket" require>
            <img id="img" width="200px" style="margin-top:5px">
            

         
           <input type="hidden" value="${id}" name="id">
           <input type="hidden" value="${img}" name="img">
           <input type="hidden" value="${concepto}" name="concepto">

            <input type="submit" value="Save" class="btn btn-success "/>
        
    </form>
    `;

    $('#modal_body_dash').append(st);

}
var files = []
var reader = new FileReader()

function checkImageValue(myfile) {

    const [file] = myFile.files
    if (file) {
        document.getElementById("img").src = URL.createObjectURL(file)
    }
    console.log(file)
    var fileHolder = myFile.files[0];
    var filename = fileHolder.name;
}


// const [file] = myFile.files
// if (file) {
//     document.getElementById("img").src = URL.createObjectURL(file)
// }
// console.log(file)
// var fileHolder = myFile.files[0];
// var filename = fileHolder.name;
// console.log(filename)




function modal_GenerarInforme() {

    $('#modal_title_dash').empty();
    $('#modal_body_dash').empty();

    $('#modal_title_dash').append('<h4>Seguro quieres generar un reporte mensual?</h4>');
    var st = `<p>Esta accion creara un reporte de los datos recolectados en el mes presente y hasta el momento
    en que esta accion se ejecute. Dicho reporte se adjuntara a la seccion de reportes. <b> Asegurate de tener a todos los alumnos 
    y clientes con un estado antes de hacer un reporte<b/>
    Se recomiendo hacer esta accion cada fin de mes y por lo menos una vez al mes.</p>
    <small>Sabiendo esto seguro deseas continuar?<small><br>
        <a class="btn btn-success " onclick="return GenerarReporteMensualPagos()">Si estoy seguro, continuar</a>
    `;

    $('#modal_body_dash').append(st);

}

function GenerarReporteMensualPagos() {
    $('#modal_dash').modal('hide');
    $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();
    $('#pagosStandar').hide();

    getAlumnosPreescolar();
    getAlumnosPrim();
    getClienteEndeuda();
    getcurrentMonthPagos()
    $('#printRepo').removeClass("hidden");
    $('#backPagos').removeClass("hidden");

    $('#pagosReporte').removeClass("hidden");

}

function ShowPagos() {
    $('#printRepo').hide();
    $('#backPagos').hide();

    $('#pagosReporte').hide();
    $('#pagosStandar').show();
}

function getcurrentMonthPagos() {

    $.ajax({
        url: '/pagos/current_month/',
        type: 'GET',

        dataType: 'json',
        success: function(data) {
            console.log(data);
            $('#pagosCurrenT').empty();
            $('#pagosCurrenT').empty();
            $('#saldo_concepto').empty();

            $('#pagosCurrenTitle').empty();
            $('#pagosCurrenTitle').append('Todos los pagos del mes hasta hoy');

            data.forEach((item) => {
                const row = `<tr>
                <td>${ item.concepto }</td>
                    <td>${ item.created_at }</td>
                    <td>$ ${ item.amount } mx</td>
                    
                    <td>${ item.saldo_afavor }  </td>
                    <td>${ item.saldo_pendiente }  </td>
                   </tr>`;
                $('#pagosCurrenT').append(row);
            });



        },
        error: function(jqXHR, textStatus, errorThrown) {
            var data = jqXHR.responseJSON;
            if (jqXHR.status == 401) {
                //location.reload();
            }
            console.log(errorThrown)

        }
    });
}

function getClienteEndeuda() {
    $.ajax({
        type: 'GET',
        url: '/clientesEnDeuda',
        dataType: 'json',
        success: (data) => {
            //console.log(data);
            $('#deudoresT').empty();
            var total = '' + data.length;
            $('#deudoresT').empty();
            $('#deudoresTitle').empty();
            $('#deudoresTitle').append('total: ' + total);
            data.forEach((item) => {
                const row = `<tr>
                <td>${ item.name }  </td>
                   
                    
                    <td> ${ item.parentesco } </td>
                    <td> ${ item.estado } </td>                    
                    
                   </tr>`;
                $('#deudoresT').append(row);
            });
        }
    });
}



function getAlumnosPrim() {
    $.ajax({
        type: 'GET',
        url: '/alumnosPrim',
        dataType: 'json',
        success: (data) => {
            //console.log(data);
            $('#primariaT').empty();
            var total = '' + data.length;
            $('#primariaT').empty();
            $('#primariaTitle').empty();
            $('#primariaTitle').append('total: ' + total);
            data.forEach((item) => {
                const row = `<tr>
                <td>${ item.name }  ${ item.lastnameP } ${ item.lastnameM }</td>
                   
                    <td>$ ${ item.colegiatura } mx</td>                    
                    <td> ${ item.estado }   </td>
                    <td> ${ item.grado }   </td>
                   </tr>`;
                $('#primariaT').append(row);
            });
        }
    });
}


function getAlumnosPreescolar() {
    $.ajax({
        type: 'GET',
        url: '/alumnosPree',
        dataType: 'json',
        success: (data) => {
            //console.log(data);
            $('#preescolarT').empty();
            var total = '' + data.length;
            $('#preescolarT').empty();
            $('#preescolarTitle').empty();
            $('#preescolarTitle').append('total: ' + total);
            data.forEach((item) => {
                const row = `<tr>
                <td>${ item.name }  ${ item.lastnameP } ${ item.lastnameM }</td>
                   
                    <td>$ ${ item.colegiatura } mx</td>                    
                    <td>  ${ item.estado }   </td>
                    
                   </tr>`;
                $('#preescolarT').append(row);
            });
        }
    });
}





function getAlumnoPagoDiv(id) {

    //div_name_modal
    $.ajax({
        url: '/alumno/' + id,
        type: 'GET',

        dataType: 'json',
        success: function(resp) {
            // console.log(resp);
            $('#payment_for').empty();

            $('#payment_for').append(` ${resp[0].name}   ${resp[0].lastnameP}  ${resp[0].lastnameM} `);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var data = jqXHR.responseJSON;
            if (jqXHR.status == 401) {
                //location.reload();
            }
            console.log(errorThrown)

        }
    });
}

function getClientPagoDiv(id) {
    $.ajax({
        url: '/cliente/' + id,
        type: 'GET',

        dataType: 'json',
        success: function(resp) {
            // console.log(resp);
            $('#payment_owner').empty();

            $('#payment_owner').append(` <a href="/infocliente/${resp[0].id}"> ${resp[0].name} </a>`);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var data = jqXHR.responseJSON;
            if (jqXHR.status == 401) {
                //location.reload();
            }
            console.log(errorThrown)

        }
    });
}

function modal_pagosInfo(id) {


    $.ajax({
        type: 'GET',
        url: '/pago/data/' + id,
        dataType: 'json',
        success: (data) => {
            //console.log(data);
            $('#modal_title_dash').empty();
            $('#modal_body_dash').empty();
            //call alumno y cliente info

            const row = `
            <p>${ data[0].concepto } / ${ data[0].created_at }</p>
               
                <p>Cantidad : $ ${ data[0].amount } mx</p>                    
                <p>Saldo pendiente :  $ ${ data[0].saldo_pendiente } mx</p>
                <p>Saldo a favor :  $ ${ data[0].saldo_afavor } mx</p>
                <p>Refrencia :  ${ data[0].referencia } </p>
                <p>Tipo de pago :  ${ data[0].tipo_pago } </p>
                <p>Prorroga :  ${ data[0].prorroga } </p>
                <p>Cliente  <div id="payment_owner"></div> </p>
                <p>Alumno  <div id="payment_for"></div> </p>
               `;
            $('#modal_body_dash').append(row);
            getAlumnoPagoDiv(data[0].id_alumno);
            getClientPagoDiv(data[0].id_cliente);
            $('#modal_title_dash').append(data[0].concepto);
        }

    });

}

function getLabelAndDataPagos() {
    $.ajax({
        type: 'GET',
        url: '/pagos/current_month/count_per_day',
        dataType: 'json',
        success: (data) => {
            //console.log(data);
            drawChartPagos(data);

        }

    });
}

function getLabelAndDataPagos() {
    $.ajax({
        type: 'GET',
        url: '/pagos/current_month/count_per_day',
        dataType: 'json',
        success: (data) => {
            //console.log(data);
            drawChartPagos(data);

        }

    });
}

function drawChartPagos(obj) {
    //console.log(obj);

    var labels = []
    var data = [];


    obj.forEach(e => {
        labels.push(e.day);
        data.push(e.pagos);
    });
    var t = new Date();

    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);



    labels.push('ULTIMO DIA DEL MES');

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# pagos del mes',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

function getClientesGeneral() {

    $.ajax({
        type: 'GET',
        url: '/clientes-estados-count',
        dataType: 'json',
        success: (data) => {

            drawChartClientesGeneral(data);

        }

    });
}

function getAlumnosGeneral() {
    $.ajax({
        type: 'GET',
        url: '/alumnos-estados-count',
        dataType: 'json',
        success: (data) => {

            drawChartAlumnosGeneral(data);

        }

    });
}

function drawChartAlumnosGeneral(obj) {
    console.log(obj);

    if (obj[0].estadoSinAsignar) {
        alert("Tienes alumnos sin estado! Puedes consultarlos en Alumnos > Ver > Actualizar datos > 'eliges el estado' > Actualizar estado. Recuerda hacer esto siempre que registres un pago.");
    }


    new Chart(document.getElementById("myChartAlumnos"), {
        type: 'pie',
        data: {
            labels: ["Vigentes", "No vigentes", "En prorroga", "Sin estado"],
            datasets: [{
                label: "Clientes",
                backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(241,39,39,0.7)", "rgba(249,234,37,0.7)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(241,39,55,1)", "rgba(249,245,26,1)"],
                data: [obj[0].totalVigentes, obj[0].totalNoVigentes, obj[0].totalEnProrroga, obj[0].estadoSinAsignar]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Estado de los alumnos'
            }
        }
    });

}

function drawChartClientesGeneral(obj) {
    console.log(obj);

    if (obj[0].estadoSinAsignar) {
        alert("Tienes clientes sin estado! Puedes consultarlos en Clientes > Ver > Actualizar datos > 'eliges el estado' > Actualizar estado. Recuerda hacer esto siempre que registres un pago.");
    }


    new Chart(document.getElementById("myChartClientes"), {
        type: 'pie',
        data: {
            labels: ["Vigentes", "No vigentes", "En prorroga", "Sin estado"],
            datasets: [{
                label: "Clientes",
                backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(241,39,39,0.7)", "rgba(249,234,37,0.7)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(241,39,55,1)", "rgba(249,245,26,1)"],
                data: [obj[0].totalVigentes, obj[0].totalNoVigentes, obj[0].totalEnProrroga, obj[0].estadoSinAsignar]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Estado de los clientes'
            }
        }
    });

}


function countAlumnos() {
    $.ajax({
        type: 'GET',
        url: '/alumnos-count',
        dataType: 'json',
        success: (data) => {

            $('#alumnos_count').empty();
            $('#alumnos_count').append('Total de alumnos: ' + data[0].totalAlumnos);

        }
    });
}

function countClientes() {
    $.ajax({
        type: 'GET',
        url: '/clientes-count',
        dataType: 'json',
        success: (data) => {

            $('#clientes_count').empty();
            $('#clientes_count').append('Total de clientes: ' + data[0].totalClientes);

        }
    });
}

function countPagosTotalPorAlumno() {
    //
    $.ajax({
        type: 'GET',
        url: '/pagos/current_month/count',
        dataType: 'json',
        success: (data) => {

            $('#pagomes_count').empty();
            $('#pagomes_count').append('Total de pagos en el mes : ' + data[0].totalPagosMes);

        }
    });
}
getLabelAndDataPagos(), getAlumnosGeneral(), countClientes(), countAlumnos(), countPagosTotalPorAlumno(),
    getadmins(), getclients(), getclientsSelect(), getalumn(), getmaestros(), alumnosSelect(), getpagosall(), getClientesGeneral(), getexpensassall();