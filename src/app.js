let word_categories = {
  PRONOUNS: ["the", "our"],
  ADJECTIVES: ["big", "great"],
  NOUNS: ["jogger", "racoon"],
  EXTENSIONS: [".com", ".es"]
};

let amountCategories = 4;

function allCombos(categories = word_categories, index = 0) {
  const categoryKeys = Object.keys(categories);

  if (index >= categoryKeys.length) return [[]];

  const currentCategory = categories[categoryKeys[index]];
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

function addElement(id, element) {
  if (element) {
    if (id === "extensions" && element[0] != ".") element = "." + element;

    const list = document.getElementById(id);
    addLI(list, element);

    word_categories[id.toUpperCase()].push(element);

    displayDomainList();
  }
}

function addLI(list, content) {
  const li = document.createElement("li");
  li.textContent = content;
  list.appendChild(li);
}

function removeElement(id) {
  if (word_categories[id.toUpperCase()].length > 1) {
    const list = document.getElementById(id);
    list.removeChild(list.lastElementChild);

    word_categories[id.toUpperCase()].pop();
    displayDomainList();
  }
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createCategory(title, item) {
  addCategory(title.toUpperCase(), item);

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

  let buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex justify-content-between";
  buttonContainer.id = title + "-btns";
  addButtons(title, buttonContainer);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(itemList);
  cardBody.appendChild(buttonContainer);

  card.appendChild(cardBody);

  cardDiv.appendChild(card);
  const lastChild = document.getElementById("card-container").lastElementChild;

  document.getElementById("card-container").insertBefore(cardDiv, lastChild);

  displayDomainList();
}

function addCategory(category, item) {
  const keys = Object.keys(word_categories);
  const lastKey = keys[keys.length - 1];

  const updatedCategories = {};
  for (const key of keys) {
    if (key === lastKey) {
      updatedCategories[category] = [String(item)];
    }
    updatedCategories[key] = word_categories[key];
  }

  word_categories = updatedCategories;
  amountCategories++;
}

function clearButtons(id) {
  let container = document.getElementById(id + "-btns");
  clearChildren(container);
}

function addButtons(id, buttonContainer) {
  addPlaceholderButton(buttonContainer);

  let addButton = document.createElement("button");
  addButton.className = "btn text-white fs-3 p-0";
  addButton.textContent = "+";
  addButton.onclick = function() {
    addElement(id, prompt());
  };

  let removeButton = document.createElement("button");
  removeButton.className = "btn text-white fs-3 p-0";
  removeButton.textContent = "-";
  removeButton.onclick = function() {
    removeElement(id);
  };

  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(removeButton);

  addPlaceholderButton(buttonContainer);
}

function addPlaceholderButton(container) {
  let placeholder = document.createElement("div");
  placeholder.id = "placeholder-btn";
  container.appendChild(placeholder);
}

function getPropertyIndex(key) {
  const keys = Object.keys(word_categories);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === key) {
      return i;
    }
  }
}

displayDomainList();
