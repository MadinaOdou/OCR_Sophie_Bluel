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
