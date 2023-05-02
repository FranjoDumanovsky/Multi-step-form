"use strict";

// Elements
const btnNext = document.querySelectorAll(".btn-next");
const btnBack = document.querySelectorAll(".btn-back");
const formPanels = [...document.querySelectorAll(".form-panel")];
const steps = [...document.querySelectorAll(".step")];

// Form elements on first panel that need validation
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

// Error message elements
const nameErrorMessage = document.querySelector(
  "input.form_name ~ .error-message"
);

const emailErrorMessage = document.querySelector(
  "input.form_email ~ .error-message"
);

const phoneErrorMessage = document.querySelector(
  "input.form_phone ~ .error-message"
);

const panelErrorMessage = document.querySelector(".panel-error-message");

// Check that all the necessary elements were found
if (btnNext.length === 0 || btnBack.length === 0 || formPanels.length === 0) {
  throw new Error("Could not find elements with the given selectors");
}

// Set initial validation status
let nameInputValidation = false;
let emailInputValidation = false;
let phoneInputValidation = false;

// Add event listeners to button-next and button-back
for (let i = 0, len = btnNext.length; i < len; i++) {
  btnNext[i].addEventListener("click", togglePanel);
  btnBack[i].addEventListener("click", togglePanel);
}

// Main function for toggling Panels
function togglePanel() {
  if (nameInputValidation && emailInputValidation && phoneInputValidation) {
    const currentIndex = formPanels.findIndex((panel) =>
      panel.classList.contains("active")
    );

    if (this.classList.contains("btn-next")) {
      if (currentIndex < formPanels.length - 1) {
        formPanels[currentIndex].classList.remove("active");
        formPanels[currentIndex + 1].classList.add("active");
        steps[currentIndex].classList.remove("active");
        steps[currentIndex + 1].classList.add("active");
      }
    } else if (this.classList.contains("btn-back")) {
      if (currentIndex > 0) {
        formPanels[currentIndex].classList.remove("active");
        formPanels[currentIndex - 1].classList.add("active");
        steps[currentIndex].classList.remove("active");
        steps[currentIndex - 1].classList.add("active");
      }
    }
    panelErrorMessage.style.display = "none";
  } else {
    panelErrorMessage.style.display = "block";
  }
}

// Add event listeners to the input fields to validate on blur
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);

// Validate Name
function validateName() {
  const nameValue = nameInput.value.trim();
  nameInputValidation = false;

  if (nameValue === "") {
    nameErrorMessage.textContent = "This field is required!";
  } else if (!isValidName(nameValue)) {
    nameErrorMessage.textContent = "Name must contain only letters and spaces";
  } else if (nameValue.length < 2) {
    nameErrorMessage.textContent = "Name must be at least 2 characters long";
  } else if (nameValue.length > 20) {
    nameErrorMessage.textContent = "Name must be less than 20 characters long";
  } else {
    nameErrorMessage.textContent = "";
    nameInputValidation = true;
  }
}

function isValidName(name) {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
}

