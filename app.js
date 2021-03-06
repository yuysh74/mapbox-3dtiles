import Mapbox3DTiles from "./Mapbox3DTiles.mjs";

mapboxgl.accessToken = apiKeys.mapboxAccessToken;
const urlParams = new URLSearchParams(window.location.search);
const debug = urlParams.get('debug') ? urlParams.get('debug') == "true" : false;
const update = urlParams.get('update') ? parseInt(urlParams.get('update')) : 0;
const light = urlParams.get('light') ? urlParams.get('light') == "true" : false;
document.querySelector('#debug').checked = debug;
document.querySelector('#light').checked = light;
if (light) {
	document.querySelectorAll('.container').forEach(container=>container.classList.add('light'));
}

Mapbox3DTiles.DEBUG = debug;

document.querySelector('#rotterdam').addEventListener('click',()=>window.location=`./?debug=${debug}&light=${light}&update=${1+update}#15.97/51.899662/4.478322/34.4/58`);
document.querySelector('#velsen').addEventListener('click',()=>window.location=`./?debug=${debug}&light=${light}&update=${1+update}#17.65/52.455315/4.607382/-10.4/60`);
document.querySelector('#debug').addEventListener('change', function(e){
	window.location=`./?debug=${e.target.checked}&light=${light}${window.location.hash}`
});
document.querySelector('#light').addEventListener('change', function(e){
	window.location=`./?debug=${debug}&light=${e.target.checked}${window.location.hash}`
});


// Load the mapbox map
var map = new mapboxgl.Map({
	container: 'map',
	style: `mapbox://styles/mapbox/${light?'light':'dark'}-v10?optimize=true`,
	center: [4.48732, 51.90217],
	zoom: 14.3,
	bearing: 0,
	pitch: 45,
	hash: true
});



