
  
$(document).ready(function() {
    
    var id_client = $("#id_client").val();
    getPagos(id_client);
  //  alert(id_client)
    
});
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


            st = `<label for="">Cantidad: </label>
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
                <table class="table table-hover" height="300">
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