const reponse = await fetch(
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20&refine=keywords_fr%3A%22concert%22&refine=location_countrycode%3A%22FR%22&refine=lastdate_begin%3A%222023%22"
);

const data = await reponse.json();
const valeurDeData = data.results;

let sectionFiches = document.querySelector(".fiches");

const updatePage = (valeur) => {
  sectionFiches.innerHTML = "";
  for (let i = 0; i < valeur.length; i++) {
    const articles = valeur[i];
    const eventElement = document.createElement("article");

    const titleElement = document.createElement("h2");
    titleElement.innerText = articles.title_fr;

    const imageElement = document.createElement("img");
    imageElement.src = articles.originalimage;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = articles.description_fr;

    const daterangeElement = document.createElement("p");
    daterangeElement.innerText = articles.daterange_fr;

    const keywordElement = document.createElement("p");
    keywordElement.innerText = articles.keywords_fr;

    const adresseElement = document.createElement("p");
    adresseElement.innerText = articles.location_address;

    const regionElement = document.createElement("p");
    regionElement.innerText = articles.location_region;

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

const daterange = () => {
  const start = "2023-01-00";
  const end = "2023-01-31";
  const dateJanvier = valeurDeData.filter(
    (date) => date.firstdate_begin >= start && date.firstdate_begin <= end
  );
  sectionFiches.innerHTML = "";
  updatePage(dateJanvier);
};

const keyword = () => {
  const saisi = document.getElementById("keyword").value;
  const motsCle = valeurDeData.filter((mot) => mot.keywords_fr.includes(saisi));
  sectionFiches.innerHTML = "";
  updatePage(motsCle);
  console.log(saisi);
  console.log(motsCle);
};

const location = () => {
  const region = document.getElementById("location").value;
  const loc = valeurDeData.filter((reg) => reg.location_region === region);
  sectionFiches.innerHTML = "";
  updatePage(loc);
  console.log(region);
  console.log(loc);
};

const boutonTrierDate = document.getElementById("btn-date");
boutonTrierDate.addEventListener("click", () => {
  trierDate();
});

const boutonDefault = document.getElementById("btn-default");
boutonDefault.addEventListener("click", () => {
  updatePage(valeurDeData);
});

const boutonJanvier = document.getElementById("btn-janvier");
boutonJanvier.addEventListener("click", () => {
  daterange();
});

const motSaisi = document.getElementById("keyword");
motSaisi.addEventListener("keydown", () => {
  if (event.code === "Enter" || event.keyCode === 13) {
    keyword();
  }
});

const locationSaisi = document.getElementById("location");
locationSaisi.addEventListener("keydown", () => {
  if (event.code === "Enter" || event.keyCode === 13) {
    location();
  }
});





updatePage(valeurDeData);