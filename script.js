const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const nameP = document.getElementById("pokemon-name");
const idP = document.getElementById("pokemon-id");
const weightP = document.getElementById("weight");
const heightP = document.getElementById("height");
const typesP = document.getElementById("types");
const hpP = document.getElementById("hp");
const attackP = document.getElementById("attack");
const defenseP = document.getElementById("defense");
const specialAttackP = document.getElementById("special-attack");
const specialdefenseP = document.getElementById("special-defense");
const speedP = document.getElementById("speed");
const imgElem = document.getElementById("sprite");

button.addEventListener("click", () => {
  const search = input.value.toLowerCase();
  fetchPokemonData(search);
});

function fetchPokemonData(search) {
  fetch(url + search)
    .then((response) => response.json())
    .then((data) => showData(data))
    .catch((error) => {
      alert("Pokémon not found");
      return console.error(error);
    });
}

function showData(data) {
  const { name, id, height, stats, weight } = data;
  const statValues = {};
  for (const statObj of stats) {
    statValues[statObj.stat.name] = statObj.base_stat;
  }
  const {
    hp,
    attack,
    defense,
    "special-attack": sAtt,
    "special-defense": sDef,
    speed,
  } = statValues;

  nameP.innerText = name;
  idP.innerText = id;
  weightP.innerText = weight;
  heightP.innerText = height;
  hpP.innerText = hp;
  attackP.innerText = attack;
  defenseP.innerText = defense;
  specialAttackP.innerText = sAtt;
  specialdefenseP.innerText = sDef;
  speedP.innerText = speed;

  typesP.textContent = "";
  for (const currType of data.types) {
    typesP.innerHTML += `<span> ${currType.type.name.toUpperCase() + " "} </span>`;
  }

  imgElem.src = data.sprites.front_default;
}
