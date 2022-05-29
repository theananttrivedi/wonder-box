const form = document.querySelector("form");
const m = document.querySelector('[name="m"]');
const l = document.querySelector('[name="l"]');
const r = document.querySelector('[name="r"]');
function stringToBase64(string) {
  return btoa(string);
}

function base64ToUrlEncode(string) {
  return encodeURIComponent(string);
}

function makeStringToURLQueryValue(string) {
  let encoded = stringToBase64(string);
  return base64ToUrlEncode(encoded);
}

function createURL(url, keys, values) {
  const myUrl = new URL(url);
  keys.map((key, i) => {
    myUrl.searchParams.append(key, makeStringToURLQueryValue(values[i]));
  });
  return myUrl.href;
}

function createURL2(url) {
  myUrl = new URL(url);
  if (r.value === "true") {
    myUrl.searchParams.append("r", r.value);
  } else {
    myUrl.searchParams.append("d", "true");
  }
  myUrl.searchParams.append("m", stringToBase64(m.value));
  myUrl.searchParams.append("l", stringToBase64(l.value));
  return myUrl.href;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = createURL2(window.location.href);

  const p = document.createElement("p");
  p.innerText = url;
  document.body.appendChild(p);
  navigator.clipboard.writeText(url);
});
