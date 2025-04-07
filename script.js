const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const nameP = document.getElementById("pokemon-name");
const idP = document.getElementById("pokemon-id");
const weightP = document.getElementById("weight");
const heightP = document.getElementById("height");
const hpP = document.getElementById("hp");
const attackP = document.getElementById("attack");
const defenseP = document.getElementById("defense");
const specialAttackP = document.getElementById("special-attack");
const specialdefenseP = document.getElementById("special-defense");
const speedP = document.getElementById("speed");
const imgElem = document.getElementById("sprite");
const typeWrap = document.getElementById("typeWrap");

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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-input").value = "Bulbasaur";
  fetchPokemonData("bulbasaur");
  document.getElementById("pokemon-info").style.display = "flex";
  document.getElementById("stats-table").style.display = "table";
});

function handleTypeImages(typeImages) {
  if (typeImages) {
    Array.from(typeImages).forEach((elem) => elem.remove());
  }
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

  nameP.innerText = `Name: ${name[0].toUpperCase() + name.slice(1)}`;
  idP.innerText = `Id: ${id}`;
  weightP.innerText = `Weight: ${weight}`;
  heightP.innerText = `Height: ${height}`;
  hpP.innerText = `${hp}`;
  attackP.innerText = `${attack}`;
  defenseP.innerText = `${defense}`;
  specialAttackP.innerText = `${sAtt}`;
  specialdefenseP.innerText = `${sDef}`;
  speedP.innerText = `${speed}`;

  const typeImages = typeWrap.children;
  handleTypeImages(typeWrap.children);
  for (const currType of data.types) {
    const str = `img/types/${currType.type.name}.png`;
    const img = Object.assign(document.createElement("img"), {
      src: str,
      className: "type",
      alt: currType.type.name,
    });
    typeWrap.appendChild(img);
  }
  console.log(typeImages);
  imgElem.src = data.sprites.front_default;
}
