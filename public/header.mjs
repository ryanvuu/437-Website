import { toHtmlElement } from "./toHtmlElement.mjs";

function createNavStringLink(linkName, link) {
  return `<a href="${link}">${linkName}</a>`;
}

function createNodeTitle(title) {
  return toHtmlElement(`<h1>${title}</h1>`);
}

function toggleMenu(e) {
  const linksContainer = document.querySelector("#nav-links");
  
  // Toggle links on menu click
  linksContainer.classList.toggle("hidden")

  // Close menu when clicking outside of the header
  document.body.addEventListener("click", (e) => {
    const header = document.querySelector("header");
    if (!header.contains(e.target)) {
      linksContainer.classList.add("hidden");
    }
  });
}

/*
params:
  title - a string to act as the h1 of the page
  links - an array of objects where each object is a link name and its relative path
  parent - the container to insert the links into
*/
function createHeader(title, links, parent) {
  let linkString;
  let linkNode;
  const headerContainer = document.querySelector(".heading-nav");
  const navElement = document.querySelector(parent);
  const titleNode = createNodeTitle(title);
  const numElements = links.length;

  headerContainer.prepend(titleNode);

  for (let i = 0; i < numElements; i++) {
    linkString = createNavStringLink(links[i].linkName, links[i].link);
    linkNode = toHtmlElement(linkString);
    navElement.append(linkNode);
  }

  const menuButton = document.querySelector("#menu-button");
  menuButton.addEventListener("click", toggleMenu);
}

// enable / disable dark mode on checkbox click
function toggleDarkMode(e) {
  if (this.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "on");
    console.log("toggled on dark mode");
  }
  else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "off");
    console.log("toggled off dark mode");
  }
}

// check to persist dark mode state
function checkDarkModeLocal() {
  const darkModeCheckbox = document.querySelector("#dark-mode-box");
  const isDarkModeOn = (localStorage.getItem("dark-mode") === "on") ? true : false;

  if (isDarkModeOn) {
    document.body.classList.add("dark-mode");
    darkModeCheckbox.checked = true;
  }
}

const navContainer = "#nav-links";
const links = [
  {linkName: "Home", link: "./index.html"},
  {linkName: "Projects", link: "./projects.html"}
];

if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  createHeader("Ryan Vu", links, navContainer);
}
else if (window.location.pathname === '/projects.html') {
  createHeader("Projects", links, navContainer);
}

checkDarkModeLocal();

const darkModeCheckbox = document.querySelector("#dark-mode-box");
darkModeCheckbox.addEventListener("change", toggleDarkMode);