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
  const userInfoDiv = document.querySelector(".userInfo");

  //
  //
  // ---- Form Submit ----

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //

    const firstName = firstNameInput.value.trim();
    const secondName = secondNameInput.value.trim();
    const dateOfBirth = dateInput.value.trim();
    const sex = Array.from(sexInputs).find((input) => input.checked);
    const city = citySelect.value;
    const address = addressTextarea.value.trim();
    const languages = Array.from(languageCheckboxes)
      .filter((input) => input.checked)
      .map((input) => input.value);

    //
    // ---- Regular Expressions ----

    const nameRegex = /^[A-Za-z]+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    //
    //
    // ---- Validation ----

    if (!nameRegex.test(firstName)) {
      alert("First Name is invalid. Only letters are allowed.");
      return;
    }

    if (!nameRegex.test(secondName)) {
      alert("Second Name is invalid. Only letters are allowed.");
      return;
    }

    console.log(dateOfBirth);

    if (!dateRegex.test(dateOfBirth)) {
      alert("Date of Birth is invalid. Use the format YYYY-MM-DD.");
      return;
    }

    if (!sex) {
      alert("Please select your sex.");
      return;
    }

    if (!city) {
      alert("Please select your city.");
      return;
    }

    if (address.length === 0) {
      alert("Please enter your address.");
      return;
    }

    if (languages.length === 0) {
      alert("Please select at least one language.");
      return;
    }

    //
    //
    // ---- Show User Information ----

    userInfoDiv.innerHTML = `
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
    userInfoDiv.style.display = "flex";
  });

  //
  //
  // ---- Reload Page ----

  userInfoDiv.addEventListener("click", () => {
    location.reload();
  });
});
