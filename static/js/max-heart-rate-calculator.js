const mhrText = document.getElementById("mhr");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleReset() {
  mhrText.textContent = 0;
  mhrText.className = "";
}

function handleSubmit(e) {
  e.preventDefault();

  const age = parseFloat(form.age.value);

  if (isNaN(age) || age <= 0) {
    alert("Please enter a valid age");
    return;
  }

  // age lol
  if (age < 5) {
    alert("Are you sure you're not a baby superhero?");
    return;
  } if (age > 120) {
    alert("Wow! You must have some amazing stories to tell from the 1800s!");
    return;
  }

  const mhr = 220 - age;

  mhrText.textContent = mhr;
}
