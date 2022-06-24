//Global Variable
var lat = '';
var long = '';

// Position GPS
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

					var markerEl = document.createElement('a-marker-camera');

					markerEl.setAttribute('type','pattern');

					markerEl.setAttribute('url','https://raw.githubusercontent.com/simplephi/ar-sculpture/main/src/assets/robotalk.patt');
				markerEl.setAttribute('cursor', {
            rayOrigin: 'mouse'

          });
					markerEl.setAttribute('registerevents','');
					sceneEl.appendChild(markerEl);



         var marsrobotMarker = document.createElement('a-entity');

          marsrobotMarker.setAttribute('gltf-model', '#stagerobot');
          marsrobotMarker.setAttribute('animation-mixer', '');
          marsrobotMarker.setAttribute('id', 'marsrobotMarker');

          marsrobotMarker.object3D.position.set(0, 0, 0);
          marsrobotMarker.object3D.scale.set(1, 1, 1);
          marsrobotMarker.object3D.rotation.set(-90, -90, 0);

          // marsrobotMarker.setAttribute('sound', {
          //   src: '#MarsRobotSound',
          //   volume: 5,
          // });

         markerEl.appendChild(marsrobotMarker);



	}

});

//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {


          // var entity = document.querySelector('[sound]');
          // entity.components.sound.playSound();

        console.log('Marker found');

			});

			marker.addEventListener("markerLost",() =>{

        // var entity = document.querySelector('[sound]');
        // entity.components.sound.stopSound();

				console.log('Marker Lost ');
			});
		},
	});
