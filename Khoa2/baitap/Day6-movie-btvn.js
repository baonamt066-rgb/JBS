fetch("https://api.tvmaze.com/shows")
  .then(res => res.json())
  .then(data => renderMovies(data.slice(0, 12)));

function renderMovies(movies) {
  const list = document.getElementById("movieList");

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie-card";

    div.innerHTML = `
      <img src="${movie.image.medium}">
      <h3>${movie.name}</h3>
    `;

    div.onclick = () => {
      localStorage.setItem("selectedMovie", JSON.stringify(movie));
      window.location.href = "Day6-detail-btvn.html";
    };

    list.appendChild(div);
  });
}
