import { setActiveLink } from "./app";

const showsLink = document.querySelector("#showsLink");


// Initial shows
const shows = [
    {
      showVenue: "The Office",
      showLocation: { city: "San Francisco", state: "CA" },
      showDate: "date",
    },
    {
      showVenue: "The Office",
      showLocation: { city: "San Francisco", state: "CA" },
      showDate: "date",
    },
    {
      showVenue: "The Office",
      showLocation: { city: "San Francisco", state: "CA" },
      showDate: "date",
    },
    {
      showVenue: "The Office",
      showLocation: { city: "San Francisco", state: "CA" },
      showDate: "date",
    },
    {
      showVenue: "The Office",
      showLocation: { city: "San Francisco", state: "CA" },
      showDate: "date",
    },
  ];

  function renderShow(show) {
    const commentHTML = `
      <div class="comment">
        <div class="comment__container">
          <div class="comment__avatar"></div>
          <div class="comment__content">
            <div class="comment__header">
              <h3 class="comment__header-name">${comment.commentBy}</h3>
              <p class="comment__header-date">${comment.createdAt}</p>
            </div>
            <div class="comment__body">
              <p class="comment__body-text">
                ${comment.commentContent}
              </p>
            </div>
          </div>
        </div>
        <hr class="divider" />
      </div>
    `;

    // Create a element to hold the comment HTML
  const commentElement = document.createElement("div");
  commentElement.innerHTML = commentHTML.trim();

  // Return the comment element
  return commentElement.firstChild;
  }




  ///INITIAL RENDER
  setActiveLink(showsLink);