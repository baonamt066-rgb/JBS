let movies = JSON.parse(localStorage.getItem("movies")) || [];
const list = document.getElementById("movieAdmin");

function render() {
  list.innerHTML = "";
  movies.forEach((m, i) => {
    list.innerHTML += `
      <li>
        ${m.title}
        <button onclick="deleteMovie(${i})">X</button>
      </li>
    `;
  });
}

function addMovie() {
  movies.push({
    title: title.value,
    year: year.value,
    genre: genre.value
  });
  localStorage.setItem("movies", JSON.stringify(movies));
  render();
}

function deleteMovie(i) {
  movies.splice(i, 1);
  localStorage.setItem("movies", JSON.stringify(movies));
  render();
}

render();
