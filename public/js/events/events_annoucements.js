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
function getAllAnnoucements(){
    $.ajax({
        type: 'GET',
        url: '/announcements-all',
        dataType: 'json',
        success: (data) => {
        console.log(data)
            data.forEach( ( item ) => {
                 
                const row = `<tr>
                    <td>${ item.title }</td>
                    <td>${ item.description }</td>    
                    <td><a class="btn btn-sm btn-danger" href="/delete-announcement/${ item.id }">Delete</a>
                    </td>                   
                </tr>`;
                $('#announcemntsT').append( row );
            });
        }
    });}

   getAllEvents(),getAllAnnoucements();