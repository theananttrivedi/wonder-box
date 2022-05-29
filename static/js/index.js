const boxImage = document.querySelector("main > img");
const wonderButton = document.querySelector("main > button");
const messageBox = document.querySelector("main > div");
function openBox() {
  boxImage.src = "static/images/box-1-opened.png";
}

function vanishWonderButton() {
  wonderButton.remove();
}

function displayMessage() {
  messageBox.classList.add("display-message");
}

function bringBoxPositionDownAndAnimate() {
  boxImage.classList.remove("bounce");
  boxImage.classList.add("down");
  //   boxImage.classList.add("bounce-down");
}

function throwPopper() {
  party.confetti(boxImage, {
    count: party.variation.range(60, 80),
    size: party.variation.range(1.2, 1.8),
  });
}

wonderButton.addEventListener("click", () => {
  openBox();
  vanishWonderButton();
  throwPopper();
  setTimeout(() => {
    bringBoxPositionDownAndAnimate();
    displayMessage();
  }, 2000);
});
