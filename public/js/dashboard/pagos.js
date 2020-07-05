  
$(document).ready(function() {
    

    
});


 

function currentYear(){
   
    $.ajax({
        url: '/pagos/current_year/',
        type: 'GET',
        
        dataType: 'json',
        success: function(data) {
            console.log(data);
            
            $('#pagosT').empty();
            $('#saldo_concepto').empty();
        $('#saldo_concepto').append('concepto');
            data.forEach( ( item ) => {
                const row = `<tr>
                    
                    <td>${ item.created_at }</td>
                    <td>$ ${ item.amount } mx</td>
                    <td>${ item.concepto }</td>
                    <td><a class="btn btn-default" data-toggle="modal" data-target="#modal_dash" onclick="return modal_pagosInfo(${ item.id})">ver</a></td>
                   </tr>`;
                $('#pagosT').append( row );
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


function currentMonth(){
   
    $.ajax({
        url: '/pagos/current_month/',
        type: 'GET',
        
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $('#pagosT').empty();
            $('#pagosT').empty();
            $('#saldo_concepto').empty();
        $('#saldo_concepto').append('concepto');
            data.forEach( ( item ) => {
                const row = `<tr>
                    
                    <td>${ item.created_at }</td>
                    <td>$ ${ item.amount } mx</td>
                    <td>${ item.concepto }</td>
                    <td><a class="btn btn-default" data-toggle="modal" data-target="#modal_dash" onclick="return modal_pagosInfo(${ item.id})">ver</a></td>
                   </tr>`;
                $('#pagosT').append( row );
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
  