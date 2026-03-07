function show(id){

document.querySelectorAll(".screen").forEach(s=>s.style.display="none")
document.getElementById(id).style.display="block"

}

show("menu")

const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")

const TILE=32

const MAP_WIDTH=60
const MAP_HEIGHT=40

let camera={x:0,y:0}

let player={

x:300,
y:200,
speed:3,
frame:0,
money:50,
balls:5,
pokemon:"Salamèche",
level:5,
pokemons:[]

}

const sprites={

player:"https://i.imgur.com/6X12FQp.png",
house:"https://i.imgur.com/W8Yp6kS.png"

}

const pokemonSprites={

Rattata:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
Chenipan:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
Piafabec:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png"

}

let wildList=["Rattata","Chenipan","Piafabec"]

let wildPokemons=[]

for(let i=0;i<15;i++) spawnPokemon()

function spawnPokemon(){

let name=wildList[Math.floor(Math.random()*wildList.length)]

wildPokemons.push({

name:name,
x:Math.random()*MAP_WIDTH*TILE,
y:Math.random()*MAP_HEIGHT*TILE,
dx:Math.random()*2-1,
dy:Math.random()*2-1

})

}

let keys={}

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

function startGame(){

show("game")

loop()

}

function loop(){

update()
draw()

requestAnimationFrame(loop)

}

function update(){

if(keys["ArrowUp"]) player.y-=player.speed
if(keys["ArrowDown"]) player.y+=player.speed
if(keys["ArrowLeft"]) player.x-=player.speed
if(keys["ArrowRight"]) player.x+=player.speed

camera.x=player.x-canvas.width/2
camera.y=player.y-canvas.height/2

wildPokemons.forEach(p=>{

p.x+=p.dx
p.y+=p.dy

if(Math.random()<0.01){

p.dx=Math.random()*2-1
p.dy=Math.random()*2-1

}

if(Math.abs(player.x-p.x)<25 && Math.abs(player.y-p.y)<25){

alert("Combat contre "+p.name)

}

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

// map

for(let y=0;y<MAP_HEIGHT;y++){

for(let x=0;x<MAP_WIDTH;x++){

ctx.fillStyle="#4caf50"
ctx.fillRect(

x*TILE-camera.x,
y*TILE-camera.y,
TILE,
TILE

)

}

}

// maisons

ctx.fillStyle="brown"

ctx.fillRect(500-camera.x,300-camera.y,80,80)


// joueur

ctx.fillStyle="red"

ctx.fillRect(

player.x-camera.x,
player.y-camera.y,
20,
20

)

// pokemon sauvages

wildPokemons.forEach(p=>{

let img=new Image()
img.src=pokemonSprites[p.name]

ctx.drawImage(

img,
p.x-camera.x,
p.y-camera.y,
32,
32

)

})

}

function buyBall(){

if(player.money>=10){

player.money-=10
player.balls++

}

}

function updateInventory(){

document.getElementById("inv").innerText=

"Pokeballs : "+player.balls+
"\nPokemon capturés : "+player.pokemons.join(",")

}
