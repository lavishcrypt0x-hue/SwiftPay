let balanceVisible = true;


/* ---------------------------
   SCREEN NAVIGATION
---------------------------- */

function showScreen(screenId, navButton = null) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const screen = document.getElementById(screenId);

  if (screen) {
    screen.classList.add("active");
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  if (navButton) {
    navButton.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ---------------------------
   BALANCE
---------------------------- */

function toggleBalance() {

  const balance = document.getElementById("balance");

  if (balanceVisible) {

    balance.textContent = "₹ ••••••";

    balanceVisible = false;

  } else {

    balance.textContent = "₹25,480.00";

    balanceVisible = true;

  }
}


/* ---------------------------
   TOAST
---------------------------- */

function showToast(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


/* ---------------------------
   PROFILE
---------------------------- */

function openProfile() {

  showScreen("profileScreen");

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  document.querySelectorAll(".nav-item")[4]
    .classList.add("active");
}


/* ---------------------------
   MODALS
---------------------------- */

function openModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.add("show");
  }
}


function closeModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("show");
  }
}


/* ---------------------------
   SEND MONEY
---------------------------- */

function openSendMoney() {

  openModal("sendModal");

}


function processPayment() {

  const recipient =
    document.getElementById("recipientInput").value.trim();

  const amount =
    Number(document.getElementById("amountInput").value);

  const note =
    document.getElementById("noteInput").value.trim();


  if (!recipient) {

    showToast("Enter recipient");

    return;

  }


  if (!amount || amount <= 0) {

    showToast("Enter a valid amount");

    return;

  }


  closeModal("sendModal");


  showToast("Processing demo payment...");


  setTimeout(() => {

    alert(
      "DEMO PAYMENT SUCCESSFUL\n\n" +
      "Recipient: " + recipient +
      "\nAmount: ₹" +
      amount.toLocaleString("en-IN") +
      (note ? "\nNote: " + note : "") +
      "\n\nNo real money was transferred."
    );

  }, 1000);


  document.getElementById("recipientInput").value = "";
  document.getElementById("amountInput").value = "";
  document.getElementById("noteInput").value = "";

}


/* ---------------------------
   RECEIVE
---------------------------- */

function openReceive() {

  openModal("receiveModal");

}


/* ---------------------------
   REQUEST
---------------------------- */

function openRequest() {

  openModal("requestModal");

}


function processRequest() {

  const person =
    document.getElementById("requestPerson").value.trim();

  const amount =
    Number(document.getElementById("requestAmount").value);


  if (!person) {

    showToast("Enter person or UPI ID");

    return;

  }


  if (!amount || amount <= 0) {

    showToast("Enter a valid amount");

    return;

  }


  closeModal("requestModal");


  showToast("Demo payment request created");


  setTimeout(() => {

    alert(
      "DEMO REQUEST CREATED\n\n" +
      "From: " + person +
      "\nAmount: ₹" +
      amount.toLocaleString("en-IN")
    );

  }, 500);


  document.getElementById("requestPerson").value = "";
  document.getElementById("requestAmount").value = "";

}


/* ---------------------------
   SCANNER
---------------------------- */

function openScanner() {

  openModal("scannerModal");

}


function simulateScan() {

  showToast("Demo QR detected");

  setTimeout(() => {

    closeModal("scannerModal");

    openSendMoney();

    document.getElementById("recipientInput").value =
      "merchant@swiftpay";

  }, 800);

}


/* ---------------------------
   CLOSE MODALS WHEN CLICKING
   OUTSIDE THE BOX
---------------------------- */

document.querySelectorAll(".modal").forEach(modal => {

  modal.addEventListener("click", event => {

    if (event.target === modal) {

      modal.classList.remove("show");

    }

  });

});


/* ---------------------------
   SERVICE WORKER
---------------------------- */

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("SwiftPay Service Worker registered.");
      })
      .catch(error => {
        console.log(
          "Service Worker registration failed:",
          error
        );
      });

  });

}
