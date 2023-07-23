import { formatDate, setActiveLink } from "./app";
import { httpRequest } from "./api";

const showsLink = document.querySelector("#showsLink");
const showsDesktop = document.querySelector("#showsDesktop");
const showsMobile = document.querySelector("#showsMobile");

// Initial shows
let showList = [
  // {
  //   venue: "Ronald Lane",
  //   location: { city: "San Francisco", state: "CA" },
  //   date: "Mon Sept 06 2021",
  // },
  // {
  //   venue: "Pier 3 East",
  //   location: { city: "San Francisco", state: "CA" },
  //   date: "Tue Sept 21 2021",
  // },
  // {
  //   venue: "View Loungue",
  //   location: { city: "San Francisco", state: "CA" },
  //   date: "Fri Oct 15 2021",
  // },
  // {
  //   venue: "Hyatt Agency",
  //   location: { city: "San Francisco", state: "CA" },
  //   date: "Sat Nov 06 2021",
  // },
  // {
  //   venue: "Moscow Center",
  //   location: { city: "San Francisco", state: "CA" },
  //   date: "Fri Nov 26 2021",
  // },
  // {
  //   venue: "Press Club",
  //   location: { city: "San Francisco", state: "CA" },
  //   date: "Wed Dec 15 2021",
  // },
];

function showTemplateDesktop(show) {
  const {date,id,location,place} = show
  const formattedDate = formatDate(date)


  const showHTML = `
    <div class="show__row">
    <div class="show__row-grid">
      <p class="body__text body__text--bold">${formattedDate}</p>
      <p class="body__text">${place}</p>
      <p class="body__text">${location}</p>
      <button class="button">Buy Tickets</button>
    </div>
    <hr class="divider" />
  </div>
    `;

  // Create a element to hold the comment HTML
  const showElement = document.createElement("div");
  showElement.innerHTML = showHTML.trim();

  // Return the comment element
  return showElement.firstChild;
}

function showTemplateMobile(show) {
  const {date,id,location,place} = show
  let formattedDate = formatDate(date)

  const showHTML = `
    <div class="show">
    <div class="show__container">
      <div class="show__body">
        <div class="show__body-row">
          <p class="show__info-header show__info-header--grey">Date</p>
          <p class="body__text body__text--bold">${formattedDate}</p>
        </div>
        <div class="show__body-row">
          <p class="show__info-header show__info-header--grey">Venue</p>
          <p class="body__text body__text--bold">${place}</p>
        </div>
        <div class="show__body-row">
          <p class="show__info-header show__info-header--grey">Location</p>
          <p class="body__text body__text--bold">${location}</p>
        </div>
      </div>
      <div class="show__actions">
        <button class="button">Buy Tickets</button>
      </div>
    </div>
    <hr class="divider" />
  </div>  
    `;
  // Create a element to hold the show HTML
  const showElement = document.createElement("div");
  showElement.innerHTML = showHTML.trim();

  // Return the show element
  return showElement.firstChild;
}

// RENDER SHOWS
function renderShowsDesktop() {
  showList.forEach((show) => {
    showsDesktop.appendChild(showTemplateDesktop(show));
  });
}

function renderShowsMobile() {
  showList.forEach((show) => {
    showsMobile.appendChild(showTemplateMobile(show));
  });
}

async function getShows() {
  try {
    const shows = await httpRequest.getShows();
    showList = [...shows];
    console.log(shows);
    renderShowsMobile()
    renderShowsDesktop()
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


///INITIAL RENDER
setActiveLink(showsLink);
getShows();
// renderShowsDesktop();
// renderShowsMobile();
