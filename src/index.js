const { default: axios } = require("axios");
const { result } = require("lodash");

//Funzione per creare gli elementi html
function createHtmlElement(tagName, attribute = {}, content = "") {
  const element = document.createElement(tagName);
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
  element.textContent = content;
  return element;
}

// H1
const h1 = createHtmlElement("h1", {}, "Ricerca il tuo Libro");

// Input
const searchInput = createHtmlElement("input", {
  type: "text",
  id: "search-input",
  placeholder: "Inserisci il titolo del libro",
});

// Button
const searchButton = createHtmlElement(
  "button",
  { id: "search-button" },
  "Cerca"
);

// Result
const resultContainer = createHtmlElement("div", { id: "result-container" });

// Aggiunta elementi creati
document.body.appendChild(h1);
document.body.appendChild(searchInput);
document.body.appendChild(searchButton);
document.body.appendChild(resultContainer);

// Ricerca risultati
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  if (!searchTerm) return;

  axios
    .get(`https://openlibrary.org/search.json?q=${searchTerm}`)
    .then((response) => {
      const books = _.get(response, "data.docs", []);

      if (books.length === 0) {
        resultContainer.innerHTML = "Nessun risultato trovato.";
        resultContainer.style.backgroundColor = "black";
        return;
      }

      resultContainer.innerHTML = "";
      resultContainer.style.backgroundColor = "white";

      books.forEach((book) => {
        const bookElement = createHtmlElement("div", { class: "book" });

        const titleElement = createHtmlElement("h2", {}, book.title);

        const authorElement = createHtmlElement(
          "p",
          {},
          `Autore: ${book.author_name ? book.author_name.join(", ") : "N/A"}`
        );

        const publishDateElement = createHtmlElement(
          "p",
          {},
          `Data di pubblicazione: ${book.first_publish_year || "N/A"}`
        );

        const descriptionElement = createHtmlElement(
          "p",
          {},
          `Descrizione: ${book.description || "N/A"}`
        );

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(publishDateElement);
        bookElement.appendChild(descriptionElement);

        resultContainer.appendChild(bookElement);
      });
    })
    .catch((error) => {
      console.error("Errore nella richiesta API", error);
      resultContainer.innerHTML = "Si è verificato un errore nella ricerca.";
      resultContainer.style.backgroundColor = "black";
    });
});
