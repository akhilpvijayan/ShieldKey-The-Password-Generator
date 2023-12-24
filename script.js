const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperCaseEl = document.getElementById("uppercase");
const lowerCaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = upperCaseEl.checked;
  const hasLower = lowerCaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
  );
});

// JavaScript function to update the selected length
document.getElementById('length').addEventListener('input', function() {
    var selectedLength = this.value;
    document.getElementById('selectedLength').innerText = selectedLength;
  });
  
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;
  //   console.log(password);

  if (!password) {
    return "";
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  showToast('Password copied to clipboard.', true);
});

function showToast(message, isSuccess) {
    var toast = null;
    if(isSuccess){
        toast = document.getElementById('toast-success');
    }
    else{
        toast = document.getElementById('toast-error');
    }
    toast.innerText = message;
    toast.style.display = 'block';

    setTimeout(function() {
      toast.style.display = 'none';
    }, 3000);
  }

function generatePassword(length, upper, lower, number, symbol) {
  if(upper || lower || number || symbol == null){
    let generatedPassword = "";
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
  
    if (typesCount === 0) {
      return "";
    }
  
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
  
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
  }
  else{
    showToast('Please select atleast one option.', false);
    return null;
  }
}

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
