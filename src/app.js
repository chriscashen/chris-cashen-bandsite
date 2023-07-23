// SHARED APP LOGIC & FUNCTIONS


export function setActiveLink(link) {
  link.classList.add("nav__tabs-link--active");
}

export function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

 export function formatDate(timestamp) {
  let date = new Date(timestamp);
  let formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' });
  return formattedDate;
}
