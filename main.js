// Length of the password
const lengthElem = document.getElementById("length");
// Password Output
const passwordElem = document.getElementById("password");
// Generate button
const generateElem = document.getElementById("generate");
// Copy button
const copyElem = document.getElementById("copy");

// Similar characters checkbox
const similarElem = document.getElementById("checkSimilar");
let checkedSimilar = similarElem.checked;
similarElem.addEventListener("change", (e) => {
  checkedSimilar = e.target.checked;
});

const copyClipboardElem = document.querySelector("#copyClipboard");
let copyClipboard = copyClipboardElem.checked;
copyClipboardElem.addEventListener("change", (e) => {
  copyClipboard = e.target.checked;
});

// Generate and copy to clipboard the password when page loads
window.onload = () => {
  passwordElem.value = "";
};

// Symbols, numbers, lowercase, uppercase characters checkboxes
const checkboxElems = document.getElementsByClassName("checkbox");
// Array of what checkboxes are checked
let enabledSettings = Array.from(checkboxElems)
  .filter((i) => i.checked)
  .map((i) => i.name);

Array.from(checkboxElems).forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    enabledSettings = Array.from(checkboxElems) // Convert checkboxes to an array to use filter and map.
      .filter((i) => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map((i) => i.name); // Use Array.map to extract only the checkbox names from the array of objects.
  });
});

generateElem.addEventListener("click", generatePassword);
copyElem.addEventListener("click", copyPassword);

// Fisher–Yates shuffle
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

let symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "\\",
  "|",
  "`",
  "~",
  "[",
  "]",
  "{",
  "}",
  "<",
  ">",
  "?",
];
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let lettersUpper = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let lettersLower = lettersUpper.map((element) => element.toLowerCase());

// Shuffle arrays
shuffle(symbols);
shuffle(numbers);
shuffle(lettersLower);
shuffle(lettersUpper);

function generateSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function generateLower() {
  return lettersLower[Math.floor(Math.random() * lettersLower.length)];
}

function generateUpper() {
  return lettersUpper[Math.floor(Math.random() * lettersUpper.length)];
}

function generatePassword() {
  const length = lengthElem.value;

  let password = "";
  let index = -1;

  for (let i = 0; i < length; i++) {
    if (enabledSettings.length == 0) {
      return false;
    }

    if (checkedSimilar) {
      numbers.splice(numbers.indexOf("0"), 1);
      numbers.splice(numbers.indexOf("1"), 1);

      lettersLower.splice(lettersLower.indexOf("i"), 1);
      lettersLower.splice(lettersLower.indexOf("l"), 1);
      lettersLower.splice(lettersLower.indexOf("o"), 1);

      lettersUpper.splice(lettersUpper.indexOf("I"), 1);
      lettersUpper.splice(lettersUpper.indexOf("L"), 1);
      lettersUpper.splice(lettersUpper.indexOf("O"), 1);
    }

    index = Math.floor(Math.random() * enabledSettings.length);

    switch (enabledSettings[index]) {
      case "symbols":
        password += generateSymbol();
        break;

      case "numbers":
        password += generateNumber();
        break;

      case "lowercase":
        password += generateLower();
        break;

      case "uppercase":
        password += generateUpper();
        break;

      default:
        console.log("ERROR: invalid character");
        break;
    }

    if (checkedSimilar) {
      numbers.splice(Math.floor(Math.random() * numbers.length), 0, "0");
      numbers.splice(Math.floor(Math.random() * numbers.length), 0, "1");

      lettersLower.splice(
        Math.floor(Math.random() * lettersLower.length),
        0,
        "i"
      );
      lettersLower.splice(
        Math.floor(Math.random() * lettersLower.length),
        0,
        "l"
      );
      lettersLower.splice(
        Math.floor(Math.random() * lettersLower.length),
        0,
        "o"
      );

      lettersUpper.splice(
        Math.floor(Math.random() * lettersUpper.length),
        0,
        "I"
      );
      lettersUpper.splice(
        Math.floor(Math.random() * lettersUpper.length),
        0,
        "L"
      );
      lettersUpper.splice(
        Math.floor(Math.random() * lettersUpper.length),
        0,
        "O"
      );
    }

    shuffle(symbols);
    shuffle(numbers);
    shuffle(lettersLower);
    shuffle(lettersUpper);
  }

  passwordElem.value = password;
  if (copyClipboard) copyPassword();
}

function copyPassword() {
  /* Select the text field */
  passwordElem.select();

  /* For mobile devices */
  passwordElem.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(passwordElem.value);
}
