// https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44
const cards = document.getElementById("cards");
const search = document.getElementById("search");
const sidbarToggle = document.getElementById("sidbarToggle");
const closeSidebar = document.getElementById("closeSidebar");
const aside = document.querySelector("aside");
const filterBtn = document.querySelectorAll(".aside-links");
const layer = document.querySelector(".loadingPage");
let filterValue = "";


document.addEventListener("DOMContentLoaded", () => {
  layer.style.display = "none ";
});



closeSidebar.addEventListener("click", () => {
  aside.style.cssText = "left: -500px ";
});
sidbarToggle.addEventListener("click", () => {
  aside.style.cssText = "left: 0px";
});


async function fetchData(dataSet) {
  filterBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterValue = e.target.textContent.toLowerCase().split(" ").join("_");
      fetchData(filterValue);
    });
  });
  let url = `https://api.themoviedb.org/3/movie/${dataSet || "popular"}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`;

  const promis = await new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });

  const res = await promis;
  const data = res.results;
  console.log(data);
  displayData(data);
  search.addEventListener("keyup", (e) => {
    const value = e.target.value.trim().toLowerCase();
    const filtered = data.filter((movie) =>
      (movie.title || movie.name).toLowerCase().includes(value)
    );
    displayData(filtered);
  });
  console.log(data);
}
fetchData(filterValue);

function displayData(data) {
  cards.innerHTML = "";
  if (data.length < 1) {
    cards.innerHTML = `<h1 class="text-center text-white">No Data Found</h1>`;
  }
  data.forEach((element) => {
    cards.innerHTML += `
                  <!--movie cards -->
         <div class="col-lg-4 col-md-6 col-sm-12 overflow-hidden">
            <div class="card overflow-hidden position-relative rounded-2 border-0">
              <div class="layer py-4 px-3">
                <h4 class="title text-center text-white mb-4">${
                  element.title || element.name
                }</h4>
                <p class="description lead ">
                 ${element.overview}
                </p>
                <p class="release text-white ">
                    release date : ${
                      element.release_date || element.first_air_date
                    }
                </p>
                <div  class="star position-relative  mb-3">
             

                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
                <div class="rate">${Number(element.vote_average).toFixed(
                  1
                )}</div>
              </div>
              <img src="https://image.tmdb.org/t/p/w500/${
                element.poster_path
              }" alt="" />
            </div>
          </div>
        `;
  });
}
