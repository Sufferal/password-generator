const lengthElem   = document.getElementById('length');
const passwordElem = document.getElementById('password'); 
const generateElem = document.getElementById('generate');
const copyElem     = document.getElementById('copy');

generateElem.addEventListener('click', generatePassword);
copyElem.addEventListener("click", copyPassword);

// Generate and copy to clipboard the password when page loads
window.onload = () => {
  generatePassword();
  copyPassword();
}

function generatePassword() {
  const length = lengthElem.value;
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "\\", "|", 
  "`", "~", "[", "]", "{", "}", "<", ">", "?"]; 
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const lettersUpper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
  "R","S","T","U","V","W","X","Y","Z"];
  const lettersLower = lettersUpper.map(element => element.toLowerCase());

  let password = "";
  let char = -1;
  let index = -1000;

  for(let i = 0; i < length; i++)
  {
    char = Math.floor(Math.random() * 4);

    switch (char) {
      case 0:
        index = Math.floor(Math.random() * symbols.length);
        password += symbols[index];
        break;
      
      case 1:
        index = Math.floor(Math.random() * numbers.length);
        password += numbers[index];
        break;
      
      case 2:
        index = Math.floor(Math.random() * lettersUpper.length);
        password += lettersUpper[index];
        break;

      case 3:
        index = Math.floor(Math.random() * lettersLower.length);
        password += lettersLower[index];
        break;
    
      default:
        console.log("[ERROR]: Invalid character");
        break;
    }
  }

  passwordElem.value = password;
}

function copyPassword() {
  /* Select the text field */
  passwordElem.select();
  passwordElem.setSelectionRange(0, 99999); /* For mobile devices */

  navigator.clipboard.writeText(passwordElem.value);
}

