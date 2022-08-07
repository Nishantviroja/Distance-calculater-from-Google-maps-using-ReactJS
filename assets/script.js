//javascript.js

//set map options
var myLatLng =  { lat: 0, lng: 0 };
var mapOptions = {
    center: myLatLng,
    zoom: 1,
	// minZoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
   
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance
            const output = document.querySelector('#outputkm');
                      
            
            //display route
            directionsDisplay.setDirections(result);
            outputkm.innerHTML= `<div class="card"><div class="card-header">
                <p class="card-r-text">Distance</p>
                <p class="card-l-text">` + result.routes[0].legs[0].distance.text +`s</p>
            </div>
            <div class="card-footer">
            The distance between <strong> `+ document.getElementById("from").value+`</strong> and <strong>`+ document.getElementById("to").value +`</strong> is <strong>` + result.routes[0].legs[0].distance.text + `s.</strong>
            </div>
        </div>`
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            // outputkm.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
            outputkm.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <strong>Could not retrieve </strong> driving distance. !!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
         }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
