
const movies = [
  {
    id: 1,
    title: "Jailer 2",
    genre: "Action",
    rating: 8.9,
    price: 250,
    poster: "https://m.media-amazon.com/images/M/MV5BYmE0MTFjOTYtMWYxNC00YjFjLTlhNzYtMWQ5ZDEwNjRmYzE1XkEyXkFqcGc%40._V1_.jpg"
  },
  {
    id: 2,
    title: "Jana Nayagan",
    genre: "Action",
    rating: 8.7,
    price: 280,
    poster: "https://d9s3e2ooa0od7.cloudfront.net/assets/jana-nayagan/581ba267-fae7-49ec-9c41-10965cb307fd/581ba267-fae7-49ec-9c41-10965cb307fd.jpg"
  },
  {
    id: 3,
    title: "Karuppu",
    genre: "Action",
    rating: 8.5,
    price: 250,
    poster: "https://poster.gsc.com.my/2026/260508_Karuppu_big.jpg"
  },
  {
    id: 4,
    title: "Scene",
    genre: "Thriller",
    rating: 8.2,
    price: 220,
    poster: "https://cdn.bingebase.com/movies/74001/posters/kfc4w3OX8QsFm8f9MPUdmGheNl3.webp"
  },
  {
    id: 5,
    title: "Mandaadi",
    genre: "Drama",
    rating: 8.4,
    price: 230,
    poster: "https://d9s3e2ooa0od7.cloudfront.net/assets/mandaadi/969bbfa8-802a-47ab-be33-6630909c1923/969bbfa8-802a-47ab-be33-6630909c1923.jpg"
  },
  {
    id: 6,
    title: "Vishwanath & Sons",
    genre: "Drama",
    rating: 8.1,
    price: 200,
    poster: "https://www.hindustantimes.com/ht-img/img/2026/03/02/original/Suriya_Vishwanath_and_sons_1772427278297_1772427313303.jpeg"
  },
  {
    id: 7,
    title: "Youth",
    genre: "Drama",
    rating: 8.3,
    price: 180,
    poster: "https://resizing.flixster.com/2PgoWj6njVtc7f-eWWuyhaLiP6Q%3D/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQzYjhmYWRjLTg1OTctNDlkZC1iNDNlLWNkMGU4ZWZlNzRkNy5qcGc%3D"
  }
];
let selectedMovie = null;
let selectedGenre = "All";
let selectedTime = "";
let selectedSeats = [];
const occupiedSeats = ["A3", "B5", "C2", "D7", "E4", "F6"];
const movieGrid = document.getElementById("movieGrid");
const movieSelect = document.getElementById("movieSelect");
function displayMovies(list) {
 movieGrid.innerHTML = "";

    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title} poster"
                     onerror="this.style.display='none'">
                <h3>${movie.title}</h3>
            </div>

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>

                <div class="movie-bottom">
                    <span>⭐ ${movie.rating}</span>
                    <button class="book-button" data-id="${movie.id}">
                        Book Now
                    </button>
                </div>
            </div>
        `;

        movieGrid.appendChild(card);
    });
}

displayMovies(movies);
function filterMovies() {

    const search = document.getElementById("searchInput").value.toLowerCase();

    const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(search) &&
        (selectedGenre === "All" || movie.genre === selectedGenre)
    );

    displayMovies(filtered);
}

document.getElementById("searchInput")
    .addEventListener("input", filterMovies);

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            .classList.remove("active");

        button.classList.add("active");
        selectedGenre = button.dataset.genre;

        filterMovies();
    });
});
function chooseMovie(id) {

    selectedMovie = movies.find(movie => movie.id === id);

    movieSelect.value = id;
    selectedSeats = [];

    renderSeats();
    updateSummary();

    document.getElementById("booking")
        .scrollIntoView({behavior: "smooth"});
}
movieGrid.addEventListener("click", event => {

    if (event.target.classList.contains("book-button")) {
        chooseMovie(Number(event.target.dataset.id));
    }
});
movies.forEach(movie => {
    movieSelect.innerHTML +=
        `<option value="${movie.id}">${movie.title}</option>`;
});

movieSelect.addEventListener("change", () => {
    chooseMovie(Number(movieSelect.value));
});
document.querySelectorAll(".time-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelector(".time-btn.active")?.classList.remove("active");

        button.classList.add("active");
        selectedTime = button.dataset.time;

        updateSummary();
    });
});
function renderSeats() {

    const grid = document.getElementById("seatGrid");
    grid.innerHTML = "";

    ["A", "B", "C", "D", "E", "F"].forEach(row => {

        for (let i = 1; i <= 8; i++) {

            const name = row + i;
            const seat = document.createElement("button");

            seat.className = "seat";
            seat.textContent = i;

            if (occupiedSeats.includes(name)) {
                seat.classList.add("occupied-seat");
                seat.disabled = true;
            }

            if (selectedSeats.includes(name)) {
                seat.classList.add("selected-seat");
            }

            seat.addEventListener("click", () => {

                if (!selectedMovie) {
                    alert("Select a movie first!");
                    return;
                }

                if (selectedSeats.includes(name)) {
                    selectedSeats = selectedSeats.filter(s => s !== name);
                } else if (selectedSeats.length < 6) {
                    selectedSeats.push(name);
                } else {
                    alert("Maximum 6 seats allowed!");
                    return;
                }

                renderSeats();
                updateSummary();
            });

            grid.appendChild(seat);
        }
    });
}

renderSeats();
function updateSummary() {

    const date = document.getElementById("dateSelect").value;

    document.getElementById("summaryMovie").textContent =
        selectedMovie?.title || "Not selected";

    document.getElementById("summaryDate").textContent =
        date || "Not selected";

    document.getElementById("summaryTime").textContent =
        selectedTime || "Not selected";

    document.getElementById("summarySeats").textContent =
        selectedSeats.join(", ") || "None";

    document.getElementById("totalPrice").textContent =
        "₹" + (selectedSeats.length * (selectedMovie?.price || 0));
}

document.getElementById("dateSelect")
    .addEventListener("change", updateSummary);
document.getElementById("confirmButton").addEventListener("click", () => {

    const date = document.getElementById("dateSelect").value;

    if (!selectedMovie || !date || !selectedTime || selectedSeats.length === 0) {
        alert("Please complete all booking details!");
        return;
    }

    const id = "CV" + Math.floor(100000 + Math.random() * 900000);

    document.getElementById("confirmationDetails").innerHTML = `
        Booking ID: ${id}<br>
        Movie: ${selectedMovie.title}<br>
        Seats: ${selectedSeats.join(", ")}<br>
        Showtime: ${selectedTime}<br>
        Total: ₹${selectedSeats.length * selectedMovie.price}
    `;

    document.getElementById("confirmationModal").classList.add("show");
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("confirmationModal").classList.remove("show");
});