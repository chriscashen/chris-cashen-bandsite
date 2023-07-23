import { setActiveLink, clearChildren, formatDate } from "./app";
import { httpRequest } from "./api";
import defaultAvatar from "./assests/images/Mohan-muruge.jpg";

const form = document.querySelector("#comment-form");
// comment Name
const commentBy = document.querySelector("#commentBy");
const commentByLabel = document.querySelector("#commentByLabel");
const commentByError = document.querySelector("#commentByError");
// comment Content
const commentContent = document.querySelector("#commentContent");
const commentContentLabel = document.querySelector("#commentContentLabel");
const commentContentError = document.querySelector("#commentContentError");
// comments
const commentsContainer = document.querySelector("#commentsContainer");

const homeLink = document.querySelector("#homeLink");

// Initial comments
let commentList = [];

// Event listener for the form submit
if (form) {
  form.addEventListener("submit", (e) => {
    if (!form) return;
    e.preventDefault();
    handleOnSubmit();
  });
}

// Render a comment
function renderComment(comment) {
  // comment = {
  //   name,
  //   id,
  //   likes,
  //   timestamp,
  //   comment
  // }

  let formattedDate = formatDate(comment?.timestamp);

  const commentHTML = `
    <div class="comment">
      <div class="comment__container">
        <img class="comment__avatar" src='${
          comment?.avatar ? comment?.avatar : defaultAvatar
        }' />
     <div class="comment__content">
          <div class="comment__header">
            <h3 class="comment__header-name">${comment?.name}</h3>
            <p class="comment__header-date">${formattedDate}</p>
          </div>
          <div class="comment__body">
            <p class="comment__body-text">
              ${comment?.comment}
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

// Render comments
async function renderComments() {
  clearChildren(commentsContainer);

  commentList.forEach((comment) => {
    commentsContainer.insertAdjacentElement(
      "afterbegin",
      renderComment(comment)
    );
  });
}

////
// FORM VALIDATION
////

// Handle the form submit
async function handleOnSubmit() {
  //clear the error class's
  removeErrorClass();

  if (!commentBy.value || !commentContent.value) {
    if (!commentBy.value) {
      commentBy.classList.add("form__group-input--error");
      commentByError.classList.add("form__group-span--error");
      commentByLabel.classList.add("form__group-label--error");
    }

    if (!commentContent.value) {
      commentContent.classList.add("form__group-input--error");
      commentContentError.classList.add("form__group-span--error");
      commentContentLabel.classList.add("form__group-label--error");
    }
    return false;
  }
  // send
  let comment = {
    name: commentBy.value,
    comment: commentContent.value,
  };

  await addComment(comment);
  await getComments();

  // Remove the error class
  removeErrorClass();
  // Reset the form
  form.reset();
  // Render the comments
  renderComments();
  return;
}

// Remove the error class
function removeErrorClass() {
  commentByError.classList.remove("form__group-span--error");
  commentContentError.classList.remove("form__group-span--error");
  commentByLabel.classList.remove("form__group-label--error");
  commentContentLabel.classList.remove("form__group-label--error");
  commentBy.classList.remove("form__group-input--error");
  commentContent.classList.remove("form__group-input--error");
}
//
async function addComment(commentData) {
  try {
    const newComment = await httpRequest.addComment(commentData);
    console.log(newComment);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getComments() {
  try {
    const comments = await httpRequest.getComments();
    commentList = [...comments];
    console.log(comments);
    renderComments();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// APP INIT
setActiveLink(homeLink);
getComments();
