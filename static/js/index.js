const boxImage = document.querySelector("main > img");
const wonderButton = document.querySelector("main > button");
const messageBox = document.querySelector("main > div");
const linkButton = document.querySelector(".download-area > button");

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

function generateStars(selector) {
  party.sparkles(selector, {
    count: party.variation.range(1, 2),
    size: party.variation.range(1.2, 1.8),
  });
}

// function stopLinkBehaviour() {

// }

function activateRedirection(link) {
  linkButton.addEventListener("click", () => {
    window.open(link, "_blank");
  });
}

function download(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function makeDownloadButtonSmall() {
  linkButton.classList.remove("show-full");
  linkButton.classList.add("download-button-small");
  linkButton.innerHTML = "Download Again!";
}

function createThanks(message) {
  const p = document.createElement("p");
  p.innerText = message;
  messageBox.insertBefore(p, document.querySelector(".download-area"));
}

function removeDownloadText() {
  document.querySelector(".download-button-text").remove();
}

function activateAssetDownloading(link, name) {
  linkButton.addEventListener("click", () => {
    // linkButton.setAttribute("href", link);
    // linkButton.setAttribute("download", name);
    download(link);
    removeDownloadText();
    createThanks("Hope you'll like it!");
    makeDownloadButtonSmall();
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
  activateRedirection("https://www.google.com");
  //   activateAssetDownloading(config.link, "wonder-box-download.png");
  setInterval(() => {
    generateStars(boxImage);
  }, 500);
});
