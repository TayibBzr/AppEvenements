const reponse = await fetch(
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20&refine=keywords_fr%3A%22concert%22&refine=location_countrycode%3A%22FR%22&refine=lastdate_begin%3A%222023%22"
);

const data = await reponse.json();

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

const trierDate = (croissant) => {
  sectionFiches.innerHTML = "";
  const dateOrdre = Array.from(data.results);
  dateOrdre.sort((a, b) => {
    const dateA = new Date(a.firstdate_begin)
    const dateB = new Date(b.firstdate_begin)
    return dateA - dateB
  });
  updatePage(dateOrdre);
};

const boutonTrierDate = document.getElementById("btn-date");
boutonTrierDate.addEventListener("click", () => {
  trierDate();
});

const boutonDefault = document.getElementById("btn-default");
boutonDefault.addEventListener("click", () => {
  updatePage(data.results);
});


