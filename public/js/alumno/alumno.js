  
$(document).ready(function() {
    
    var id_alumno = $("#id_alumno").val();
  
  //  alert(id_client)
    
});

function modal_alumno_edit(id){
   
        console.log(id);
    
        $.ajax({
            url: '/alumno/'+id,
            type: 'GET',
            
            dataType: 'json',
            success: function(resp) {
                console.log(resp);
                $('#modal_body_alumno').empty();
                $('#modal_title_alumno').empty();
                $('#modal_title_alumno').append('Datos alumno');
    
    
                st = `
                
                <form method="POST" action="/update-alumno">
                <input type="hidden" class="form-control" value="${resp[0].id}" name="id">
                <label>Estado</label>
                <input type="text" class="form-control" value="${resp[0].status}" name="status">
                <hr>

                <label>nombre</label>
                <input type="text" class="form-control" value="${resp[0].name}" name="name">
                <hr>

                <label>apellido paterno</label>
                <input type="text" class="form-control" value="${resp[0].lastnameP}" name="lastnameP">
                <hr>

                <label>apellido materno</label>
                <input type="text" class="form-control" value="${resp[0].lastnameM}" name="lastnameM">
                <hr>

                <label>alergias</label>
                <input type="text" class="form-control" value="${resp[0].alergias}" name="alergias">
                <hr>

                <label>tipo de sangre</label>
                <input type="text" class="form-control" value="${resp[0].tiposangre}" name="tiposangre">
                <hr>

                <label>talla</label>
                <input type="text" class="form-control" value="${resp[0].talla}" name="talla">
                <hr>

                <label>precedencia</label>
                <input type="text" class="form-control" placeholder="escuela de procedencia" value="${resp[0].precede}" name="precede">
                <hr>

                <label>clave</label>
                <input type="text" class="form-control" value="${resp[0].clave}" name="clave">
                <hr>

                <label>peso</label>
                <input type="text" class="form-control" value="${resp[0].peso}" name="peso">
                <hr>

                <label>colegiatura</label>
                <input type="number" class="form-control" value="${resp[0].colegiatura}" name="colegiatura">
                <hr>

                <label>seguro</label>
                <input type="text" class="form-control" value="${resp[0].seguro}" name="seguro">
                <hr>

                <label>grado</label>
                <input type="text" class="form-control" value="${resp[0].grado}" name="grado">
                <hr>

                <label>nivel</label>
                <input type="text" class="form-control" value="${resp[0].nivel}" name="nivel">
                <hr>

                <label>observaciones</label>
                <input type="text" class="form-control" value="${resp[0].observaciones}" name="observaciones">
                <hr>

                <label>sexo</label>
                <input type="text" class="form-control" value="${resp[0].sexo}" name="sexo">
                <hr>

                <label>promocion</label>
                <input type="text" class="form-control" value="${resp[0].promocion}" name="promocion">
                <hr>

                <label>estado</label>
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


                <input type="submit" value="Actualizar datos" class="btn btn-success">
                </form>
                `;
                $('#modal_body_alumno').append(st);
                
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