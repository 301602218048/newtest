// write code below
const header = document.getElementById("header");
const h3 = document.createElement("h3");
const text = document.createTextNode("Buy high quality organic fruits online");
h3.appendChild(text);
header.appendChild(h3);
const hh = document.querySelector("h3");
hh.style.fontStyle = "italic";

//next task
const para = document.createElement("p");
const text2 = document.createTextNode("Total fruits: 4");
para.appendChild(text2);

const divs = document.getElementsByTagName("div");
const secondDiv = divs[1];
const fruit = document.querySelector(".fruits");

para.id = "fruits-total";
secondDiv.insertBefore(para, fruit);
