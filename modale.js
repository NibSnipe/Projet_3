// Création de la modale//
const modal = document.createElement("aside");
modal.setAttribute("role", "dialog");
modal.classList.add("modal");

// Ajout de la fenêtre modale au document//
document.body.appendChild(modal);

// Création de la div pour le contenu de la modale//
const modalContent = document.createElement("div");
modalContent.classList.add("modal-container");
modal.appendChild(modalContent);

//création de la div pour les boutons fermeture et back//
const modalButtons = document.createElement("div");
modalButtons.classList.add("modal-buttons");
modalContent.appendChild(modalButtons);

//Ajout du bouton de retour en arrière de la fenêtre modale//
const backButton = document.createElement("button");
backButton.classList.add("modal-back-button");
const backIcon = document.createElement("i");
backIcon.classList.add("fa-solid", "fa-arrow-left");
backButton.appendChild(backIcon);
modalButtons.appendChild(backButton);

// Ajout du bouton de fermeture de la fenêtre modale//
const closeButton = document.createElement("button");
closeButton.classList.add("modal-close-button");
const closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark");
closeButton.appendChild(closeIcon);
modalButtons.appendChild(closeButton);

// Ajout d'un titre à la fenêtre modale//
const modalTitle = document.createElement("h2");
modalTitle.textContent = "Galerie photo";
modalContent.appendChild(modalTitle);

// Création de la div pour l'affichage des photos//
const displayPhoto = document.createElement("div");
displayPhoto.classList.add("display-photo");
modalContent.appendChild(displayPhoto);

// Récupération de la galerie et affichage des projets//
async function getWorksModal() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();

    // Création des balises HTML//
    data.forEach((item) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container");

      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("img-wrapper");

      const imgModal = document.createElement("img");
      imgModal.src = item.imageUrl;
      imgModal.alt = item.title;
      imgModal.style.width = "75px";
      imgModal.style.padding = "0px";
      imgModal.setAttribute("data-id", item.id); // Ajouter l'attribut data-id
      imgWrapper.appendChild(imgModal);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
      // Ajout de l'écouteur d'événements pour la suppression
      deleteIcon.addEventListener("click", () => deleteWork(item.id, imgContainer));

      imgWrapper.appendChild(deleteIcon);
      imgContainer.appendChild(imgWrapper);
      displayPhoto.appendChild(imgContainer);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des projets : ", error);
  }
}

 // Fonction de suppression de projet //
async function deleteWork(id, imgContainer) {
  try {
    // Vérification que le jeton d'authentification est défini//
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Aucun jeton d'authentification défini");
    }

    // Suppression de l'élément de l'API//
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });

    // Vérification du statut de la réponse HTTP//
    if (response.ok) {
      // Suppression de l'élément de la modale//
      if (imgContainer) {
        imgContainer.remove();
      }

      // Suppression de l'élément de la galerie principale//
      const projectElement = document.querySelector(`.gallery .projectElement[data-id="${id}"]`);
      if (projectElement) {
        projectElement.remove();
      }
    } else {
      console.error("Erreur lors de la suppression de l'élément");
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de l'élément : ", error);
  }
}
//Variable de chargement de la modale//
let modalContentLoaded = false;

//Création de la div pour ajout de photo//
const addContent = document.createElement("div");
addContent.classList.add("add-content");
modalContent.appendChild(addContent);
addContent.style.display = "none";

//Création du formulaire d'ajout de photo//
const uploadForm = document.createElement ("form");
uploadForm.classList.add("upload-form");
uploadForm.setAttribute("id", "upload");
addContent.appendChild(uploadForm);

const uploadFileContainer = document.createElement("div");
uploadFileContainer.classList.add("up-file-container");
uploadForm.appendChild(uploadFileContainer);
