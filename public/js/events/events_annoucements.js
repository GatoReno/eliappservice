function getAllEvents(){
            $.ajax({
                type: 'GET',
                url: '/events-all',
                dataType: 'json',
                success: (data) => {
                console.log(data)
                    data.forEach( ( item ) => {
                        let dt = item.event_date;
                        dt = dt.slice(dt.lenght, 16);
                        dt = dt.replace('T',' / ');
                        const row = `<tr>
                            <td>${ item.title }</td>
                            <td>${ dt }</td>    
                            <td><a class="btn btn-sm btn-danger" href="/delete-event/${ item.id }">Delete</a>
                            </td>                   
                        </tr>`;
                        $('#eventsT').append( row );
                    });
                }
            });}

   getAllEvents();