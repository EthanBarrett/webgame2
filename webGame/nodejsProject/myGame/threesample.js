import * as THREE from "three";

import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

import {GLTFLoader} from "https://unpkg.com/three@0.169.0/examples/jsm/loaders/GLTFLoader.js";

import Stats from  'https://unpkg.com/three@0.169.0/examples/jsm/libs/stats.module.js';

let stats;

stats = new Stats();
document.body.appendChild( stats.dom );


let controls; //declare control parameter

//animation mixer
let mixer;

//add control variables
let upstate = false; //button left
let downstate = false; //button stop
let right = false; //button right
let changed = false; //colour change

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );



//head
const geometry = new THREE.SphereGeometry( 5, 15, 6 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x00FFFF } ); 
const Head = new THREE.Mesh( geometry, material ); 
Head.position.y = 4.8;
//body
const geometry1 = new THREE.CapsuleGeometry( 4, 4, 16, 32 ); 
const material1 = new THREE.MeshBasicMaterial( {color: 0x000000} ); 
const Body = new THREE.Mesh( geometry1, material1 );
Body.position.y = -5;
//rightarm
const geometry2 = new THREE.BoxGeometry( 3, 7, 2.5 ); 
const material2 = new THREE.MeshBasicMaterial( {color: 0x00fff0} ); 
const RightArm = new THREE.Mesh( geometry2, material2 ); 
RightArm.position.x = 6;
RightArm.position.y = -4;
RightArm.rotation.z = 0.5;
//leftarm
const geometry3 = new THREE.BoxGeometry( 3, 7, 2.5 ); 
const material3 = new THREE.MeshBasicMaterial( {color: 0x00fff0} ); 
const LeftArm = new THREE.Mesh( geometry3, material3 ); 
LeftArm.position.x = -6;
LeftArm.position.y = -4;
LeftArm.rotation.z = -0.5;
//Legs
const geometry4 = new THREE.ConeGeometry( 6, 15, 32 ); 
const material4 = new THREE.MeshBasicMaterial( {color: 0x000000} );
const Legs = new THREE.Mesh(geometry4, material4 ); 
Legs.position.y = -4



//add to scene
scene.add( Legs );
scene.add(LeftArm);
scene.add( RightArm );
scene.add( Body );
scene.add( Head );


//group togethere
let group = new THREE.Group();
group.add(Head);
group.add(Body);
group.add(RightArm);
group.add(LeftArm);
group.add(Legs);
scene.add(group);

group.position.y -= 4;


//pillar tower
const geometry5 = new THREE.CylinderGeometry( 15, 15, 60, 96 ); 
const material5 = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
const tower = new THREE.Mesh( geometry5, material5 ); 
tower.position.x = 50;
tower.position.y = 10;
tower.position.z = -60;

scene.add( tower );


//floor
const geometry6 = new THREE.PlaneGeometry( 200, 500 );
const material6 = new THREE.MeshBasicMaterial( {color: 336699, side: THREE.DoubleSide} );
const floor = new THREE.Mesh( geometry6, material6 );
floor.rotation.x = 1.6;
floor.position.y = -16;
scene.add( floor );
//////////////////////////////////////////////////////////////////////////////////////////////////////
//create many random objects
const createManyObjs=()=>
{
	const geometry = new THREE.SphereGeometry();
	const objects = [];
	for (let i = 0; i < 20; i++)
	{
		const material2 = new THREE.MeshPhongMaterial({color:0x2eabef});

const object = new THREE.Mesh(geometry, material2 );
//random position
object.position.x = Math.random() * 400 - 200;
object.position.y = Math.random() * 50;
object.position.z = Math.random() * 100 - 250;
//random scale
object.scale.x = Math.random() + 50 - 40;
object.scale.y = Math.random() + 20 - 10;
object.scale.z = Math.random() + 20;

object.material.color.setHex(Math.random() * 0xffffff);
scene.add(object);

	objects.push(object);
	}
	return objects;
}
//move objects 
const animateObjects = (objects) => {
	requestAnimationFrame(() => animateObjects(objects)); // Continuously animate
	
	objects.forEach((object) => {
	  // movment for objects
	  object.position.z += 0.4; 
  
	});
  };

const objects = createManyObjs();
animateObjects(objects);


//////////////////////////////////////////////////////////////////////////////////////////////////

// create sphere of points
const pointgeometry = new THREE.SphereGeometry(20,40,20);

const newmaterial = new THREE.PointsMaterial({color:'blue', size:0.5});
let pointobj = new THREE.Points(pointgeometry, newmaterial);
scene.add(pointobj);
pointobj.position.y = 0;
//create scecond bigger sphere around the first
let mesh2 = pointobj.clone();
mesh2.scale.set(2,2,2);
scene.add(mesh2);



//////////////////////////////////////////////////////////////////////////////////////////////////////
//change camera position
camera.position.z = 50;


const addPlane = (x,y,w,h, materialaspect) => {
   
    //add a plan
const geometry7 = new THREE.PlaneGeometry(w,h,2);
const material7 = new THREE.MeshLambertMaterial( materialaspect);

const plane = new THREE.Mesh( geometry7, material7 );

plane.position.x = x;
plane.position.y = -15;
plane.position.x = -Math.PI/2;
plane.rotation.x = 1.6;
scene.add(plane);

}
//texture of plane
const texture = new THREE.TextureLoader().load("resources/img/goldpattern.png");
const materialAspectfloor = {
	map:texture,
	side: THREE.DoubleSide,
	transparent:true
}
addPlane(0, -3.6, 60, 60, materialAspectfloor);

////////////////////////////////////////////////////////////////////////////////////////////////////


// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
const onWindowResize = () => {
 
    // set the aspect ratio to match the new browser window aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
 
    // update the camera's frustum
    camera.updateProjectionMatrix();
 
    // update the size of the renderer AND the canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
 
}
 
window.addEventListener('resize', onWindowResize);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//skybox function

const createskybox = ()=>{
	let bgMesh;
	const loader = new THREE.TextureLoader();
	loader.load("resources/img/galaxy.jpg", function(texture){
		const sphereGeometry = new THREE.SphereGeometry(1000, 60, 40);
		const sphereMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide
		})

		bgMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
		scene.add(bgMesh);

	})
	
}

createskybox();
///////////////////////////////////////////////////////////////////////////////////////////////////

const createControls =()=>{
	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

}

createControls();
//////////////////////////////////////////////////////////////////////////////////////////////////////

//button set up
const moveup = ()=>
{
	upstate = true;
	downstate = false;
	right = true;
}

const movedown = ()=>
	{
		upstate = false;
		downstate = true;
		right = false;
	}

const moveright = ()=>
{
	right = true;
	upstate = false;
	downstate = false;
}

document.getElementById("upbutton").addEventListener("click", moveup);
document.getElementById("downbutton").addEventListener("click", movedown);
document.getElementById("rightbutton").addEventListener("click", moveright);


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//animate
function animate() {
	//requestAnimationFrame (animate);
	stats.update(); // update stats

	pointobj.rotation.x += 0.01;
	mesh2.rotation.y += 0.01

	Head.rotation.x += 0.05;
	
	

	if(upstate)
	{
		group.position.x -= 0.6;
		
	} 
	
	else if(right)
		{
			group.position.x += 0.6;
			
		} 


	if (downstate)
	{
		group.position.y -= 0;
	}

	
	
	if (group.position.x < -80)
	{
		
		upstate = false;
		right = false;
	}

	if (group.position.x > 80)
	{
		
		upstate = false;
		right = false;
	}

	renderer.render( scene, camera );

}