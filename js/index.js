const btnNext = document.querySelectorAll(".btn-next");
const btnBack = document.querySelectorAll(".btn-back");
const formPanels = [...document.querySelectorAll(".form-panel")];

if (btnNext.length === 0 || btnBack.length === 0 || formPanels.length === 0) {
  throw new Error("Could not find elements with the given selectors");
}

for (let i = 0, len = btnNext.length; i < len; i++) {
  btnNext[i].addEventListener("click", togglePanel);
  btnBack[i].addEventListener("click", togglePanel);
}

function togglePanel() {
  const currentIndex = formPanels.findIndex((panel) =>
    panel.classList.contains("active")
  );
  if (this.classList.contains("btn-next")) {
    if (currentIndex < formPanels.length - 1) {
      formPanels[currentIndex].classList.remove("active");
      formPanels[currentIndex + 1].classList.add("active");
    }
  } else if (this.classList.contains("btn-back")) {
    if (currentIndex > 0) {
      formPanels[currentIndex].classList.remove("active");
      formPanels[currentIndex - 1].classList.add("active");
    }
  }
}