map.on('style.load', function() {
	
	const rotterdam = new Mapbox3DTiles.Layer( { 
						id: 'rotterdam', 
						url: './rotterdam/tileset.json', 
						color: 0x0033aa, 
						opacity: 1
					} );
	map.addLayer(rotterdam, 'waterway-label');
	
	const ahn = new Mapbox3DTiles.Layer( { 
				id: 'ahn', 
				url: './ahn/tileset.json', 
				color: 0x007722, 
				opacity: 1.0,
				pointsize: 1.0
			} );
	map.addLayer(ahn, 'rotterdam');

	const velsen = new Mapbox3DTiles.Layer( {
		id: 'velsen',
		url: 'https://saturnus.geodan.nl/maquette_nl/data/buildingtiles_velsen_3857/tileset.json'
	});
	map.addLayer(velsen, 'waterway-label');

	const gltfLoader = new THREE.GLTFLoader();
	gltfLoader.load('https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf', (gltf) => {
		let matrix = new THREE.Matrix4();
		matrix.makeRotationX(Math.PI/2);
		gltf.scene.applyMatrix4(matrix);
		let translation = Mapbox3DTiles.projectToWorld([4.605698, 52.456063,0]);
		matrix.makeTranslation(translation.x, translation.y, translation.z);
		matrix.scale({x:1,y:1,z:1});
		gltf.scene.applyMatrix4(matrix);
		velsen.world.add(gltf.scene);
		//velsen.update();
		map.triggerRepaint();
	});
	gltfLoader.load('./models/amsterdamcs.glb', (gltf) => {
		//let color = new THREE.Color(0xffffff);
		//gltf.scene.traverse(child => {
		//	if (child instanceof THREE.Mesh) {
		//		child.material.color = color;
		//	}
		//});
		let matrix = new THREE.Matrix4();
		matrix.makeRotationX(Math.PI/2);
		gltf.scene.applyMatrix4(matrix);
		matrix.makeRotationZ(1.162 * Math.PI);
		gltf.scene.applyMatrix4(matrix);
		gltf.scene.translateY(0);
		let translation = Mapbox3DTiles.projectToWorld([4.60814,52.46326,0]);
		matrix.makeTranslation(translation.x, translation.y, translation.z);
		matrix.scale({x:1,y:1,z:1});
		gltf.scene.applyMatrix4(matrix);
		velsen.world.add(gltf.scene);
		//velsen.update();
		map.triggerRepaint();
	});
	gltfLoader.load('./windmill/SM_Base.glb', (gltf) => {
		let color = new THREE.Color(0xffffff);
		gltf.scene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				child.material.color = color;
			}
		});
		let matrix = new THREE.Matrix4();
		//matrix.makeRotationX(Math.PI/2);
		//gltf.scene.applyMatrix4(matrix);
		let translation = Mapbox3DTiles.projectToWorld([4.60705,52.45464]);
		matrix.makeTranslation(translation.x, translation.y, translation.z);
		matrix.scale({x:.01,y:.01,z:.01});
		gltf.scene.applyMatrix4(matrix);
		velsen.world.add(gltf.scene);
		//velsen.update();
		map.triggerRepaint();
	});
	gltfLoader.load('./windmill/SM_Pillar.glb', (gltf) => {
		let color = new THREE.Color(0xffffff);
		gltf.scene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				child.material.color = color;
			}
		});
		let matrix = new THREE.Matrix4();
		//matrix.makeRotationX(Math.PI/2);
		//gltf.scene.applyMatrix4(matrix);
		let translation = Mapbox3DTiles.projectToWorld([4.60705,52.45464]);
		matrix.makeTranslation(translation.x, translation.y, translation.z);
		matrix.scale({x:.01,y:.01,z:.01});
		gltf.scene.applyMatrix4(matrix);
		velsen.world.add(gltf.scene);
		//velsen.update();
		map.triggerRepaint();
	});
	gltfLoader.load('./windmill/SM_Nacelle.glb', (gltf) => {
		let color = new THREE.Color(0xffffff);
		gltf.scene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				child.material.color = color;
			}
		});
		let matrix = new THREE.Matrix4();
		//matrix.makeRotationX(Math.PI/2);
		//gltf.scene.applyMatrix4(matrix);
		let translation = Mapbox3DTiles.projectToWorld([4.60705,52.45464]);
		matrix.makeTranslation(translation.x, translation.y, 100);
		matrix.scale({x:.01,y:.01,z:.01});
		gltf.scene.applyMatrix4(matrix);
		velsen.world.add(gltf.scene);
		//velsen.update();
		map.triggerRepaint();
	});
	gltfLoader.load('./windmill/SM_Rotor.glb', (gltf) => {
		let color = new THREE.Color(0xffffff);
		gltf.scene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				child.material.color = color;
			}
		});
		let location = new THREE.Group();
		//gltf.scene.rotation.x = Math.PI;
		location.add(gltf.scene);
		let matrix = new THREE.Matrix4();
		let translation = Mapbox3DTiles.projectToWorld([4.60705,52.45464]);
		matrix.makeTranslation(translation.x, translation.y-5, 100);
		matrix.scale({x:.01,y:.01,z:.01});
		location.applyMatrix4(matrix);
		velsen.world.add(location);
		let rotation = 0;
		//let rotorMatrix = new THREE.Matrix4();
		let start = new Date();
		let rotate = () => {
			requestAnimationFrame(rotate);
			let elapsed = Date.now() - start;
			rotation = Math.PI * (elapsed / 6000)
			gltf.scene.rotation.y = rotation;
			map.triggerRepaint();
		}
		if (mapboxgl.supported({failIfMajorPerformanceCaveat: true})) {
			rotate();
		}
	});
	
});
map.on('mousemove', (event)=>{
	let infoElement = document.querySelector('#info');
	let features = map.queryRenderedFeatures(event.point, {outline: true, outlineColor: 0xff0000});
	if (features.length) {
		infoElement.innerHTML = 
			features.map(feature=>
				`Layer: ${feature.layer.id}<br>
					${Object.entries(feature.properties).map(entry=>`<b>${entry[0]}:</b>${entry[1]}`).join('<br>\n')}
			`).join('<hr>\n')
	} else {
		infoElement.innerHTML = "Hover map objects for info";
	}
})