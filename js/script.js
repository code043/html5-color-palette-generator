const liColors = document.querySelectorAll("li");
const list = document.querySelector(".color-list");
const color = document.querySelector("#color");
const inputText = document.querySelector(".hex-code-input");

inputText.addEventListener("keydown", (e) => {
  let codeHex = e.target.value;
  if (e.keyCode === 13) {
    if (codeHex.substring(0, 1) == "#") {
      if (
        codeHex.substring(1).length == 6 &&
        isHexadecimal(codeHex.substring(1))
      ) {
        console.log(isHexadecimal(codeHex.substring(1)));
        gerador(e.target.value.slice(1));
      }
    }
    inputText.value = "";
  }
});
color.value = "#714593";
const myColors = [
  "#714593",
  "#8155a3",
  "#9165b3",
  "#a175c3",
  "#b185d3",
  "#c195e3",
  "#d1a5f3",
  "#e1b5ff",
  "#f1c5ff",
  "#ffd5ff",
  "#ffe5ff",
  "#fff5ff",
];

liColors.forEach((c, i) => {
  c.style.background = myColors[i];
});
liColors.forEach((liColor) => {
  liColor.addEventListener("click", (e) => clickToCopy(e.target));
});
color.addEventListener("change", (e) => gerador(e.target.value.slice(1)));

function gerador(hex) {
  if (list.children.length > 0) {
    for (let lis in list) {
      if (list.firstChild) {
        list.firstChild.remove();
      }
    }
    geraLis(hex);
  } else {
    geraLis(hex);
  }
}

function setLimit(h) {
  if (h > 255) {
    return 255;
  } else {
    h = h + 8;
    if (h > 255) {
      return 255;
    } else {
      return h;
    }
  }
}
function formatter(s) {
  let j = s.toString(16);
  if (s.length < 2) {
    return `0${s.toString(j)}`;
  } else {
    return j;
  }
}

function geraLis(hex) {
  hex = hex.toLowerCase();
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  let n = r;
  let k = b;
  for (let i = 0; i < 30; i++) {
    r = setLimit(r);
    g = setLimit(g);
    b = setLimit(b);
    const li = document.createElement("li");

    li.style.background = `rgb(${parseInt(r)},${parseInt(g)},${parseInt(b)})`;
    li.textContent = `#${formatter(r)}${formatter(g)}${formatter(b)}`;
    li.addEventListener("click", (e) => clickToCopy(e.target));
    if (r == 255 && g == 255 && b == 255) {
      return;
    } else {
      list.append(li);
    }
  }
}

function clickToCopy(el) {
  let textToCopy = el.textContent;
  el.style.pointerEvents = "none";
  el.textContent = "Copied!";
  el.style.color = "#d83440";
  setTimeout(() => {
    el.textContent = textToCopy;
    el.style.color = "";
    el.style.pointerEvents = "auto";
  }, 1000);
  navigator.clipboard.writeText(textToCopy);
}
function isHexadecimal(str) {
  const regex = /^[0-9a-f]+$/i;
  return regex.test(str);
}
