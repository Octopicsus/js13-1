document.addEventListener("DOMContentLoaded", function () {
  //
  //
  // ---- Variables ----

  const form = document.querySelector("form");
  const firstNameInput = form.querySelector('input[name="name"]:nth-child(1)');
  const secondNameInput = form.querySelector('input[name="name"]:nth-child(2)');
  const dateInput = form.querySelector('input[name="date"]');
  const sexInputs = form.querySelectorAll('input[name="sex"]');
  const citySelect = form.querySelector('select[name="city"]');
  const addressTextarea = form.querySelector('textarea[name="adress"]');
  const languageCheckboxes = form.querySelectorAll('input[name="lang"]');
  const userInfo = document.querySelector(".userInfo");
  const notification = document.querySelector(".notification");

  //
  //
  // ---- Regular Expressions ----

  const regexPatterns = {
    name: /^[A-Za-z]+$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
  };

  //
  //
  // ---- Form Submit ----

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = getFormData();
    if (!validateFormData(formData)) {
      return;
    }
    showUserInfo(formData);
  });

  //
  //
  // ---- Get Form Data ----

  function getFormData() {
    const firstName = firstNameInput.value.trim();
    const secondName = secondNameInput.value.trim();
    const dateOfBirth = dateInput.value.trim();
    const sex = Array.from(sexInputs).find((input) => input.checked);
    const city = citySelect.value;
    const address = addressTextarea.value.trim();
    const languages = Array.from(languageCheckboxes)
      .filter((input) => input.checked)
      .map((input) => input.value);

    return {
      firstName,
      secondName,
      dateOfBirth,
      sex,
      city,
      address,
      languages,
    };
  }

  //
  //
  // ---- Validate Form Data ----

  function validateFormData({
    firstName,
    secondName,
    dateOfBirth,
    sex,
    city,
    address,
    languages,
  }) {
    if (!regexPatterns.name.test(firstName)) {
      showNotification("First Name is invalid. Only letters are allowed.");
      return false;
    }

    if (!regexPatterns.name.test(secondName)) {
      showNotification("Second Name is invalid. Only letters are allowed.");
      return false;
    }

    if (!regexPatterns.date.test(dateOfBirth)) {
      showNotification("Date of Birth is invalid. Use the format YYYY-MM-DD.");
      return false;
    }

    if (!sex) {
      showNotification("Please select your sex.");
      return false;
    }

    if (!city) {
      showNotification("Please select your city.");
      return false;
    }

    if (address.length === 0) {
      showNotification("Please enter your address.");
      return false;
    }

    if (languages.length === 0) {
      showNotification("Please select at least one language.");
      return false;
    }

    return true;
  }

  //
  //
  // ---- Show Notification ----

  function showNotification(message) {
    notification.textContent = message;

    setTimeout(() => {
      notification.textContent = "";
    }, 4000);
  }

  //
  //
  // ---- Show User Information ----

  function showUserInfo({
    firstName,
    secondName,
    dateOfBirth,
    sex,
    city,
    address,
    languages,
  }) {
    userInfo.innerHTML = `
    <div class="user-info">
    <h3>User Information</h3>
    <div class="user-wrapper">
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Second Name:</strong> ${secondName}</p>
    <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
    <p><strong>Sex:</strong> ${sex.value}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Languages:</strong> ${languages.join(", ")}</p>
    </div>
    </div>`;
    userInfo.style.display = "flex";
  }

  //
  //
  // ---- Reload Page ----

  userInfo.addEventListener("click", () => {
    location.reload();
  });
});
