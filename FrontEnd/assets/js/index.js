// fetch("http://localhost:5678/api/categories")
//   .then((response) => response.json())
//   .then((categories) => {
//     console.log(categories);
//   });

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
