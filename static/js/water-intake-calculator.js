const wiText = document.getElementById("wi");
const cupText = document.getElementById("cup");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleReset() {
  wiText.textContent = "0 Liter";
  cupText.textContent = "N/A";
}

function handleSubmit(e) {
  e.preventDefault();

  const weight = parseFloat(form.weight.value);
  const workoutTime = form.workout_time.value;
  const additionalHoursInput = document.getElementById("additional-hours");
  const additionalHours = parseFloat(additionalHoursInput.value) || 0;

  if (isNaN(weight) || weight <= 0 || weight < 20 || weight > 500) {
    alert("⚠️ Please enter a valid weight (20 kg - 500 kg).");
    return;
  }

  // Validate additional hours only if workout time is "more_than_hour"
  if (workoutTime === "more_than_hour") {
    if (isNaN(additionalHours) || additionalHours <= 0) {
      alert("Please enter a valid number of additional hours (greater than 0).");
      return;
    }

    // Set maximum limit for additional hours (e.g., 5 hours)
    const maxAdditionalHours = 5; // Adjust this value as needed
    if (additionalHours > maxAdditionalHours) {
      alert(`You trained more than (maximum ${maxAdditionalHours} hours?? are you David Goggins?).`);
      return;
    }
  }

  // Base water intake in liters
  let waterIntake = 0;

  // Check if a workout time has been selected before calculating
  if (!workoutTime) {
    alert("⚠️ Please select a workout time.");
    return;
  }

  // Calculate water intake based on workout time
  if (workoutTime === "less_than_hour") {
    waterIntake = (weight * 35) / 1000; // 35 ml per kg for less than an hour
  } else if (workoutTime === "one_hour") {
    waterIntake = (weight * 40) / 1000; // 40 ml per kg for one hour
  } else if (workoutTime === "more_than_hour") {
    waterIntake = (weight * 40) / 1000; // 40 ml per kg for the first hour
    // Add 0.5 liters for each additional hour
    waterIntake += 0.5 * Math.max(0, additionalHours); // Add liters for extra hours
  }

  // Convert liters to cups (1 liter ≈ 4.22675 cups)
  const waterIntakeCups = waterIntake * 4.22675;

  let literLabel;

  const fixedWaterIntake = waterIntake.toFixed(1);

  if (fixedWaterIntake === "1.0") {
      literLabel = "Liter"; // Handle exactly 1 Liter
  } else {
      literLabel = "Liters"; // Use "Liters" for all other cases
  }

  // Output results
  wiText.textContent = `${waterIntake.toFixed(1)} ${literLabel}`; // Show water intake with unit

  // Determine singular/plural for cups
  const cupsLabel = Math.ceil(waterIntakeCups) === 1 ? "cup" : "cups";

  // Display the results for cups
  cupText.innerHTML = `Which means <strong>${Math.ceil(waterIntakeCups)}</strong> ${cupsLabel} daily.`;
}

// JavaScript to show/hide the additional hours input
const workoutTimeOptions = document.querySelectorAll('input[name="workout_time"]');
const additionalHoursContainer = document.getElementById('additional-hours-container');

workoutTimeOptions.forEach(option => {
  option.addEventListener('change', function() {
    if (this.value === 'more_than_hour') {
      additionalHoursContainer.style.display = 'block'; // Show additional hours input
    } else {
      additionalHoursContainer.style.display = 'none'; // Hide it
    }
  });
});
