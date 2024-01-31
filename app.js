// Selecting DOM elements
const billInputEl = document.querySelector(".bill-input");
const peopleInputEl = document.querySelector(".people-input");
const tipPersonEl = document.querySelector("#tip-amount");
const totalPersonEl = document.querySelector("#total-amount");
const tipCustomEl = document.querySelector(".tip-custom");
const tips = document.querySelectorAll(".tips");
const errorEl = document.querySelector(".error");
const resetBtnEl = document.querySelector(".reset");

// Initializing default values
billInputEl.value = 0.0;
peopleInputEl.value = 1;

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.0;

// Function to handle bill input changes
const billInpFun = () => {
  billValue = parseFloat(billInputEl.value);
  calculateTip();
};

// Function to handle people input changes
const peopleInputFun = () => {
  peopleValue = parseFloat(peopleInputEl.value);

  // Display error message if people value is 0
  if (peopleValue === 0) {
    errorEl.style.display = "block";
  } else {
    errorEl.style.display = "none";
    calculateTip();
  }
};

// Function to handle custom tip input changes
const tipCusFun = () => {
  tipValue = parseFloat(tipCustomEl.value / 100);

  // Remove active tip class from all tips
  tips.forEach((tip) => {
    tip.classList.remove("active-tip");
  });

  calculateTip();
};

// Function to handle tip selection clicks
const handleClick = (e) => {
  tips.forEach((tip) => {
    tip.classList.remove("active-tip");

    // Add active-tip class to the clicked tip
    if (e.target.innerHTML == tip.innerHTML) {
      tip.classList.add("active-tip");
      tipValue = parseFloat(tip.innerHTML) / 100;
    }
  });

  calculateTip();
};

// Function to calculate tip and total amounts
const calculateTip = () => {
  if (peopleValue >= 1) {
    let tipAmount = (billValue / peopleValue) * tipValue;
    let total = billValue + peopleValue * tipAmount;

    // Update tip and total amounts in the UI
    tipPersonEl.innerHTML = "$" + tipAmount.toFixed(2);
    totalPersonEl.innerHTML = "$" + total.toFixed(2);
  }
};

// Function to reset all input values
const resetFun = () => {
  billInputEl.value = 0.0;
  peopleInputEl.value = 1;
  tipPersonEl.innerHTML = "$" + (0.0).toFixed(2);
  totalPersonEl.innerHTML = "$" + (0.0).toFixed(2);
};

// Event listeners for tip selection, bill input, people input, custom tip input, and reset button
tips.forEach((tip) => {
  tip.addEventListener("click", handleClick);
});

billInputEl.addEventListener("input", billInpFun);
peopleInputEl.addEventListener("input", peopleInputFun);
tipCustomEl.addEventListener("input", tipCusFun);
resetBtnEl.addEventListener("click", resetFun);
