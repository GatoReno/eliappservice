
  
$(document).ready(function() {
    
    var id_client = $("#id_client").val();

  //  alert(id_client)
    
});

function modalPago(){
        $('#modal_body').empty();
        var str = `<form action="">
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
        url: $('#carreras_datos').val()+'/'+id,
        type: 'GET',
        dataType: 'json',
        success: function(resp) {
            console.log(resp);
            var simg = '<img src="/img/fondos/principal/'+resp[0].icono+'" style="width:75px" />';
            
           
            $("#imgbase").append(simg);
            $("#lbtitlecarrera").append(''+resp[0].carrera);
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