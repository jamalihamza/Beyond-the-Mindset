const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleReset() {
  bmiText.textContent = 0;
  bmiText.className = "";
  descText.textContent = "N/A";
}

function handleSubmit(e) {
  e.preventDefault();

  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  // Validate BMI for unrealistic values
  if (bmi < 10) {
    alert("⚠️ That BMI is unreasonably low! Please check your weight and height.");
    return;
  } else if (bmi > 60) {
    alert("⚠️ That BMI is high! Please ensure your inputs are accurate.");
    return;
  }

  const desc = interpretBMI(bmi);

  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = desc;
  descText.innerHTML = `You are <strong>${desc}</strong>`;
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}
