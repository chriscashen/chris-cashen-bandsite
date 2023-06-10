const form = document.querySelector("form");
// comment Nme
const commentBy = document.querySelector("#commentBy");
const commentByLabel = document.querySelector("#commentByLabel");
const commentByError = document.querySelector("#commentByError");
// COMMENT Content
const commentContent = document.querySelector("#commentContent");
const commentContentLabel = document.querySelector("#commentContentLabel");
const commentContentError = document.querySelector("#commentContentError");
// commentS
const commentsContainer = document.querySelector("#commentsContainer");

// write a function that will add the error connten span below the input field
// if the input field is empty
// if the input field is not empty, remove the error content span

// Initial comments
const comments = [
  { commentBy: "Chris", commentContent: "something", createdAt: "date" },
  { commentBy: "Chris", commentContent: "something", createdAt: "date" },
  { commentBy: "Chris", commentContent: "something", createdAt: "date" },
];


// Event listener for the form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleOnSubmit();
});

function clearChildren(parent) {
  while (parent.firstChild) {
    nodeList.removeChild(nodeList.firstChild);
  }
}

// Render a comment
function renderComment(comment) {
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

  // Create a temporary element to hold the comment HTML
  const commentElement = document.createElement("div");
  commentElement.innerHTML = commentHTML.trim();

  return commentElement.firstChild;
}

// Render initial comments
function renderComments() {
  clearChildren(commentsContainer);
  comments.forEach((comment) => {
    commentsContainer.insertAdjacentElement(
      "afterbegin",
      renderComment(comment)
    );
  });
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

// Handle the form submit
function handleOnSubmit() {
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
  // Add the comment to the comments array
  const createdAt = new Date().toISOString();
  comments.push({
    commentBy: commentBy.value,
    commentContent: commentContent.value,
    createdAt,
  });
  // Remove the error class
  removeErrorClass();
  // Reset the form
  form.reset();
  // Render the comments
  renderComments();
  return;
}

// APP INIT
renderComments();
