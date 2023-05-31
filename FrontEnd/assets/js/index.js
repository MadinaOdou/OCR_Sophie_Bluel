// const works = fetch("http://localhost:5678/api/works")
//   .then((response) => response.json())
//   .then((works) => genererElements(works));

function switchToModeAdmin() {
  if (localStorage.getItem("token")) {
    document.querySelector(".filterButtons").style.display = "none";
    document.querySelectorAll(".admin-mode").forEach((x) => {
      x.classList.remove("admin-mode");
    });
    document.querySelector(".login-out").innerText = "logout";
  } else {
    console.log("utilisateur déconnecté");
  }
}

switchToModeAdmin();

function genererElements(works) {
  for (let i = 0; i < works.length; i++) {
    const sectionGallery = document.querySelector(".gallery");
    const workElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = works[i].title;

    sectionGallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(nomElement);
  }
}

const allBtn = document.querySelectorAll(".btn-filter");
allBtn[0].classList.add("active");

function selectBtn() {
  const btnSelected = document.querySelectorAll(".btn-filter.active");
  btnSelected.forEach((btn) => {
    btn.classList.remove("active");
  });
}

async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  const allWorks = await works.json();
  genererElements(allWorks);
  const objets = allWorks.filter((x) => x.category.name === "Objets");
  const appartements = allWorks.filter(
    (x) => x.category.name === "Appartements"
  );
  const hotelsRestaurants = allWorks.filter(
    (x) => x.category.name === "Hotels & restaurants"
  );

  const boutonTous = document.querySelector(".tous");
  boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererElements(allWorks);
    selectBtn();
    boutonTous.classList.add("active");
  });

  const boutonObjets = document.querySelector(".objets");
  boutonObjets.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererElements(objets);
    selectBtn();
    boutonObjets.classList.add("active");
  });

  const boutonAppartements = document.querySelector(".appartements");
  boutonAppartements.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererElements(appartements);
    selectBtn();
    boutonAppartements.classList.add("active");
  });

  const boutonHotelsRestaurants = document.querySelector(".hotelsRestaurants");
  boutonHotelsRestaurants.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererElements(hotelsRestaurants);
    selectBtn();
    boutonHotelsRestaurants.classList.add("active");
  });
}

getWorks();

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".btn-close").addEventListener("click", closeModal);
  modal.querySelector(".stop-modal").addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".btn-close").removeEventListener("click", closeModal);
  modal
    .querySelector(".stop-modal")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".link-edit").forEach((a) => {
  a.addEventListener("click", openModal);
});

async function deleteItem() {
  const works = await fetch("http://localhost:5678/api/works");
  const allWorks = await works.json();
  const btnTrash = document.querySelectorAll(".btn-trash");
  btnTrash.forEach((a) => {
    a.addEventListener("click", async (event) => {
      event.preventDefault();
      const photo = event.target.closest("figure");
      const photoId = photo.dataset.id;
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5678/api/works/${photoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        photo.remove();

        const index = allWorks.findIndex((work) => work.id === photoId);
        if (index !== -1) {
          allWorks.splice(index, 1);
        }
      } else {
        console.error("Erreur");
      }
    });
  });
}

function loadGallery(works) {
  const photoGallery = document.querySelector(".photo-elements");

  for (let i = 0; i < works.length; i++) {
    const workElement = document.createElement("figure");
    workElement.dataset.id = works[i].id;
    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    const buttonTrash = document.createElement("button");
    const iconTrash = document.createElement("i");
    const textElement = document.createElement("figcaption");
    textElement.innerText = "éditer";

    workElement.appendChild(imageElement);
    workElement.appendChild(textElement);
    workElement.appendChild(buttonTrash);
    buttonTrash.appendChild(iconTrash);

    buttonTrash.classList.add("btn-trash");
    iconTrash.classList.add("fa-solid");
    iconTrash.classList.add("fa-trash-can");

    photoGallery.appendChild(workElement);
  }
}

async function getAllWorks(event) {
  const works = await fetch("http://localhost:5678/api/works");
  const allWorks = await works.json();
  loadGallery(allWorks);
  deleteItem();
}

getAllWorks();

// fetch("http://localhost:5678/api/categories")
//   .then((response) => response.json())
//   .then((categories) => {
//     console.log(categories);
//   });

// const boutonTous = document.querySelector(".tous");

// boutonTous.addEventListener("click", function () {
//   document.querySelector(".gallery").innerHTML = "";
//   fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((works) => genererElements(works));
// });

// const boutonObjets = document.querySelector(".objets");

// boutonObjets.addEventListener("click", function () {
//   document.querySelector(".gallery").innerHTML = "";
//   fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((data) => data.filter((x) => x.category.name === "Objets"))
//     .then((resultat) => genererElements(resultat));
// });

// const boutonAppartements = document.querySelector(".appartements");

// boutonAppartements.addEventListener("click", function () {
//   document.querySelector(".gallery").innerHTML = "";
//   fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((data) => data.filter((x) => x.category.name === "Appartements"))
//     .then((resultat) => genererElements(resultat));
// });

// const boutonHotelsRestaurants = document.querySelector(".hotelsRestaurants");

// boutonHotelsRestaurants.addEventListener("click", function () {
//   document.querySelector(".gallery").innerHTML = "";
//   fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((data) =>
//       data.filter((x) => x.category.name === "Hotels & restaurants")
//     )
//     .then((resultat) => genererElements(resultat));
// });
