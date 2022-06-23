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

					// markerEl.setAttribute('url','https://raw.githubusercontent.com/simplephi/ar-sculpture/main/src/assets/pattern-frame.patt');
					markerEl.setAttribute('url','https://raw.githubusercontent.com/simplephi/ar-sculpture/main/src/assets/pattern-hiro.patt');

					markerEl.setAttribute('registerevents','');
					sceneEl.appendChild(markerEl);

          var switchStatus = false;
          $("#togBtn").on('change', function() {
              if ($(this).is(':checked')) {
                  switchStatus = $(this).is(':checked');
                   alert("Marker Based");// To verify
                   console.log(switchStatus, "Marker Based");

                  entityMarker = 1;

                  if(entityMarker==1){

                   var marsrobotMarker = document.createElement('a-entity');

                    marsrobotMarker.setAttribute('gltf-model', '#marsrobot');
                    marsrobotMarker.setAttribute('animation-mixer', '');
                    marsrobotMarker.setAttribute('id', 'marsrobotMarker');

                    marsrobotMarker.object3D.position.set(0, 0, 0);
                    marsrobotMarker.object3D.scale.set(15, 15, 15);
                    marsrobotMarker.object3D.rotation.set(0, 0, 0);

                    marsrobotMarker.setAttribute('sound', {
                      src: '#MarsRobotSound',
                      on: 'click',
                      volume: 5,
                    });

                   markerEl.appendChild(marsrobotMarker);


                 }
                 else if(entityMarker==1 && entityGps==1){



                   var marsrobotMarker = document.createElement('a-entity');

                    marsrobotMarker.setAttribute('gltf-model', '#marsrobot');
                    marsrobotMarker.setAttribute('animation-mixer', '');
                    marsrobotMarker.setAttribute('id', 'marsrobotMarker');

                    marsrobotMarker.object3D.position.set(0, 0, 0);
                    marsrobotMarker.object3D.scale.set(50, 50, 50);
                    marsrobotMarker.object3D.rotation.set(0, 0, 0);

                    marsrobotMarker.setAttribute('sound', {
                      src: '#MarsRobotSound',
                      autoplay: true
                    });

                   markerEl.appendChild(marsrobotMarker);

                 }


              }
              else {
                 switchStatus = $(this).is(':checked');
                  alert("Marker Based and Location Based");// To verify
                   console.log(switchStatus, "Marker Based and Location Based");
                   console.log(markerEl);

                  if(entityMarker==1 && entityGps == 0){

                    entityGps = 1;

                    var modelMarker = document.getElementById('marsrobotMarker');
                    modelMarker.parentNode.removeChild(modelMarker);

                    //////////////////////////////////Detect marker found and lost////////////////////////////////////////////////////
                     markerEl.addEventListener("markerFound", ()=> {

                       console.log('Marker Found');

                       // ADD MODELS AFTER MARKER FOUND
                       navigator.geolocation.getCurrentPosition(function(position) {

                           const newCoordinates = JSON.stringify({
                             lat: position.coords.latitude,
                             lng: position.coords.longitude
                           });

                            // CREATE
                           var body = document.querySelector('a-scene');

                           var marsrobotGps = document.createElement('a-entity');

                            marsrobotGps.setAttribute('gltf-model', '#marsrobot');
                            marsrobotGps.setAttribute('animation-mixer', '');
                            marsrobotGps.setAttribute('id', 'marsrobotGps');


                            marsrobotGps.object3D.position.set(0, 0, 0);
                            marsrobotGps.object3D.scale.set(50, 50, 50);
                            marsrobotGps.object3D.rotation.set(0, 0, 0);


                            marsrobotGps.setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude}`);

                           body.appendChild(marsrobotGps);



                           console.log('Successfully show AR on marker location based once');

                         }, error, optionsNewcoord);



                     }, {once : true});


                     markerEl.addEventListener("markerLost",() =>{

                       console.log('Marker Lost');
                     });
                    ////////////////////////////////////////////////////////////////////////////////////


                  }

                else if(entityMarker==1 && entityGps == 1){
                  var modelMarker = document.getElementById('marsrobotMarker');
                  modelMarker.parentNode.removeChild(modelMarker);
                  alert("Location based is activated once.");
                }

              }
          });

	}

});

//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
        console.log('Marker found: ', markerId);

			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
	});
