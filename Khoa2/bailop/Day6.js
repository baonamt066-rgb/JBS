const url = "https://pokeapi.co/api/v2/encounter-method/";

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
