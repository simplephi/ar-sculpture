//Global Variable
var lat = '';
var long = '';
var entityMarker = 0;
var entityGps = 0;



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
					// markerEl.setAttribute('url','https://raw.githubusercontent.com/simplephi/ar-sculpture/main/src/assets/pattern-url_qr-black-big.patt');
					markerEl.setAttribute('url','https://raw.githubusercontent.com/simplephi/ar-sculpture/main/src/assets/pattern-frame.patt');

					markerEl.setAttribute('registerevents','');
					sceneEl.appendChild(markerEl);

          var switchStatus = false;
          $("#togBtn").on('change', function() {
              if ($(this).is(':checked')) {
                  switchStatus = $(this).is(':checked');
                   alert("Marker Based");// To verify
                   console.log(switchStatus, "Marker Based");

                   // Remove GPS Camera
                   // var cameraGPS = document.querySelector('a-camera');
                   // cameraGPS.parentNode.removeChild(cameraGPS);
                  //  var cameraGPS = document.getElementById('cameragps');
                  //  cameraGPS.parentNode.removeChild(cameraGPS);
                  //
                  //  // Add entity camera
                  // var cameraMarker = document.createElement('a-entity');
                  // cameraMarker.setAttribute('camera', '');
                  // sceneEl.appendChild(cameraMarker);




                   var salamanderMarker = document.createElement('a-entity');

                    salamanderMarker.setAttribute('gltf-model', '#salamander');
                    salamanderMarker.setAttribute('animation-mixer', '');

                    salamanderMarker.object3D.position.set(0, 0, 0);
                    salamanderMarker.object3D.scale.set(15, 15, 15);
                    salamanderMarker.object3D.rotation.set(0, 0, 0);

                   markerEl.appendChild(salamanderMarker);



              }
              else {
                 switchStatus = $(this).is(':checked');
                  alert("Marker Based and Location Based");// To verify
                   console.log(switchStatus, "Marker Based and Location Based");
                   console.log(markerEl);

                   // Remove entity camera
                   // var cameraMarker = document.querySelector('a-entity');
                   // cameraMarker.parentNode.removeChild(cameraMarker);
                  //  var cameraMarker = document.getElementById('cameramarker');
                  //  cameraMarker.parentNode.removeChild(cameraMarker);
                  //
                  //
                  //  // Add GPS Camera
                  // var cameraGPS = document.createElement('a-camera');
                  // cameraGPS.setAttribute('gps-camera', '');
                  // cameraGPS.setAttribute('rotation-reader', '');
                  // sceneEl.appendChild(cameraGPS);


                  //////////////////////////////////Detect marker found and lost////////////////////////////////////////////////////

                       markerEl.addEventListener("markerFound", ()=> {


                         console.log('Marker Found');


                         // var cameraPosition = document.querySelector('[gps-camera]').object3D.position;
                         // console.log('Marker Position: ', cameraPosition);


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

                       // marker.addEventListener("markerLost",() =>{
                       markerEl.addEventListener("markerLost",() =>{

                         console.log('Marker Lost');
                       });
                  
                  ////////////////////////////////////////////////////////////////////////////////////


              }
          });

	}

});
