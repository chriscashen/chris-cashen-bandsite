// SHARED APP LOGIC & FUNCTIONS

export function setActiveLink(link) { 
  link.classList.add("nav__tabs-link--active");
}

export function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}