const boxImage = document.querySelector("main > img");
const wonderButton = document.querySelector("main > button");
const messageBox = document.querySelector("main > div");
const linkButton = document.querySelector(".download-area > button");
const messageSection = document.querySelector("#message-paragraph");
const config = {
  redirectButton: false,
  downloadButton: false,
  link: "",
  message: "",
};

function init() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("r") && params.has("d")) {
    config.redirectButton = params.get("r") === "true" ? true : false;
    config.downloadButton = false;
  } else if (params.has("r") && !params.has("d")) {
    config.redirectButton = params.get("r") === "true" ? true : false;
    config.downloadButton = false;
  } else if (!params.has("r") && params.has("d")) {
    config.redirectButton = false;
    config.downloadButton = params.get("d") === "true" ? true : false;
  }

  config.link = params.get("l") ? params.get("l") : "";
  config.link = atob(config.link);

  config.message = params.get("m") ? params.get("m") : "";
  config.message = atob(config.message);
}

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

function activateRedirection(link) {
  linkButton.addEventListener("click", () => {
    removeDownloadText();
    createThanks("Redirecting in 3 seconds");
    makeDownloadButtonSmall();
    setTimeout(() => window.open(link, "_blank"), 3000);
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
  if (config.redirectButton) {
    activateRedirection(config.link);
  } else if (config.downloadButton) {
    activateAssetDownloading(config.link, "wonder-box-download.png");
  }
  console.log(config);

  if (config.message) {
    messageSection.innerHTML = config.message;
  } else {
    messageSection.innerHTML = "<p></p>";
  }

  setInterval(() => {
    generateStars(boxImage);
  }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  init();
  console.log(config);
});