// Validate E-mail
function validateEmail() {
  emailInputValidation = false;
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailErrorMessage.textContent = "This field is required!";
  } else if (!isValidEmail(emailValue)) {
    emailErrorMessage.textContent = "Please enter a valid email address";
  } else if (emailValue.length < 5) {
    nameErrorMessage.textContent = "Name must be at least 5 characters long";
  } else {
    emailErrorMessage.textContent = "";
    emailInputValidation = true;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Phone
function validatePhone() {
  const phoneValue = phoneInput.value.trim();
  phoneInputValidation = false;
  if (phoneValue === "") {
    phoneErrorMessage.textContent = "This field is required!";
  } else if (!isValidPhone(phoneValue)) {
    phoneErrorMessage.textContent = "Please enter a valid phone number";
  } else {
    phoneErrorMessage.textContent = "";
    phoneInputValidation = true;
  }
}

function isValidPhone(phone) {
  const phoneRegex = /^(\+\d{1,3})?[\d- ]{8,}$/;
  return phoneRegex.test(phone);
}

const info = {
  monthlySub: {
    plans: {
      arcade: {
        name: "Arcade",
        string: "$9/mo",
        value: 9,
      },
      advanced: {
        name: "Advanced",
        string: "$12/mo",
        value: 12,
      },
      professional: {
        name: "Pro",
        string: "$15/mo",
        value: 15,
      },
    },
    addons: {
      onlineService: {
        name: "Online service",
        string: "+$1/mo",
        value: 1,
      },
      largeStorage: {
        name: "Large storage",
        string: "+$2/mo",
        value: 2,
      },
      customizableProfile: {
        name: "Customizable profile",
        string: "+$2/mo",
        value: 2,
      },
    },
  },
  yearlySub: {
    plans: {
      arcade: {
        name: "Arcade",
        string: "$90/yr",
        value: 90,
      },
      advanced: {
        name: "Advanced",
        string: "$120/yr",
        value: 120,
      },
      professional: {
        name: "Pro",
        string: "$150/yr",
        value: 150,
      },
    },
    addons: {
      onlineService: {
        name: "Online service",
        string: "+$10/yr",
        value: 10,
      },
      largeStorage: {
        name: "Large storage",
        string: "+$20/yr",
        value: 20,
      },
      customizableProfile: {
        name: "Customizable profile",
        string: "+$20/yr",
        value: 20,
      },
    },
  },
};

const planInputs = document.getElementsByName("plan");
const planWrapper = document.querySelector(".plan-wrapper");
let planName;
let planPrice;

function splitValues() {
  // loop through radio inputs to find the checked one
  for (let i = 0; i < planInputs.length; i++) {
    if (planInputs[i].checked) {
      // split value and update variables
      const splitPlanValues = planInputs[i].value.split(",");
      planName = splitPlanValues[0];
      planPrice = splitPlanValues[1];
      console.log(planName, planPrice);
      break; // exit loop after finding checked input
    }
  }
}

// attach event listener to parent element
planWrapper.addEventListener("change", function () {
  splitValues();
  changeSubType();
});

const planToggler = document.querySelector(".checkbox");
const planDiscount = document.querySelectorAll(".plan-discount");

planToggler.addEventListener("click", function () {
  changePrices();
  changeAttrValues();
  splitValues();
  changeSubType();
  addAddon();
  renderAddons();

  if (planToggler.checked) {
    for (let i = 0; i < planDiscount.length; i++) {
      planDiscount[i].style.display = "block";
    }
  } else {
    for (let i = 0; i < planDiscount.length; i++) {
      planDiscount[i].style.display = "none";
    }
  }
});

const arcadeInputEl = document.getElementById("arcade-input-el");
const arcadePlanTitleEl = document.getElementById("arcade-plan-title-el");
const arcadePlanPriceEl = document.getElementById("arcade-plan-price-el");

const advancedInputEl = document.getElementById("advanced-input-el");
const advancedPlanTitleEl = document.getElementById("advanced-plan-title-el");
const advancedPlanPriceEl = document.getElementById("advanced-plan-price-el");

const professionalInputEl = document.getElementById("professional-input-el");
const professionalPlanTitleEl = document.getElementById(
  "professional-plan-title-el"
);
const professionalPlanPriceEl = document.getElementById(
  "professional-plan-price-el"
);

// Online Services add-on
const onlineServicesPriceEl = document.getElementById(
  "online-services-price-el"
);
const onlineServicesInputEl = document.getElementById(
  "online-services-input-el"
);

// Larger Storage Price add-on

const largerStoragePrice = document.getElementById("larger-storage-price-el");
const largerStorageInputEl = document.getElementById("larger-storage-input-el");

// Customizable Profile add-on
const customizableProfilePrice = document.getElementById(
  "customizable-profile-price-el"
);
const customizableProfileInputEl = document.getElementById(
  "customizable-profile-input-el"
);

function changeAttrValues() {
  if (planToggler.checked) {
    arcadeInputEl.value = `${info.yearlySub.plans.arcade.name},${info.yearlySub.plans.arcade.string}`;
    advancedInputEl.value = `${info.yearlySub.plans.advanced.name},${info.yearlySub.plans.advanced.string}`;
    professionalInputEl.value = `${info.yearlySub.plans.professional.name},${info.yearlySub.plans.professional.string}`;

    onlineServicesInputEl.value = `${info.yearlySub.addons.onlineService.name},${info.yearlySub.addons.onlineService.string}`;
    largerStorageInputEl.value = `${info.yearlySub.addons.largeStorage.name},${info.yearlySub.addons.largeStorage.string}`;
    customizableProfileInputEl.value = `${info.yearlySub.addons.customizableProfile.name},${info.yearlySub.addons.customizableProfile.string}`;
  } else {
    arcadeInputEl.value = `${info.monthlySub.plans.arcade.name},${info.monthlySub.plans.arcade.string}`;
    advancedInputEl.value = `${info.monthlySub.plans.advanced.name},${info.monthlySub.plans.advanced.string}`;
    professionalInputEl.value = `${info.monthlySub.plans.professional.name},${info.monthlySub.plans.professional.string}`;

    onlineServicesInputEl.value = `${info.monthlySub.addons.onlineService.name},${info.monthlySub.addons.onlineService.string}`;
    largerStorageInputEl.value = `${info.monthlySub.addons.largeStorage.name},${info.monthlySub.addons.largeStorage.string}`;
    customizableProfileInputEl.value = `${info.monthlySub.addons.customizableProfile.name},${info.monthlySub.addons.customizableProfile.string}`;
  }
}

let planSubType;
let summaryTotalType;
const summaryPlanTitle = document.querySelector(".summary-plan-title");
const summaryInfoPlanPrice = document.querySelector(".summary-info-plan-price");
const totalPriceTitleEl = document.querySelector(".summary-total-title");
const totalPrice = document.querySelector(".summary-total-price");

function changeSubType() {
  if (planToggler.checked) {
    planSubType = "(Yearly)";
    summaryTotalType = "Total (per Year)";
  } else {
    planSubType = "(Monthly)";
    summaryTotalType = "Total (per Month)";
  }
  summaryPlanTitle.textContent = `${planName} ${planSubType}`;
  summaryInfoPlanPrice.textContent = planPrice;
  totalPriceTitleEl.textContent = summaryTotalType;
}

function changePrices() {
  if (planToggler.checked) {
    /* YEARLY */
    /* PLANS */

    // Arcade
    arcadePlanTitleEl.textContent = info.yearlySub.plans.arcade.name;
    arcadePlanPriceEl.textContent = info.yearlySub.plans.arcade.string;

    // Advanced
    advancedPlanTitleEl.textContent = info.yearlySub.plans.advanced.name;
    advancedPlanPriceEl.textContent = info.yearlySub.plans.advanced.string;

    //Professional
    professionalPlanTitleEl.textContent =
      info.yearlySub.plans.professional.name;
    professionalPlanPriceEl.textContent =
      info.yearlySub.plans.professional.string;

    /* ADDONS */
    onlineServicesPriceEl.textContent =
      info.yearlySub.addons.onlineService.string;
    customizableProfilePrice.textContent =
      info.yearlySub.addons.customizableProfile.string;
    largerStoragePrice.textContent = info.yearlySub.addons.largeStorage.string;
  } else {
    /* MONTHLY */
    /* PLANS */
    // Arcade

    arcadePlanTitleEl.textContent = info.monthlySub.plans.arcade.name;
    arcadePlanPriceEl.textContent = info.monthlySub.plans.arcade.string;

    // Advanced
    advancedPlanTitleEl.textContent = info.monthlySub.plans.advanced.name;
    advancedPlanPriceEl.textContent = info.monthlySub.plans.advanced.string;

    //Professional
    professionalPlanTitleEl.textContent =
      info.monthlySub.plans.professional.name;
    professionalPlanPriceEl.textContent =
      info.monthlySub.plans.professional.string;

    /* ADDONS */
    onlineServicesPriceEl.textContent =
      info.monthlySub.addons.onlineService.string;
    customizableProfilePrice.textContent =
      info.monthlySub.addons.customizableProfile.string;
    largerStoragePrice.textContent = info.monthlySub.addons.largeStorage.string;
  }
}

// Summary

let addons = [];

const renderElement = ({ type, props = {} }, container) => {
  const isTextElement = !type;
  const element = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  const isListener = (p) => p.startsWith("on");
  const isAttribute = (p) => !isListener(p) && p !== "children";

  Object.keys(props).forEach((p) => {
    if (isAttribute(p)) element[p] = props[p];
    if (!isTextElement && isListener(p))
      element.addEventListener(p.toLowerCase().slice(2), props[p]);
  });

  if (!isTextElement && props.children && props.children.length)
    props.children.forEach((childElement) =>
      renderElement(childElement, element)
    );

  container.appendChild(element);
};

const addonInputs = document.getElementsByName("addon");
const addonWrapper = document.querySelector(".add-ons-wrapper");
const summaryAddons = document.querySelector(".summary-add-ons");
let addonValueArr = [];

function addAddon() {
  summaryAddons.innerHTML = "";
  addons = [];

  const addonsInfo = [
    {
      title: info.yearlySub.addons.onlineService.name,
      price: planToggler.checked
        ? info.yearlySub.addons.onlineService.string
        : info.monthlySub.addons.onlineService.string,
      value: planToggler.checked
        ? info.yearlySub.addons.onlineService.value
        : info.monthlySub.addons.onlineService.value,
      shouldRender: true,
    },
    {
      title: info.yearlySub.addons.largeStorage.name,
      price: planToggler.checked
        ? info.yearlySub.addons.largeStorage.string
        : info.monthlySub.addons.largeStorage.string,
      value: planToggler.checked
        ? info.yearlySub.addons.largeStorage.value
        : info.monthlySub.addons.largeStorage.value,
      shouldRender: false,
    },
    {
      title: info.yearlySub.addons.customizableProfile.name,
      price: planToggler.checked
        ? info.yearlySub.addons.customizableProfile.string
        : info.monthlySub.addons.customizableProfile.string,
      value: planToggler.checked
        ? info.yearlySub.addons.customizableProfile.value
        : info.monthlySub.addons.customizableProfile.value,
      shouldRender: false,
    },
  ];

  // loop through radio inputs to find the checked one
  for (let i = 0; i < addonInputs.length; i++) {
    if (addonInputs[i].checked) {
      addonsInfo[i].shouldRender = true;
    } else {
      addonsInfo[i].shouldRender = false;
    }
  }

  addonValueArr = [];
  let total = 0;

  for (let i = 0; i < addonsInfo.length; i++) {
    if (addonsInfo[i].shouldRender) {
      addonValueArr.push(addonsInfo[i].value);
    }
  }

  for (let i = 0; i < addonValueArr.length; i++) {
    total += addonValueArr[i];
  }

  total += parseInt(planPrice.match(/\d/g).join(""));
  totalPrice.textContent = total;

  addonsInfo.forEach((addon) => {
    if (addon.shouldRender) {
      addons.push({
        type: "span",
        props: {
          className: "summary-add-on",
          children: [
            {
              type: "span",
              props: {
                className: "add-on-title",
                children: [{ props: { nodeValue: addon.title } }],
              },
            },
            {
              type: "span",
              props: {
                className: "add-on-price",
                children: [{ props: { nodeValue: addon.price } }],
              },
            },
          ],
        },
      });
    }
  });
}

function renderAddons() {
  addons.forEach((addon) => renderElement(addon, summaryAddons));
}
// attach event listener to parent element
addonWrapper.addEventListener("change", function () {
  addAddon();
  renderAddons();
});

//Initialisation
changeAttrValues();
changePrices();
splitValues();

addAddon();
renderAddons();
changeSubType();
