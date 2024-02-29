const PRONOUNS = ["the", "our"];
const ADJS = ["big", "great"];
const NOUNS = ["jogger", "racoon"];
const EXTENSIONS = [".com", ".es"];

const WORD_CATEGORIES = [PRONOUNS, ADJS, NOUNS, EXTENSIONS];

const EXTENSION_CARD = document.getElementById("extensions-card");

function allCombos(categories = WORD_CATEGORIES, index = 0) {
  // if there's only one array, returns it
  if (index >= categories.length) return [[]];

  const currentCategory = categories[index];
  // recursion to handle subcombos, this way it can handle multiple categories
  const subCombos = allCombos(categories, index + 1);
  const result = [];

  for (const element of currentCategory) {
    for (const subCombo of subCombos) {
      result.push([element, ...subCombo].join(""));
    }
  }

  return result;
}

function displayDomainList() {
  const list = document.getElementById("domain-list");
  clearChildren(list);

  allCombos().forEach(element => {
    addLI(list, element);
  });
}

function addElement(id, element, category) {
  if (element) {
    if (category == WORD_CATEGORIES.length - 1 && element[0] != ".")
      element = "." + element;

    const list = document.getElementById(id);
    addLI(list, element);

    WORD_CATEGORIES[category].push(element);

    displayDomainList();
  }
}

function addLI(list, content) {
  const li = document.createElement("li");
  li.textContent = content;
  list.appendChild(li);
}

function removeElement(id, category) {
  if (WORD_CATEGORIES[category].length > 1) {
    const list = document.getElementById(id);
    list.removeChild(list.lastElementChild);

    WORD_CATEGORIES[category].pop();
    displayDomainList();
  }
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createCard(title, item) {
  addCategory((title = [item]));

  let cardDiv = document.createElement("div");
  cardDiv.className = "col";

  let card = document.createElement("div");
  card.className = "card mt-2";

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let cardTitle = document.createElement("h4");
  cardTitle.className = "card-title text-center";
  cardTitle.textContent = String(title).toUpperCase();

  let itemList = document.createElement("ul");
  itemList.className = "list-unstyled";
  itemList.id = title;

  addLI(itemList, item);

  let addButton = document.createElement("button");
  addButton.className = "btn text-white fs-3 p-0";
  addButton.textContent = "+";
  addButton.onclick = function() {
    addElement(title, prompt(), title);
  };

  let removeButton = document.createElement("button");
  removeButton.className = "btn text-white fs-3 p-0";
  removeButton.textContent = "-";
  removeButton.onclick = function() {
    removeElement(title, title);
  };

  let buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex justify-content-between";
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(removeButton);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(itemList);
  cardBody.appendChild(buttonContainer);

  card.appendChild(cardBody);

  cardDiv.appendChild(card);
  const lastChild = document.getElementById("card-container").lastElementChild;

  document.getElementById("card-container").insertBefore(cardDiv, lastChild);

  displayDomainList();
}

function addCategory(category) {
  WORD_CATEGORIES.splice(WORD_CATEGORIES.length - 1, 0, category);
}

displayDomainList();
