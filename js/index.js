// transações ficticias cadastradas (criadas manualmente)
var transactions = 
JSON.parse(localStorage.getItem("@ewallet/transactions"))||[];


// Adiciona o corpo da tabela na variavel table
var table = document.querySelector("#table tbody");

//Mapeamento das transações
transactions.map((transaction) => {
  var row = document.createElement("tr");
  // <tr>
  //  <td>Desenvolvimento</td>
  // </tr>

  var title = document.createElement("td");
  title.append(transaction.title);

  var price = document.createElement("td");
  var value = moneyFormat(transaction.currency, transaction.price);
  price.append(value);

  var category = document.createElement("td");
  category.append(transaction.category);

  var date = document.createElement("td");
  date.append(transaction.date);

  row.appendChild(title);
  row.appendChild(price);
  row.appendChild(category);
  row.appendChild(date);

  table.appendChild(row);
});

var addBtn = document.querySelector("#addButton a");
var popup = document.querySelector("#popupbackground");
var closeBtn = document.querySelector("#popup form a");
var form = document.querySelector("form");

addBtn.addEventListener("click", () => {
  // O que vai acontecer quando clicar no botão adicionar
  popup.style.display = "flex";
  popup.style.transition = "display 5s";
});

closeBtn.addEventListener("click", () => {
  // O que vai acontecer quando clicar no botão fechar
  popup.style.display = "none";
  popup.style.transition = "display 5s";
  form.reset();
});

form.addEventListener("submit", (event) => {
  //Previne para que a tela não recarregue
  event.preventDefault();

  //Capturar os dados preenchidos no formulário
  var data = new FormData(event.target);

  //Desestrururar os dados em variáveis
  var { title, price, category, currency, identifier } =
    Object.fromEntries(data);
  //Pegar a data atual no formato DD/MM/YYYY
  var date = new Date().toLocaleDateString();

  var transaction = {
    title,
    price: parseFloat(price),
    category,
    currency, 
    identifier,
    id: transactions.length + 1,
    date
  }
  transactions.push(transaction)
  localStorage.setItem("@ewallet/transactions", JSON.stringify(transactions));
  window.location.reload();
});

var entrada = document.querySelector(".in h1")
var saida = document.querySelector(".out h1")
var total = document.querySelector(".total h1")

var valoresEntrada = transactions.reduce((count, currentValue)=> {
if(currentValue.category === "entrada"){
  return count + currentValue.price;
}else {
  return count;
}
}, 0)

var valoresSaida = transactions.reduce((count, currentValue)=> {
if(currentValue.category === "saida"){
  return count + currentValue.price;
}else {
  return count;
}
}, 0)

var somatorio = valoresEntrada - valoresSaida

entrada.innerHTML = moneyFormat("BRL", valoresEntrada)
saida.innerHTML = moneyFormat("BRL", valoresSaida)
total.innerHTML = moneyFormat("BRL", somatorio)

// Métodos ou Funções
function moneyFormat(currency, price) {
  var value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(price);
  return value;
}



