// Element utile pour le formulaire

const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#error-message");

//Ecoute de l'évènement de soumission du formulaire//
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Vérifier si les champs de saisie sont vides
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (emailValue === "" || passwordValue === "") {
    // Afficher un message d'erreur
    errorMessage.textContent = "Veuillez remplir tous les champs";
    return;
  }

  // Réinitialiser le message d'erreur
  errorMessage.textContent = "";

  // Appeler l'API pour récupérer le token d'authentification
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify({ email: emailValue, password: passwordValue }),
  });

  // Vérifier si la réponse est valide
  if (response.ok) {
    // Récupérer le token d'authentification à partir de la réponse
    const token = await response.json();
    console.log(token);

    // Stocker le token d'authentification dans le stockage local
    localStorage.setItem("token", token.token);

    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = "index.html";
  } else {
    // Afficher un message d'erreur à l'utilisateur
    errorMessage.style.display = "flex";
    errorMessage.textContent = "E-mail ou mot de passe incorrect";
  }
});
