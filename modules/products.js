import { addBeerArray, orderArray } from "./addRemoveBeer";
import { removeBeerArray } from "./addRemoveBeer";
import { showPopUp } from "./showPopUp";
import { updatedArray } from "./theBar/bottom";
import { fetchJson } from "./fetchJson";
import { updateUrl, url } from "./consts";
import { staticArray, updatedCheckArray } from "main";

let notAvaliable = [];
let Avaliable = [];

export function checkBeerArray(updatedCheckArray) {
  let check = updatedCheckArray.taps;
  console.log(notAvaliable, check);

  notAvaliable.forEach((e) => {
    const exists = notAvaliable.find((x) => x.name === check.beer);

    if (exists) {
      console.log(e.name + " TIME FOR UPDATE");
    } else {
      console.log(e.name + " everythings fine");
    }
  });
}

export function filterBeerArrays(staticArray, updatedCheckArray) {
  notAvaliable = [];
  Avaliable = [];
  console.log(staticArray, updatedCheckArray);

  updatedCheckArray = updatedCheckArray.taps;
  console.log(updatedCheckArray);

  staticArray.forEach((e) => {
    const exists = updatedCheckArray.find((x) => x.beer === e.name);

    if (exists) {
      console.log(e.name + " does exist");
      Avaliable.push(e);
    } else {
      console.log(e.name + " does NOT exist");
      notAvaliable.push(e);
    }
  });

  console.log(notAvaliable);
  console.log(Avaliable);

  //const cloneNotAvaliable = document.querySelector("notAvaliable").cloneNode(true).content;
  //const panretNotAvaliable = document.querySelector(".notAvaliable-container");
  document.querySelector("#notAvaliable > .container").innerHTML = "";
  document.querySelector("#avaliable > .container").innerHTML = "";
  Avaliable.forEach(displayAvaliable);
  notAvaliable.forEach(displayNotAvaliable);

  //staticArray.forEach(displayBeer(staticArray, updatedCheckArray));
}

function displayAvaliable(beer) {
  const clone = document.querySelector("template.avaliable").cloneNode(true).content;
  const parent = document.querySelector("#avaliable > .container");

  // console.log(beer);
  let article = beer.name.trim().toLowerCase();
  // console.log(article);
  let firstSpace = article.indexOf(" ");
  let firstName = article.substring(0, firstSpace);
  let lastSpace = article.lastIndexOf(" ");
  let lastName = article.substring(lastSpace + 1, article.length);
  let middleName = article.substring(firstSpace + 1, lastSpace);
  if (middleName == " ") {
    middleName = "";
  }
  article = firstName + middleName + lastName;

  clone.querySelector("article").id = article;
  clone.querySelector("article").dataset.name = beer.name;
  clone.querySelector("article .product").addEventListener("click", () => {
    showPopUp(beer);
  });
  clone.querySelector("h1").textContent = beer.name;
  clone.querySelector("p").textContent = "Alcohol " + beer.alc + "%";

  clone.querySelector(".count").dataset.count = "0";

  clone.querySelector(".fa-plus").addEventListener("click", () => {
    plusBeer(article);
  });
  clone.querySelector(".fa-minus").addEventListener("click", () => {
    minusBeer(article);
  });
  // console.log(beer.label);
  clone.querySelector("img").src = "imgs/" + beer.label;
  //clone.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  parent.appendChild(clone);
}

function displayNotAvaliable(beer) {
  const clone = document.querySelector("template.notAvaliable").cloneNode(true).content;
  const parent = document.querySelector("#notAvaliable > .container");

  // console.log(beer);
  let article = beer.name.trim().toLowerCase();
  // console.log(article);
  let firstSpace = article.indexOf(" ");
  let firstName = article.substring(0, firstSpace);
  let lastSpace = article.lastIndexOf(" ");
  let lastName = article.substring(lastSpace + 1, article.length);
  let middleName = article.substring(firstSpace + 1, lastSpace);
  if (middleName == " ") {
    middleName = "";
  }
  article = firstName + middleName + lastName;

  clone.querySelector("article").id = article;
  clone.querySelector("article").dataset.name = beer.name;
  clone.querySelector("article .desc-container").addEventListener("click", () => {
    showPopUp(beer);
  });
  clone.querySelector("h1").textContent = beer.name;
  clone.querySelector("p").textContent = "Alcohol " + beer.alc + "%";

  clone.querySelector(".count").textContent = "Unavaliable";

  clone.querySelector(".fa-plus").style.display = "none";
  clone.querySelector(".fa-minus").style.display = "none";

  // console.log(beer.label);
  clone.querySelector("img").src = "imgs/" + beer.label;
  //clone.querySelector(".img").style.backgroundImage = "url('/imgs/" + [beer.label] + "')";
  parent.appendChild(clone);
}

function plusBeer(article) {
  let beerCounter;

  const element = document.querySelector("#" + [article]);
  const elementCount = element.querySelector(".count");
  const dataCount = element.querySelector(".count").dataset.count;

  beerCounter = dataCount;
  beerCounter++;

  element.querySelector(".count").dataset.count = beerCounter;

  elementCount.textContent = beerCounter;

  // console.log(element.querySelector(".count").dataset);
  addBeerArray(element.dataset.name, beerCounter);
}

function minusBeer(article) {
  let beerCounter;
  // console.log(beerCounter);
  const element = document.querySelector("#" + [article]);
  const elementCount = element.querySelector(".count");
  const dataCount = element.querySelector(".count").dataset.count;
  beerCounter = dataCount;
  //console.log(beerCounter);

  if (beerCounter > 0) {
    beerCounter--;
  }

  // console.log(beerCounter);
  element.querySelector(".count").dataset.count = beerCounter;
  elementCount.textContent = beerCounter;
  //console.log(element.querySelector(".count").dataset);

  removeBeerArray(element.dataset.name, beerCounter);
}
