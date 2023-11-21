const reponse = await fetch(
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20&refine=keywords_fr%3A%22concert%22&refine=location_countrycode%3A%22FR%22&refine=lastdate_begin%3A%222023%22"
);

const data = await reponse.json();
const valeurDeData = data.results;

let sectionFiches = document.querySelector(".fiches");

// Fonction pour créer les fiches produits
const updatePage = (valeur) => {
  sectionFiches.innerHTML = "";
  const totalElement = document.createElement("p");
  totalElement.innerText = valeur.length;
  sectionFiches.appendChild(totalElement);
  for (let i = 0; i < valeur.length; i++) {

    const evenement = valeur[i];
    const eventElement = document.createElement("article");

    const titleElement = document.createElement("h2");
    titleElement.innerText = evenement.title_fr;

    const imageElement = document.createElement("img");
    imageElement.src = evenement.originalimage;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = evenement.description_fr;

    const daterangeElement = document.createElement("p");
    daterangeElement.innerText = evenement.daterange_fr;

    const keywordElement = document.createElement("p");
    keywordElement.innerText = evenement.keywords_fr;

    const adresseElement = document.createElement("p");
    adresseElement.innerText = evenement.location_address;

    const regionElement = document.createElement("p");
    regionElement.innerText = evenement.location_region;

    sectionFiches.appendChild(eventElement);

    eventElement.appendChild(titleElement);
    eventElement.appendChild(imageElement);
    eventElement.appendChild(descriptionElement);
    eventElement.appendChild(daterangeElement);
    eventElement.appendChild(keywordElement);
    eventElement.appendChild(adresseElement);
    eventElement.appendChild(regionElement);
  }
};

// Fonction pour trier les dates par ordre croissant
const trierDate = () => {
  sectionFiches.innerHTML = "";
  const dateOrdre = Array.from(valeurDeData);
  dateOrdre.sort((a, b) => {
    const dateA = new Date(a.firstdate_begin);
    const dateB = new Date(b.firstdate_begin);
    return dateA - dateB;
  });
  updatePage(dateOrdre);
};

// Fonction pour filtrer les event qui ne sont pas en janvier
const daterange = () => {
  const start = "2023-01-00";
  const end = "2023-01-31";
  const dateJanvier = valeurDeData.filter(
    (date) => date.firstdate_begin >= start && date.firstdate_begin <= end
  );
  sectionFiches.innerHTML = "";
  updatePage(dateJanvier);
};

// Fonction pour que les filtres fonctionne ensemble
const tousLesFiltres = () => {
  const keyword = document.getElementById("keyword").value.toLowerCase();
  const region = document.getElementById("location").value;
  const date = document.getElementById("dateChoix").value;
  let resultatsFiltres = valeurDeData;
  if (keyword) {
    resultatsFiltres = resultatsFiltres.filter((mot) =>
      mot.keywords_fr.includes(keyword)
    );
  }
  if (region) {
    resultatsFiltres = resultatsFiltres.filter(
      (reg) => reg.location_region === region
    );
  }
  if (date) {
    resultatsFiltres = resultatsFiltres.filter((d) =>
      d.firstdate_begin.includes(date)
    );
  }
  sectionFiches.innerHTML = "";
  updatePage(resultatsFiltres);
};

// Fonction qui sert à executer les fonction "tousLesFiltres" en appuyant sur la touche entrée
const keyDown = (event) => {
  if (event.code === "Enter" || event.keyCode === 13) {
    tousLesFiltres();
  }
};

// Fonction pour le moteur de recherche
const moteur = () => {
  const saisi = document
    .getElementById("moteurDeRecherche")
    .value.toLowerCase();
  const recherche = valeurDeData.filter((mot) =>
    mot.title_fr.toLowerCase().includes(saisi)
  );
  sectionFiches.innerHTML = "";
  updatePage(recherche);
  console.log(saisi);
};

// Différents éléments qui utilisent des fonctions
const boutonTrierDate = document.getElementById("btn-date");
boutonTrierDate.addEventListener("click", trierDate);

const boutonDefault = document.getElementById("btn-default");
boutonDefault.addEventListener("click", () => {
  updatePage(valeurDeData);
});

const boutonJanvier = document.getElementById("btn-janvier");
boutonJanvier.addEventListener("click", daterange);

const rechercheSaisi = document.getElementById("moteurDeRecherche");
rechercheSaisi.addEventListener("keydown", () => {
  if (event.code === "Enter" || event.keyCode === 13) {
    moteur();
  }
});

const motSaisi = document.getElementById("keyword");
motSaisi.addEventListener("keydown", keyDown);

const locationSaisi = document.getElementById("location");
locationSaisi.addEventListener("keydown", keyDown);

const boutonFiltreDate = document.getElementById("dateChoix");
boutonFiltreDate.addEventListener("input", tousLesFiltres);

updatePage(valeurDeData);
