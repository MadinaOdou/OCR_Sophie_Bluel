const works = fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => genererElements(works));

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

genererElements(works);

// fetch("http://localhost:5678/api/categories")
//   .then((response) => response.json())
//   .then((categories) => {
//     console.log(categories);
//   });

const boutonTous = document.querySelector(".tous");

boutonTous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => genererElements(works));
});

const boutonObjets = document.querySelector(".objets");

boutonObjets.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => data.filter((x) => x.category.name === "Objets"))
    .then((resultat) => genererElements(resultat));
});

const boutonAppartements = document.querySelector(".appartements");

boutonAppartements.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => data.filter((x) => x.category.name === "Appartements"))
    .then((resultat) => genererElements(resultat));
});

const boutonHotelsRestaurants = document.querySelector(".hotelsRestaurants");

boutonHotelsRestaurants.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) =>
      data.filter((x) => x.category.name === "Hotels & restaurants")
    )
    .then((resultat) => genererElements(resultat));
});
