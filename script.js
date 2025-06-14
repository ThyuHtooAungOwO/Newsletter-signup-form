document.addEventListener("DOMContentLoaded", () => {
  const newsletterContainer = document.querySelector(".newsletter-container");
  const signupCard = document.getElementById("signupCard");
  const successCard = document.getElementById("successCard");
  const signupForm = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const emailErrorMessage = document.getElementById("emailErrorMessage");
  const subscribedEmailSpan = document.getElementById("subscribedEmail");
  const dismissButton = document.getElementById("dismissButton");

  function showEmailError(message) {
    emailInput.classList.add("error");
    emailInput.setAttribute("aria-invalid", "true");
    emailErrorMessage.textContent = message;
    emailErrorMessage.classList.remove("hidden");
    emailInput.focus();
  }

  function clearEmailError() {
    emailInput.classList.remove("error");
    emailInput.setAttribute("aria-invalid", "false");
    emailErrorMessage.classList.add("hidden");
    emailErrorMessage.textContent = "Please enter a valid email address";
  }

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function setUIState(state, email = "") {
    if (state === "signup") {
      signupCard.classList.remove("hidden");
      successCard.classList.add("hidden");
      newsletterContainer.classList.remove("success-state");
      emailInput.focus();
    } else {
      signupCard.classList.add("hidden");
      successCard.classList.remove("hidden");
      newsletterContainer.classList.add("success-state");
      subscribedEmailSpan.textContent = email;
      dismissButton.focus();
    }
  }

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (email === "") {
      showEmailError("Please enter your email address");
    } else if (!isValidEmail(email)) {
      showEmailError("Please enter a valid email");
    } else {
      clearEmailError();
      emailInput.value = "";
      setUIState("success", email);
    }
  });

  emailInput.addEventListener("input", clearEmailError);

  dismissButton.addEventListener("click", () => {
    setUIState("signup");
    clearEmailError();
  });
});
