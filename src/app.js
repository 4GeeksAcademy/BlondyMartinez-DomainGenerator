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

  currentCategory.forEach(element => {
    subCombos.forEach(subCombo => {
      result.push([element, ...subCombo].join(""));
    });
  });

  return result;
}

function displayDomainList() {
  let list = document.getElementById("domain-list");

  allCombos().forEach(element => {
    let li = document.createElement("li");
    li.textContent = element;
    list.appendChild(li);
  });
}

displayDomainList();
