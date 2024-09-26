let accountBalance = 5000;
const history = [];

function donate(cardNumber) {
  const inputField = document.getElementById(`donation-input-${cardNumber}`);
  const donationAmount = parseFloat(inputField.value);
  const currentAmountElement = document.getElementById(`donation-amount-${cardNumber}`);

  if (isNaN(donationAmount) || donationAmount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }
  if (donationAmount > accountBalance) {
    alert("Insufficient account balance.");
    return;
  }

  accountBalance -= donationAmount;
  document.getElementById("account-balance").innerText = accountBalance;
  currentAmountElement.innerText = parseFloat(currentAmountElement.innerText) + donationAmount;

  // Add to history
  const date = new Date();
  history.push(`Donated ${donationAmount}BDT on ${date.toLocaleString()} `);
  updateHistory();

  // Show success modal
  document.getElementById("success-modal").classList.add("modal-open");
  inputField.value = '';
}

function updateHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.innerText = entry;
    historyList.appendChild(li);
  });
}

function closeModal() {
  document.getElementById("success-modal").classList.remove("modal-open");
}

document.getElementById("donation-button").addEventListener("click", function () {
  document.getElementById("donation-section").classList.remove("hidden");
  document.getElementById("history-section").classList.add("hidden");
  this.classList.add("active");
  document.getElementById("history-button").classList.remove("active");
});

document.getElementById("history-button").addEventListener("click", function () {
  document.getElementById("donation-section").classList.add("hidden");
  document.getElementById("history-section").classList.remove("hidden");
  this.classList.add("active");
  document.getElementById("donation-button").classList.remove("active");
});