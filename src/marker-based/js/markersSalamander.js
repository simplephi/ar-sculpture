//Global Variable
var lat = '';
var long = '';

var switchStatus = false;
$("#togBtn").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
         alert(switchStatus);// To verify
         console.log(switchStatus);
    }
    else {
       switchStatus = $(this).is(':checked');
        alert(switchStatus);// To verify
         console.log(switchStatus);
    }
});

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



AFRAME.registerComponent('markers_start',{
	init:function(){

					var sceneEl = document.querySelector('a-scene');

					var markerEl = document.createElement('a-marker');

					markerEl.setAttribute('type','pattern');
					markerEl.setAttribute('url','https://raw.githubusercontent.com/simplephi/ar-sculpture/main/src/assets/pattern-url_qr-black-big.patt');

					markerEl.setAttribute('registerevents','');
					sceneEl.appendChild(markerEl);


	}

});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {


				console.log('Marker Found');


				var cameraPosition = document.querySelector('[gps-camera]').object3D.position;
				console.log('Marker Position: ', cameraPosition);


				// ADD MODELS AFTER MARKER FOUND
				navigator.geolocation.getCurrentPosition(function(position) {

						const newCoordinates = JSON.stringify({
							lat: position.coords.latitude,
							lng: position.coords.longitude
						});
						// console.log('stringified coordinates', newCoordinates);
						// localStorage.setItem('coords', newCoordinates);


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



			}, {once : true});

			marker.addEventListener("markerLost",() =>{

				console.log('Marker Lost');
			});
		},
	});
