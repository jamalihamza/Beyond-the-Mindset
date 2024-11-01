const resultText = document.getElementById("result");
const infoText = document.getElementById("info");
const form = document.querySelector("form");
const weightInput = document.getElementById("weight");
const loadingPhaseOption = document.querySelector('input[value="loading_phase"]');
const maintenancePhaseOption = document.querySelector('input[value="maintenance_phase"]');

form.addEventListener("input", handleInput); // Handle input event

// Add event listener to radio buttons
const phaseOptions = document.querySelectorAll('input[name="phase_of_use"]');
phaseOptions.forEach(option => {
  option.addEventListener('change', handlePhaseChange);
});

// Function to handle input changes
function handleInput() {
  const weight = parseFloat(weightInput.value);

  // Enable/disable loading phase based on weight input
  loadingPhaseOption.disabled = isNaN(weight) || weight < 20 || weight > 500;

  // Reset results if weight is invalid
  if (isNaN(weight) || weight < 20 || weight > 500) {
    if (maintenancePhaseOption.checked) {
      // Keep maintenance phase static
      resultText.textContent = "3-5 grams/day";
      infoText.textContent = "Take this whether after or without the loading dose.";
    } else {
      resultText.textContent = "0 grams/day";
      infoText.textContent = "N/A";
    }
    return;
  }

  // Automatically update results based on phase selection
  phaseOptions.forEach(option => {
    if (option.checked) {
      handlePhaseChange.call(option); // Use call to pass the current option
    }
  });
}

// Function to handle phase changes
function handlePhaseChange() {
  const weight = parseFloat(weightInput.value);
  const phaseOfUse = this.value;

  // Check for valid weight when loading phase is selected
  if (phaseOfUse === "loading_phase") {
    if (isNaN(weight) || weight < 20 || weight > 500) {
      alert("⚠️ Please provide a valid weight (20 kg - 500 kg) to calculate the loading dose.");
      loadingPhaseOption.checked = false; // Deselect the loading phase
      return; // Prevent further processing
    }
    const loadingDose = weight * 0.3; // 0.3 grams per kg
    resultText.textContent = `${loadingDose.toFixed(1)} grams/day`;
    infoText.textContent = "Take this load for 5-7 days.";
  } else if (phaseOfUse === "maintenance_phase") {
    // Keep the maintenance output static
    resultText.textContent = "3-5 grams/day";
    infoText.textContent = "Take this whether after or without the loading dose.";
  }
}

// Add event listener for weight input to show alert when loading phase is selected
weightInput.addEventListener('input', () => {
  const weight = parseFloat(weightInput.value);

  // If the loading phase is selected and the weight is invalid, alert the user
  if (loadingPhaseOption.checked && (isNaN(weight) || weight < 20 || weight > 500)) {
    alert("⚠️ Please provide a valid weight (20 kg - 500 kg) to calculate the loading dose.");
    loadingPhaseOption.checked = false; // Deselect the loading phase
    resultText.textContent = "0 Grams"; // Reset result
    infoText.textContent = "N/A"; // Reset info
  }
});
