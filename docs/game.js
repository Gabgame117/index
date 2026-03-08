let scene,camera,renderer
let player

let joystick
let moveX=0
let moveY=0

let enemy=null
let playerPokemon=null

let playerHP=100

let inBattle=false

function startGame(){

document.getElementById("login").style.display="none"

init3D()
initJoystick()

}

function init3D(){

scene=new THREE.Scene()

camera=new THREE.PerspectiveCamera(

75,
window.innerWidth/window.innerHeight,
0.1,
1000

)

renderer=new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

const ground=new THREE.Mesh(

new THREE.PlaneGeometry(200,200),
new THREE.MeshBasicMaterial({color:0x228822})

)

ground.rotation.x=-Math.PI/2

scene.add(ground)

player=new THREE.Mesh(

new THREE.BoxGeometry(2,2,2),
new THREE.MeshBasicMaterial({color:0x00aaff})

)

scene.add(player)

camera.position.z=10

animate()

}

function animate(){

requestAnimationFrame(animate)

if(!inBattle){

player.position.x+=moveX*0.1
player.position.z+=moveY*0.1

if(Math.random()<0.003){

startBattle()

}

}

renderer.render(scene,camera)

}

function initJoystick(){

joystick=nipplejs.create({

zone:document.getElementById("joystick"),
mode:"static",
position:{left:"50%",top:"50%"}

})

joystick.on("move",(evt,data)=>{

moveX=data.vector.x
moveY=data.vector.y

})

joystick.on("end",()=>{

moveX=0
moveY=0

})

}

function startBattle(){

inBattle=true

playerPokemon=playerData.pokemons.find(

p=>p.name===playerData.active_pokemon

)

playerHP=100

enemy=JSON.parse(JSON.stringify(

POKEMONS[Math.floor(Math.random()*POKEMONS.length)]

))

enemy.hp=100

document.getElementById("battle").style.display="block"

document.getElementById("enemyName").innerText=enemy.name
document.getElementById("enemySprite").src=enemy.sprite
document.getElementById("playerName").innerText=playerPokemon.name

updateHP()

}

function updateHP(){

document.getElementById("enemyHP").style.width=enemy.hp+"%"
document.getElementById("playerHP").style.width=playerHP+"%"

}

function attack(){

enemy.hp-=20

if(enemy.hp<=0){

enemy.hp=0

gainXP()

endBattle()

return

}

updateHP()

enemyTurn()

}

function enemyTurn(){

setTimeout(()=>{

playerHP-=10

if(playerHP<=0){

playerHP=0

alert("Votre Pokémon est KO")

endBattle()

return

}

updateHP()

},800)

}

function throwBall(){

if(playerData.balls<=0){

alert("Plus de Pokéball")

return

}

playerData.balls--

let chance=0.3

if(enemy.hp<30){

chance=0.7

}

if(Math.random()<chance){

capturePokemon()

}else{

alert("Raté")

}

savePlayer()

}

function capturePokemon(){

let p={

name:enemy.name,
level:1,
hp:100

}

playerData.pokemons.push(p)

if(!playerData.pokedex) playerData.pokedex={}

playerData.pokedex[enemy.name]=true

alert("Pokémon capturé")

savePlayer()

endBattle()

}

function gainXP(){

playerPokemon.level++

playerData.money+=20

savePlayer()

}

function endBattle(){

document.getElementById("battle").style.display="none"

inBattle=false

}

function run(){

endBattle()

}

