let scrolll = document.getElementById("scrolll");

onscroll = function () {
  if (scrollY >= 350) {
    scrolll.classList.remove("hide");
  } else {
    scrolll.classList.add("hide");
  }
};

scrolll.onclick = function () {
  scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let titleee = document.getElementById("titleee");
let category = document.getElementById("category");
let count = document.getElementById("count");
let result = document.getElementById("result");
let creat = document.getElementById("creat");

//? La somme:
function TheTotal() {
  if (price.value != "") {
    let all = +price.value + +taxes.value + +ads.value - +discount.value;
    result.innerHTML = all;
    result.style.backgroundColor = "green";
  } else {
    result.innerHTML = "";
    result.style.color = "2c043c";
  }
}

//! Creat:
var AllTheResult = [];

if (localStorage.getItem("producsts") != null) {
  AllTheResult = JSON.parse(localStorage.getItem("producsts"));
}

function clearData() {
  titleee.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  result.innerHTML = "";
}

creat.onclick = function () {
  let ObjetctValue = {
    titleee: titleee.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
    result: result.innerHTML,
  };

  AllTheResult.push(ObjetctValue);
  localStorage.setItem("producsts", JSON.stringify(AllTheResult));
  clearData();
  readData();
};

//! Read:
function readData() {
  let table = "";

  if (AllTheResult?.length) {
    for (i = 0; i < AllTheResult.length; i++) {
      {
        table += `<tr>
                <td>${i}</td>
                <td>${AllTheResult[i].titleee}</td>
                <td>${AllTheResult[i].price}</td>
                <td>${AllTheResult[i].taxes}</td>
                <td>${AllTheResult[i].ads}</td>
                <td>${AllTheResult[i].discount}</td>
                <td>${AllTheResult[i].result}</td>
                <td>${AllTheResult[i].category}</td>
                <td>
                  <button  class="MudiumButton" id="update">update</button>
                </td>
                <td>
                  <button onclick="deleteItem(${i})" class="MudiumButton" id="delete">delete</button>
                </td>
              </tr>`;
      }
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDeleteAll = document.getElementById("btnDeleteAll");
    btnDeleteAll.innerHTML = `
        <button onclick="deleteall()" 
        class="LongButton" id="da">
        DELETE ALL
      </button>;`;
  } else {
    btnDeleteAll.innerHTML = "";
    document.getElementById("tbody").innerHTML = "";
  }
}

//! Delete:
function deleteItem(i) {
  AllTheResult.splice(i, 1);
  localStorage.setItem("producsts", JSON.stringify(AllTheResult));
  readData();
}

function deleteall() {
  localStorage.removeItem("producsts");
  AllTheResult = [];
  readData();
}

readData();
