
document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('search-btn');
  const movieNameInput = document.getElementById('movie-name');
  const resultsDiv = document.getElementById('result');
  const currentPageSpan = document.getElementById('current-page');
  const totalPagesSpan = document.getElementById('total-pages');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const apiKey = '4d43a92d'; 

  let currentPage = 1;
  let totalPages = 0;

  function updatePaginationControls() {
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    prevPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = currentPage >= totalPages;
  }

  function updateUIWithNewData(movies) {
    
    resultsDiv.innerHTML = '';
  
    
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
  
      const movieImage = document.createElement('img');
      movieImage.src = movie.Poster;
      movieImage.alt = movie.Title;
      movieImage.classList.add('movie-poster');
  
      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.Title;
      movieTitle.classList.add('movie-title');
  
      const movieYear = document.createElement('p');
      movieYear.textContent = `Year: ${movie.Year}`;
      movieYear.classList.add('movie-year');
  
      movieElement.appendChild(movieImage);
      movieElement.appendChild(movieTitle);
      movieElement.appendChild(movieYear);
  
      resultsDiv.appendChild(movieElement);
    });
  }
  
  
  function fetchMovies(searchText, year, type, page) {
    
    let url = `https://www.omdbapi.com/?s=${searchText}&page=${page}`;
    if (year) {
      url += `&y=${year}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    url += `&apikey=${apiKey}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      totalPages = Math.ceil(data.totalResults / 10); 
      updatePaginationControls();
      updateUIWithNewData(data.Search || []);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  
  
  searchButton.addEventListener('click', function () {
    const query = movieNameInput.value;
    const year = document.getElementById('year').value;
    const type = document.getElementById('type').value;
    fetchMovies(query, year, type, 1); 
  });
  
  
  prevPageButton.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage -= 1;
      const year = document.getElementById('year').value;
      const type = document.getElementById('type').value;
      fetchMovies(movieNameInput.value, year, type, currentPage);
    }
  });
  
  nextPageButton.addEventListener('click', function () {
    if (currentPage < totalPages) {
      currentPage += 1;
      const year = document.getElementById('year').value;
      const type = document.getElementById('type').value;
      fetchMovies(movieNameInput.value, year, type, currentPage);
    }
  });
  
  

  updatePaginationControls();
});

