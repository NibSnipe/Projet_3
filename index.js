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
const gallery = document.querySelector(".gallery");

// Remplir les articles sur la page d'accueil
function renderWorks(data) {
  gallery.innerHTML = ""; // Effacer la galerie

  data.forEach((item) => {
    // Créer un article pour chaque projet
    const article = document.createElement("article");
    article.className = "projectElement";
    article.dataset.category = item.category.name;

    // Ajouter une image au projet
    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;

    // Ajouter une légende au projet
    const caption = document.createElement("figcaption");
    caption.textContent = item.title;

    // Ajouter l'image et la légende dans l'article
    article.appendChild(img);
    article.appendChild(caption);

    // Ajouter l'article directement à la galerie
    gallery.appendChild(article);
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
    item.style.display =
      !category || category === itemCategory ? "block" : "none";
  });

  // Update button selection
  const buttons = document.querySelectorAll(".filter-button");
  buttons.forEach((button) => {
    button.classList.toggle(
      "selected",
      button.textContent === (category || "Tous")
    );
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
  header.prepend(adminMode);

  const logoAdminMode = document.createElement("i");
  logoAdminMode.classList.add("fa-regular", "fa-pen-to-square");
  adminMode.appendChild(logoAdminMode);

  const titleAdminMode = document.createElement("span");
  titleAdminMode.classList.add("admin-title");
  titleAdminMode.textContent = "Mode édition";
  adminMode.appendChild(titleAdminMode);
}

function adminLinks() {
  //Création du lien logout dans le menu de navigation et ajout au DOM
  const navMenu = document.querySelector("nav ul");
  const logout = document.createElement("li");
  logout.style.display = "flex";
  const logoutLink = document.createElement("a");
  logoutLink.appendChild(document.createTextNode("logout"));
  logoutLink.setAttribute("href", "#");
  logoutLink.setAttribute("id", "logout-link");
  logout.appendChild(logoutLink);

  //Gestion de la déconnexion
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("logoutLink");
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });

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
  editButton.style.display = "flex";
  editButton.appendChild(editIcon);
  // Ajoutez le bouton modifier à la balise h2
  projectTitle.appendChild(editButton);
  editButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });
}

const loginLink = document.querySelector("#login");
//Cache le lien login et affiche le lien logout si logged in
if (localStorage.getItem("token")) {
  // L'utilisateur est connecté
  adminBar();
  adminLinks();
  loginLink.style.display = "none";
} else {
  // L'utilisateur n'est pas connecté
  getCategories();
  logout.style.display = "none";
  loginLink.style.display = "flex";
  editButton.style.display = "none";
}

// Debut Modale
