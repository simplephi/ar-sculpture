window.onload = () => {

     renderPlaces();
};


//Global Variable
var lat = '';
var long = '';

var optionsOldcoord = {
  enableHighAccuracy: true,
  maximumAge: 0
};

var optionsNewcoord = {
  enableHighAccuracy: true,
  maximumAge: 0
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}



function renderPlaces(places) {


				navigator.geolocation.getCurrentPosition(function(position) {

						const newCoordinates = JSON.stringify({
							lat: position.coords.latitude,
							lng: position.coords.longitude
						});
						

            // CREATE
						var body = document.querySelector('a-scene');

						var salamander = document.createElement('a-entity');

						// spiral.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long}`);



            salamander.setAttribute('gltf-model', '#salamander');
            salamander.setAttribute('animation-mixer', '');


            salamander.object3D.position.set(0, 0, 0);
            salamander.object3D.scale.set(50, 50, 50);
            salamander.object3D.rotation.set(0, 0, 0);


            salamander.setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude}`);

						body.appendChild(salamander);



					  console.log('Successfully show AR on marker location based once');

					}, error, optionsNewcoord);

}
