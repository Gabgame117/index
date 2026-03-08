const supabaseClient = supabase.createClient(
"SUPABASE_URL",
"SUPABASE_KEY"
)

let currentUser=null
let playerData=null

async function register(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const {data}=await supabaseClient.auth.signUp({

email:email,
password:password

})

currentUser=data.user

let starter={

name:"Pikachu",
level:5,
hp:100

}

await supabaseClient.from("players").insert({

id:currentUser.id,
email:email,
money:100,
balls:10,
pokemons:[starter],
active_pokemon:"Pikachu",
pokedex:{}

})

loadPlayer()

}

async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const {data}=await supabaseClient.auth.signInWithPassword({

email:email,
password:password

})

currentUser=data.user

loadPlayer()

}

async function loadPlayer(){

const {data}=await supabaseClient

.from("players")
.select("*")
.eq("id",currentUser.id)
.single()

playerData=data

document.getElementById("money").innerText="💰 "+playerData.money

startGame()

}

async function savePlayer(){

await supabaseClient

.from("players")

.update({

money:playerData.money,
balls:playerData.balls,
pokemons:playerData.pokemons,
active_pokemon:playerData.active_pokemon,
pokedex:playerData.pokedex

})

.eq("id",currentUser.id)

}
