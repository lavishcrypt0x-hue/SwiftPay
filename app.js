let balanceVisible = true;

function showScreen(screenId, navButton) {

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


function showToast(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


function openProfile() {
  showScreen("profileScreen");

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  document.querySelectorAll(".nav-item")[4].classList.add("active");
}


function sendMoney() {

  const name = prompt(
    "DEMO — Enter recipient name:"
  );

  if (!name) {
    return;
  }

  const amount = prompt(
    "DEMO — Enter amount:"
  );

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    showToast("Invalid amount");
    return;
  }

  showToast(
    `Demo payment of ₹${Number(amount).toLocaleString("en-IN")} to ${name}`
  );

  setTimeout(() => {

    alert(
      "DEMO PAYMENT SUCCESSFUL\n\n" +
      "Recipient: " + name + "\n" +
      "Amount: ₹" + Number(amount).toLocaleString("en-IN") +
      "\n\nNo real money was transferred."
    );

  }, 600);
}


/* PWA SERVICE WORKER */

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("sw.js")
      .catch(error => {
        console.log("Service Worker:", error);
      });

  });

}
