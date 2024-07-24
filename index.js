// Mise de l'API work dans une fonction

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    renderWorks(data);
  }

// éléments a remplir

const portfolio = document.querySelector("#portfolio");
const gallery   = document.querySelector(".gallery");
let buttonContainer;

// Remplir les articles avec boucle foreach 

function renderWorks(data) {
  gallery.innerHTML = ""; // effacer la galerie //
  data.forEach((item) => {
    const projectElement = `
      <article class="projectElement" data-category="${item.category.name}">
        <img src="${item.imageUrl}" alt="${item.title}">
        <figcaption>${item.title}</figcaption>
      </article>
    `;
    gallery.innerHTML += projectElement;
  });
}

// Création conteneur bouton

async function getCategories() {
  buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons");
  gallery.parentNode.insertBefore(buttonContainer, gallery);
  buttonContainer.style.display = "flex";

  // Création du bouton "Tous"

  const anyButton = document.createElement("button");
  anyButton.classList.add("filter-button");
  anyButton.textContent = "Tous";
  buttonContainer.appendChild(anyButton);
  anyButton.addEventListener("click", () => {
    filterGallery();
  });


  const response = await fetch("http://localhost:5678/api/categories");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données");
  }
  const data = await response.json();
  const categoriesSet = new Set(data.map((item) => item.name));

  categoriesSet.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("filter-button");
    buttonContainer.appendChild(button);
    button.addEventListener("click", () => {
      filterGallery(category);
    });
  });

  // Initialize with the "Tous" filter selected
  filterGallery();
}

function filterGallery(category) {
  currentCategory = category;

  const galleryItems = document.querySelectorAll(".projectElement");
  galleryItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    item.style.display = !category || category === itemCategory ? "block" : "none";
  });


  // Update button selection
  const buttons = document.querySelectorAll(".filter-button");
  buttons.forEach((button) => {
    button.classList.toggle("selected", button.textContent === (category || "Tous"));
  });
}

// Afficher les éléments sur la page html

getWorks();

function adminBar() { 
// zone administrateur
//création du bandeau mode édition et ajout au DOM
const header = document.body;
const adminMode = document.createElement("div");
adminMode.classList.add("admin-mode");
header.prepend(adminMode)

const logoAdminMode = document.createElement("i");
logoAdminMode.classList.add("fa-regular", "fa-pen-to-square");
adminMode.appendChild(logoAdminMode);

const titleAdminMode = document.createElement("span");
titleAdminMode.classList.add("admin-title");
titleAdminMode.textContent = "Mode édition";
adminMode.appendChild(titleAdminMode);
}

//Création du lien logout dans le menu de navigation et ajout au DOM
const navMenu = document.querySelector("nav ul");
const logout = document.createElement("li");
const logoutLink = document.createElement("a");
logoutLink.appendChild(document.createTextNode("logout"));
logoutLink.setAttribute("href", "#");
logoutLink.setAttribute("id", "logout-link");
logout.appendChild(logoutLink);
//Récupération du logo instagram
const instaLogo = navMenu.querySelector("li:last-child");
//Insertion de logout avant le logo instagram
navMenu.insertBefore(logout, instaLogo);

//Création du bouton d'appel à la modale
const projectTitle = document.querySelector("#portfolio h2");
const editButton = document.createElement("button");
editButton.classList.add("edit-button");
const editIcon = document.createElement("i");
editIcon.classList.add("fa-regular", "fa-pen-to-square");
editButton.textContent = "modifier";
editButton.appendChild(editIcon);
// Ajoutez le bouton modifier à la balise h2àà²
projectTitle.appendChild(editButton);


//Cache le lien login et affiche le lien logout si logged in

const loginLink = document.querySelector("#login");
if (localStorage.getItem("token")) { 
    adminBar()
    logout.style.display ="flex";
    loginLink.style.display = "none";
    editButton.style.display = "flex";
} else {
    getCategories();
    logout.style.display ="none";
    loginLink.style.display = "flex";
    editButton.style.display = "none";
}


//Gestion de la déconnexion
logoutLink.addEventListener("click", (event) =>{
    event.preventDefault();
    console.log("logoutLink")
    localStorage.removeItem("token");
    window.location.href = "./index.html";
})

