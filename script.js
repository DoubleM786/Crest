const form = document.querySelector("#audit-form");
const result = document.querySelector(".form-result");
const modal = document.querySelector("#account-modal");
const accountForm = document.querySelector("#account-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const business = document.querySelector("#business").value.trim();
  const website = document.querySelector("#website").value.trim();
  const companyEmail = document.querySelector("#company-email").value.trim();
  const password = document.querySelector("#registration-password").value;

  if (!business || !website || !companyEmail || password.length < 8) {
    result.textContent = "Add your company email and an 8-character password to continue.";
    return;
  }

  const plan = document.querySelector("#plan").value;
  const provider = document.querySelector(".payment-choice.active").dataset.provider;
  const planLabel = plan === "growth" ? "Growth trial" : plan === "studio" ? "Studio" : "free score";
  result.textContent = `Account created for ${companyEmail}. We're preparing ${business}'s ${planLabel} via ${provider}.`;
  form.querySelector("button[type='submit']").textContent = "Account created ✓";
});

document.querySelectorAll("[data-modal]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#account-email").focus();
  });
});

document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

document.querySelectorAll(".payment-choice").forEach((choice) => {
  choice.addEventListener("click", () => {
    document.querySelectorAll(".payment-choice").forEach((item) => item.classList.remove("active"));
    choice.classList.add("active");
    document.querySelectorAll(".payment-choice").forEach((item) => item.setAttribute("aria-pressed", item === choice ? "true" : "false"));
  });
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".account-result").textContent = "You're in — check your inbox to verify your email.";
});
