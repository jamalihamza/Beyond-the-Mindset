const lbmText = document.getElementById("lbm");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleReset() {
  lbmText.textContent = "0 kg";
}

function handleSubmit(e) {
  e.preventDefault();

  const weight = parseFloat(form.weight.value);
  const bfp = parseFloat(form.bfp.value);

  if (isNaN(weight) || isNaN(bfp) || weight <= 0 || bfp <= 0) {
    alert("Please enter a valid weight and body fat percentage");
    return;
  }
  if (weight < 20 || weight > 500) {
    alert("⚠️ Please enter a realistic weight (20 kg - 500 kg).");
    return;
  }
  if (bfp < 3 || bfp > 60) {
    alert("⚠️ Please enter a realistic body fat percentage (3% - 60%).");
    return;
  }

  const bfp_decimal = bfp / 100;
  const lbm = weight * (1 - bfp_decimal);

  lbmText.textContent = lbm.toFixed(1) + " kg";
}
