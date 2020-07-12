
  
$(document).ready(function() {


    $("#div_reporteCliente").hide();
    $("#reporteHolder").hide();  
    var id_client = $("#id_client").val();
    getPagos(id_client);
    getAlumnosClient(id_client);
  //  alert(id_client)
    
});

function modal_client_edit(id){
    //cliente

    $.ajax({
        url: '/cliente/'+id,
        type: 'GET',
        
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
            $('#modal_body').empty();
            $('#modal_title_client').empty();
            $('#modal_title_client').append('Datos cliente');


            st = `
            
            <form method="POST" action="/update-client">
            <input type="hidden" class="form-control" value="${resp[0].id}" name="id">
            <label>Estado</label>
           

            <input type="text" class="form-control" disabled value="${resp[0].estado}" name="estado">
            <hr>
            <select name="estado" id="" class="form-control" >
                <option value="Vigente">Vigente</option>
                <option value="Deudor">Deudor</option>
                <option value="Prorroga">Solicito prorroga</option>
                <option value="Baja temporal">Baja temporal</option>
                <option value="Baja definitiva">Baja definitiva</option>
                </select>

                <hr>

         
            <label>Nombre</label>
            <input type="text" class="form-control" value="${resp[0].name}" name="name">
            <hr>

            <label>escolaridad</label>
            <input type="text" class="form-control" value="${resp[0].escolaridad}" name="escolaridad">
            <hr>
            <label>ocupacion</label>
            <input type="text" class="form-control" value="${resp[0].ocupacion}" name="ocupacion">
            <hr>
            <label>mail</label>
            <input type="text" class="form-control" value="${resp[0].mail}" name="mail">
            <hr>
            <label>Telefono</label>
            <input type="text" class="form-control" value="${resp[0].phone}" name="phone">
            <hr>
            <label>oficina</label>
            <input type="text" class="form-control" value="${resp[0].oficina}" name="oficina">
            <hr>
            <label>parentesco</label>
            <input type="text" class="form-control" value="${resp[0].parentesco}" name="parentesco">
            <hr>

            <label>trabajo</label>
            <input type="text" class="form-control" value="${resp[0].trabajo}" name="trabajo">
            <hr>

          


            <input type="submit" value="Actualizar datos" class="btn btn-success">
            </form>
            `;
            $('#modal_body').append(st);
            
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

function getDatosPago(id){
    console.log(id);

    $.ajax({
        url: '/pago/data/'+id,
        type: 'GET',
        
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
            $('#modal_body').empty();
            $('#modal_title_client').empty();
            $('#modal_title_client').append('Datos Pago');


            st = `
            <label for="">Corresponde al alumno : </label>
            <div id="div_name_modal"></div>
            <hr>

            <label for="">Cantidad: </label>
            $ ${resp[0].amount} mx
            <hr>
            
            <label for="">Fecha : </label>
            ${resp[0].created_at}
            <hr>
            <label for="">Concepto : </label>
            ${resp[0].concepto}
            <hr>
            <label for="">prorroga : </label>
            ${resp[0].prorroga}
            <hr>
           
            <label for="">Saldo a favor :  </label>
            $ ${resp[0].saldo_afavor} mx
            <hr>
            <label for="">Saldo pendiente : </label>
            $ ${resp[0].saldo_pendiente} mxs
            <hr>
            
            <label for="">Tipo de pago :</label>
            ${resp[0].tipo_pago}
            <hr>
            <label for="">Referencia : </label>
            ${resp[0].referencia}
            <hr>
            `;
            $('#modal_body').append(st);

            getAlumno(resp[0].id_alumno);

            
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
function modalPago(){
    var id_client = $("#id_client").val();
    $('#modal_title_client').empty();
    $('#modal_title_client').append('Generar Pago');
        $('#modal_body').empty();
        var str = `<form action="/pago-add" method="POST">
        <input type="hidden" value="${id_client}"  required class="form-control" type="text" name="id_cliente">     
        <small>
        Formulario de pagos. Por favor procure ser breve y concizo </small>
        <br>
        <hr>
        <label for="">Alumno referente al pago</label>
        <div  id="id_alumno"  >
        <select name="id_alumno" id="seleAlumno"  class="form-control" required >

        </select>
        </div>
        <br>
        <hr>

        <label for="">Cantidad</label>
        <input type="number"  required class="form-control" type="text" name="amount">     

        <hr>
        <label for="">Concepto</label>
        <input required  placeholder="colegiatura / otro concepto" type="text" class="form-control" type="text" name="concepto">     

        <hr>
        <label for="">Prorroga</label>
        <input  required placeholder="es prorroga / es pago puntal" class="form-control" type="text" name="prorroga">     

        <hr>
        <label for="">Saldo pendiente</label>
        <input  required placeholder=" $200 o $0" class="form-control" type="number" name="saldo_pendiente">     

        <hr>
        <label for="">Saldo a favor</label>
        <input  required placeholder=" $0 ?"  class="form-control" type="number" id="saldo_afavor" name="saldo_afavor">     

        <hr>
        <label for="">Tipo de Pago</label>
        <select  required name="tipo_pago" id="tipo_pago"  class="form-control">
        <option value="Transferencia">Transferencia</option>
        <option value="Efectivo">Efectivo</option>
        </select>
        <br>
        <hr>
        <input required placeholder="numero de trasnferencia o recibo" class="form-control" type="text" name="referencia">     

        <hr>

        <input type="submit" class="btn btn-success" value="Generar Pago">
        </form>`;
        $('#modal_body').append(str);  
        var id_client = $("#id_client").val();
        getAlumnos(id_client);
      //  $('#modal_client').modal('show');
}
function getPagos(id_client){
    $.ajax({
        url: '/client/pagos/'+id_client,
        type: 'GET',
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
           if(resp.lenght = 0){
                $('#div_pagos').empty();
                $('#div_pagos').append('Cliente sin pagos registrdos aun');
           }else{

            var t = ` 
            
            <div class="top2 table-wrapper-scroll-y">
            <h5 class="card-title">Pagos</h5>
                <table class="table table-hover" >
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Concepto</th>
                            <th scope="col">Antidad</th>

                        </tr>
                    </thead>
                    <tbody id="pagosT">


                    </tbody>
                </table>
            </div>
            `
            $('#div_pagos').append(t);

            resp.forEach(item => {
                const row = `<tr>
                    <td> ${ item.created_at }</td>
                    <td>${ item.concepto }</td>
                    <td> $ ${ item.amount } mx </td>
                    <td> <a  data-toggle="modal" data-target="#modal_client" onclick="return getDatosPago(${item.id})">ver<a> </td>
                </tr>`;
                $('#pagosT').append( row );
                
            });
            


            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var data = jqXHR.responseJSON;
            if (jqXHR.status == 401) {
                //location.reload();
            }

        }
    });
}
function getAlumno(id){

    //div_name_modal
    $.ajax({
        url: '/alumno/'+id,
        type: 'GET',
        
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
            $('#div_name_modal').empty();
             
        
               $('#div_name_modal').append(` ${resp[0].name}   ${resp[0].lastnameP}  ${resp[0].lastnameM} `);
           

         
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
function getAlumnos(id_client){
   
    $.ajax({
        url: '/client/alumnos/'+id_client,
        type: 'GET',
        
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
            $('#seleAlumno').empty();
             
        resp.forEach(e => {
               $('#seleAlumno').append(`<option value="${e.id}">${e.name}</option>`);
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



function getAlumnosClient(id_client){
   
    $.ajax({
        url: '/client/alumnos/'+id_client,
        type: 'GET',
        
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
            $('#div_alumnos_client').empty();
             
        resp.forEach(e => {
               $('#div_alumnos_client').append(`
                <hr>
                <a href="/infoalumno/${e.id}">
                <label  >${e.name} ${e.lastnameP} ${e.lastnameM}</label></a>                    
                <br>
                <label> Estado :  </label> ${e.estado} 
                    
                <hr>
               `);
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

function GenerarReportePagosCliente(id_client) {

    $.ajax({
        url: '/cliente-pagos-all/'+id_client,
        type: 'GET',
        
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
            var t = ` 
            
            <div class="top2 table-wrapper-scroll-y">
            <h5 class="card-title">Pagos</h5>
                <table class="table table-hover" >
                    <thead>
                        <tr>
                            <th scope="col"> Fecha</th>
                            <th scope="col"> Concepto</th>
                            <th scope="col"> Antidad</th>
                            <th scope="col"> Prorroga  </th>
                            <th scope="col"> Tipo de pago  </th>
                            <th scope="col"> Referencia  </th>
                        </tr>
                    </thead>
                    <tbody id="repoPagosT">


                    </tbody>
                </table>
            </div>
            `
            $('#repoClient2').append(t);
             
        resp.forEach(e => {
               const row = `<tr>
                    <td> ${ e.created_at }</td>
                    <td>${ e.concepto }</td>
                    <td> $ ${ e.amount } mx </td>
                    <td> ${ e.prorroga } </td>
                    <td> ${ e.tipo_pago } </td>
                    <td> ${ e.referencia } </td>
                </tr>`;
                $('#repoPagosT').append( row );
           });

         
          
                  
        },
        error: function(jqXHR, textStatus, errorThrown){
            var data = jqXHR.responseJSON;
            if (jqXHR.status == 401) {
                //location.reload();
            }
            console.log(errorThrown)

        }
    });
    

 $.ajax({
        url: '/pagos-cliente-all-accounts/'+id_client,
        type: 'GET',
        
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
             
             
       $('#repoClient1').append('Saldo a en contra:  $ '+
       resp[0].saldoencontra + ' mx / Saldo a favor:  $ '+
       resp[0].saldofavor+' mx');
         
          
 

                  
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var data = jqXHR.responseJSON;
            if (jqXHR.status == 401) {
                //location.reload();
            }
            console.log(errorThrown)

        }
    });
   $("#div_reporteCliente").show();  
   $("#reporteHolder").show();  
    
}


