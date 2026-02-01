const movie = JSON.parse(localStorage.getItem("selectedMovie"));

if (movie) {
  title.textContent = movie.name;
  summary.innerHTML = movie.summary;
}
