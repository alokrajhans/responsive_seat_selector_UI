const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieChoosed = document.getElementById("movie");

populateUI();

let ticketCost = +movieChoosed.value;

// Save selected movie index and price
function setMovieData(moviePosition, movieCost) {
  localStorage.setItem("ChoosedMovieIndex", moviePosition);
  localStorage.setItem("ChoosedMovieCost", movieCost);
}

// Update total and count
function updateSelectedCount() {
  const choosedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsPosition = [...choosedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("choosedSeats", JSON.stringify(seatsPosition));

  const selectedSeatsCount = choosedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketCost;

  setMovieData(movieChoosed.selectedIndex, movieChoosed.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const choosedSeats = JSON.parse(localStorage.getItem("choosedSeats"));

  if (choosedSeats !== null && choosedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (choosedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const choosedMovieIndex = localStorage.getItem("choosedMovieIndex");

    if (choosedMovieIndex !== null)
    {
    movieChoosed.selectedIndex = choosedMovieIndex;
    console.log(choosedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieChoosed.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();