console.log("Test");

// add name field
// find the name input on the page
const nameInput = document.querySelector("#name");
// put cursor in the name field when the page loads
nameInput.focus();

// add job role
// find the job role menu and other job role input
const jobRole = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
// hide the other job role input when the page loads
otherJobRole.style.display = "none";
// listen for a change in the job role menu
jobRole.addEventListener("change", (event) => {
// show other job role only when other is selected
  if (event.target.value === "other") {
    otherJobRole.style.display = "";
  } else {
    otherJobRole.style.display = "none";
  }
});

// tshirt info
// select the design menu color menu and color options
const design = document.querySelector("#design");
const color = document.querySelector("#color");
const colorOptions = color.children;
// disable the color menu when the page loads
color.disabled = true;
// listen for a change in the design menu
design.addEventListener("change", (event) => {
// enable the color menu after a design is selected
  color.disabled = false;
// loop through each color option
  for (let i = 0; i < colorOptions.length; i++) {
    const designValue = event.target.value;
    const colorTheme = colorOptions[i].getAttribute("data-theme");
// show colors that match the selected design
    if (designValue === colorTheme) {
      colorOptions[i].hidden = false;
      colorOptions[i].setAttribute("selected", true);
    } else {
      colorOptions[i].hidden = true;
      colorOptions[i].removeAttribute("selected");
    }
  }
});

// register for activities
// select the activities section and total cost
const activities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
// start the total cost at zero
let totalCost = 0;
// listen for a change in the activities section
activities.addEventListener("change", (event) => {
// get the activity cost and change it from a string to a number
  const activityCost = +event.target.getAttribute("data-cost");
// add the cost when checked and subtract it when unchecked
  if (event.target.checked) {
    totalCost += activityCost;
  } else {
    totalCost -= activityCost;
  }
// show the new total cost
  activitiesCost.innerHTML = "Total: $" + totalCost;
});

// payment info
// select the payment menu and payment sections
const payment = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
// hide paypal and bitcoin when the page loads
paypal.style.display = "none";
bitcoin.style.display = "none";
// make credit card the selected payment option
payment.children[1].setAttribute("selected", true);
// listen for a change in the payment menu
payment.addEventListener("change", (event) => {
// show only the payment section that was selected
  if (event.target.value === "credit-card") {
    creditCard.style.display = "";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (event.target.value === "paypal") {
    creditCard.style.display = "none";
    paypal.style.display = "";
    bitcoin.style.display = "none";
  } else if (event.target.value === "bitcoin") {
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "";
  }
});

// form validation
// select the form and fields that need validation
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const creditCardInput = document.querySelector("#cc-num");
const zipInput = document.querySelector("#zip");
const cvvInput = document.querySelector("#cvv");
// select all of the activity checkboxes
const activityCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]');
// listen for the form to be submitted
form.addEventListener("submit", (event) => {
  // check the name field
  const nameValue = nameInput.value.trim();
  const nameValid = nameValue !== "";
// stop the form and show the error if the name is not valid
  if (!nameValid) {
    event.preventDefault();
    nameInput.parentElement.classList.add("not-valid");
    nameInput.parentElement.classList.remove("valid");
    nameInput.parentElement.lastElementChild.style.display = "block";
  } else {
    nameInput.parentElement.classList.add("valid");
    nameInput.parentElement.classList.remove("not-valid");
    nameInput.parentElement.lastElementChild.style.display = "none";
  }
// check the email field
  const emailValue = emailInput.value;
  const emailValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
// stop the form and show the error if the email is not valid
  if (!emailValid) {
    event.preventDefault();
    emailInput.parentElement.classList.add("not-valid");
    emailInput.parentElement.classList.remove("valid");
    emailInput.parentElement.lastElementChild.style.display = "block";
  } else {
    emailInput.parentElement.classList.add("valid");
    emailInput.parentElement.classList.remove("not-valid");
    emailInput.parentElement.lastElementChild.style.display = "none";
  }

// check that at least one activity was selected
  let activitiesValid = false;
  for (let i = 0; i < activityCheckboxes.length; i++) {
    if (activityCheckboxes[i].checked) {
      activitiesValid = true;
    }
  }
// stop the form and show the error if no activity was selected
  if (!activitiesValid) {
    event.preventDefault();
    activities.classList.add("not-valid");
    activities.classList.remove("valid");
    activities.lastElementChild.style.display = "block";
  } else {
    activities.classList.add("valid");
    activities.classList.remove("not-valid");
    activities.lastElementChild.style.display = "none";
  }

// only check the card fields when credit card is selected
  if (payment.value === "credit-card") {
    // check the credit card number
    const creditCardValue = creditCardInput.value;
    const creditCardValid = /^\d{13,16}$/.test(creditCardValue);
    if (!creditCardValid) {
      event.preventDefault();
      creditCardInput.parentElement.classList.add("not-valid");
      creditCardInput.parentElement.classList.remove("valid");
      creditCardInput.parentElement.lastElementChild.style.display = "block";
    } else {
      creditCardInput.parentElement.classList.add("valid");
      creditCardInput.parentElement.classList.remove("not-valid");
      creditCardInput.parentElement.lastElementChild.style.display = "none";
    }

// check the zip code
    const zipValue = zipInput.value;
    const zipValid = /^\d{5}$/.test(zipValue);
    if (!zipValid) {
      event.preventDefault();
      zipInput.parentElement.classList.add("not-valid");
      zipInput.parentElement.classList.remove("valid");
      zipInput.parentElement.lastElementChild.style.display = "block";
    } else {
      zipInput.parentElement.classList.add("valid");
      zipInput.parentElement.classList.remove("not-valid");
      zipInput.parentElement.lastElementChild.style.display = "none";
    }

// check the cvv
    const cvvValue = cvvInput.value;
    const cvvValid = /^\d{3}$/.test(cvvValue);
    if (!cvvValid) {
      event.preventDefault();
      cvvInput.parentElement.classList.add("not-valid");
      cvvInput.parentElement.classList.remove("valid");
      cvvInput.parentElement.lastElementChild.style.display = "block";
    } else {
      cvvInput.parentElement.classList.add("valid");
      cvvInput.parentElement.classList.remove("not-valid");
      cvvInput.parentElement.lastElementChild.style.display = "none";
    }
  }
});

// accessibility
// loop through all of the activity checkboxes
for (let i = 0; i < activityCheckboxes.length; i++) {
// add the focus class when a checkbox gets focus
  activityCheckboxes[i].addEventListener("focus", (event) => {
    event.target.parentElement.classList.add("focus");
  });
// remove the focus class when the checkbox loses focus
  activityCheckboxes[i].addEventListener("blur", (event) => {
    event.target.parentElement.classList.remove("focus");
  });
}