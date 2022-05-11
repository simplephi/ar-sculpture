//Global Variable
var markersURLArray=[];
var markersNameArray=[];
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



AFRAME.registerComponent('markers_start',{
	init:function(){


					var sceneEl = document.querySelector('a-scene');

					//list of the markers
					// for(var i=1; i<15; i++)
					// {
					// 	var url="../assets/markers-new/pattern-"+i+".patt";
					// 	markersURLArray.push(url);
					// 	markersNameArray.push('Marker_'+i);
					// }
          //
					// for(var k=0; k<14; k++)
					// {
					// 		var markerEl = document.createElement('a-marker');
					// 		// var markerEl = document.createElement('a-marker-camera');
					// 		markerEl.setAttribute('type','pattern');
					// 		markerEl.setAttribute('url',markersURLArray[k]);
					// 		markerEl.setAttribute('id',markersNameArray[k]);
          //
					// 		markerEl.setAttribute('registerevents','');
					// 		sceneEl.appendChild(markerEl);
          //
	        // }
					for(var i=1; i<9; i++)
					{
						var url="../assets/markers/pattern-"+i+".patt";
						markersURLArray.push(url);
						markersNameArray.push('Marker_'+i);
					}

					for(var k=0; k<8; k++)
					{
							var markerEl = document.createElement('a-marker');
							// var markerEl = document.createElement('a-marker-camera');
							markerEl.setAttribute('type','pattern');
							markerEl.setAttribute('url',markersURLArray[k]);
							markerEl.setAttribute('id',markersNameArray[k]);

							markerEl.setAttribute('registerevents','');
							sceneEl.appendChild(markerEl);

	        }

	}

});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;

				console.log('Marker Found: ', markerId);


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

						var mosquito = document.createElement('a-entity');

						// spiral.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long}`);



            mosquito.setAttribute('gltf-model', '#mosquito-gltf');
            mosquito.setAttribute('animation-mixer', '');


            mosquito.object3D.position.set(0, 1, -3);
            mosquito.object3D.scale.set(0.05, 0.05, 0.05);
            mosquito.object3D.rotation.set(45, 45, 0);

            // mosquito.setAttribute('animation', {
            //   'property': 'rotation',
            //   'to': '0 360 0',
            //   'loop': true,
            //   'dur': 5000,
            //   'dir': "alternate"
            // });

            mosquito.setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude}`);

						body.appendChild(mosquito);



					  console.log('successfully show AR on marker location based once');

					}, error, optionsNewcoord);



			}, {once : true});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
	});
