const btnNext = document.querySelector(".btn-next");
const formPanel2 = document.querySelector(".form-panel_2");
const formPanel1 = document.querySelector(".form-panel_1");

btnNext.addEventListener("click", function () {
  formPanel1.classList.add("hide");
  formPanel2.classList.add("reveal");
});

console.log("hi");
