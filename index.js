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
getCategories();