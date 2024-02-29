const PRONOUNS = ["the", "our"];
const ADJS = ["big", "great"];
const NOUNS = ["jogger", "racoon"];
const EXTENSIONS = [".com", ".es"];

const WORD_CATEGORIES = [PRONOUNS, ADJS, NOUNS, EXTENSIONS];

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
    if (category == 3 && element[0] != ".") element = "." + element;

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

displayDomainList();
