
function eliminarPersonal(){
    var idu = $("#id_user").val();
    $('#modal_title').empty();
    $('#modal_title').append('Eliminar Staff');
    $('#modal_staff_body').empty();
        var str = `<form action="/pago-add" method="POST">
        <h3>Estas por eliminar a un miembro del staff, seguro que desas hacer esto?</h3>
        <hr>

        <input type="submit" class="btn btn-success" value="Si estoy seguro, continuar ">
        </form>`;
        $('#modal_staff_body').append(str);  
        var id_client = $("#id_client").val();
        getAlumnos(id_client);
      //  $('#modal_client').modal('show');
}
function modal_staff_edit(id){


$.ajax({
    url: '/data_personal/'+id,
    type: 'GET',
    
    dataType: 'json',
    success: function(resp) {
        console.log(resp);
        $('#modal_staff_body').empty();
        
        $('#modal_title').empty();
        $('#modal_title').append('Datos staff');
        console.log(resp)

        st = `
        
        <form method="POST" action="/update-personal">
        <input type="hidden" class="form-control" value="${resp.id}" name="id">
         

     
        <label>Nombre</label>
        <input type="text" class="form-control" value="${resp.name}" name="name">
        <hr>

        <label>escolaridad</label>
        <input type="text" class="form-control" value="${resp.estudios}" name="estudios">
        <hr>
        <label>ocupacion</label>
        <input type="text" class="form-control" value="${resp.ocupacion}" name="ocupacion">
        <hr>
        <label>mail</label>
        <input type="text" class="form-control" value="${resp.email}" name="mail">
        <hr>
        <label>Telefono</label>
        <input type="text" class="form-control" value="${resp.telefono}" name="telefono">
        <hr>
        <label>CRUP</label>
        <input type="text" class="form-control" value="${resp.curp}" name="curp">
        <hr>
        <label>RFC</label>
        <input type="text" class="form-control" value="${resp.rfc}" name="rfc">
        <hr>

        <label>Sueldo</label>
        <input type="text" class="form-control" value="${resp.sueldo}" name="sueldo">
        <hr>

        
        <label>Profesion</label>
        <input type="text" class="form-control" value="${resp.profesion}" name="profesion">
        <hr>

        
        <label>Domicilo</label>
        <input type="text" class="form-control" value="${resp.domicilio}" name="domicilio">
        <hr>

      


        <input type="submit" value="Actualizar datos" class="btn btn-success">
        </form>
        `;
        $('#modal_staff_body').append(st);
        
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
function modalPagoStaff(){
    var idu = $("#id_user").val();
    $('#modal_title').empty();
    $('#modal_title').append('Generar Pago');
    $('#modal_staff_body').empty();
        var str = `<form action="/pago-add" method="POST">
        <input type="hidden" value="${idu}"  required class="form-control" type="text" name="id_staff">     
        <small>
        Formulario de pagos. Por favor procure ser breve y concizo </small>
        <br>
        <hr>
        

        <label for="">Cantidad</label>
        <input type="number"  required class="form-control" type="text" name="amount">     

        <hr>
        <label for="">Concepto</label>
        <input required  placeholder="colegiatura / otro concepto" type="text" class="form-control" type="text" name="concepto">     

       
       
        <br>
        <hr>
        <input required placeholder="Observaciones" class="form-control" type="text" name="observaciones">     

        <hr>

        <input type="submit" class="btn btn-success" value="Generar Pago">
        </form>`;
        $('#modal_staff_body').append(str);  
        var id_client = $("#id_client").val();
        getAlumnos(id_client);
      //  $('#modal_client').modal('show');
}

//x

function maestroPagosT(){
    var idu = $("#id_user").val();
    $.ajax({
        url: '/pagos-personal-list/'+idu,
        type: 'GET',
        
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $('#maestroPagosT').empty();
            
    
            data.forEach( ( item ) => {
                const row = `<tr>
                    
                    <td>${ item.created_at }</td>
                    <td>$ ${ item.amount } mx</td>
                    <td>${ item.observaciones }</td>
                    <td>${ item.concepto }</td>
                   </tr>`;
                $('#maestroPagosT').append( row );
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



maestroPagosT();