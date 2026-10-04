const API_KEY = "YOUR_TMDB_API_KEY_HERE";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const requests = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  toprated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
};

async function fetchMovies(url, elementId) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    // Admin ke add kiye movies pehle
    const customMovies = JSON.parse(localStorage.getItem("cinerex_movies")) || [];
    customMovies.forEach(m => {
      const img = document.createElement("img");
      img.src = m.poster;
      img.alt = m.title;
      img.classList.add("poster");
      container.appendChild(img);
    });

    data.results.forEach(movie => {
      if (movie.poster_path) {
        const img = document.createElement("img");
        img.src = `${IMG_URL}${movie.poster_path}`;
        img.alt = movie.title || movie.name;
        img.classList.add("poster");
        img.onclick = () => alert(`You clicked: ${movie.title || movie.name}`);
        container.appendChild(img);
      }
    });
  } catch (err) {
    console.error("Error fetching:", err);
  }
}

fetchMovies(requests.trending, "trending");
fetchMovies(requests.toprated, "toprated");
fetchMovies(requests.action, "action");

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.style.background = "#141414";
  } else {
    nav.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)";
  }
});
