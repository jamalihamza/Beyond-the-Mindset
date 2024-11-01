const bfpText = document.getElementById("bfp");
const descText = document.getElementById("desc");
const form = document.querySelector("form");

// Elements for input fields
const genderField = document.getElementById("gender");
const heightField = document.getElementById("height");
const neckField = document.getElementById("neck");
const waistField = document.getElementById("waist");
const hipField = document.getElementById("hip");
const hipContainer = document.getElementById("hip-container");

// Conversion factor: 1 cm = 0.393701 inches
const CM_TO_INCH = 0.393701;

// Toggle hip input visibility based on gender
function toggleHipField() {
  if (genderField.value === "female") {
    hipContainer.style.visibility = "visible";
    hipContainer.style.height = "auto"; // Ensure it takes its natural height
  } else {
    hipContainer.style.visibility = "hidden";
    hipContainer.style.height = "0"; // Collapse height when hidden
  }
  updateBFPScaleVisibility();
}

// Update BFP scale visibility based on gender
function updateBFPScaleVisibility() {
  const maleParagraphs = document.querySelectorAll('.bfp-scale .male');
  const femaleParagraphs = document.querySelectorAll('.bfp-scale .female');

  if (genderField.value === "male") {
      maleParagraphs.forEach(p => p.style.display = "block");
      femaleParagraphs.forEach(p => p.style.display = "none");
  } else {
      maleParagraphs.forEach(p => p.style.display = "none");
      femaleParagraphs.forEach(p => p.style.display = "block");
  }
}

// Reset handler
function handleReset() {
  bfpText.textContent = 0;
  bfpText.className = "";
  descText.textContent = "N/A";
  // Reset visibility of BFP scale
  toggleHipField(); // This will reset the scale based on the default selected gender
}

// Form submission handler for calculating body fat percentage
function handleSubmit(e) {
  e.preventDefault();

  const gender = genderField.value;
  const height = parseFloat(heightField.value) * CM_TO_INCH;
  const neck = parseFloat(neckField.value) * CM_TO_INCH;
  const waist = parseFloat(waistField.value) * CM_TO_INCH;
  const hip = gender === "female" ? parseFloat(hipField.value) * CM_TO_INCH : 0;

  // Validate input values
  if (isNaN(height) || isNaN(neck) || isNaN(waist) || (gender === "female" && isNaN(hip))) {
    alert("Please enter all required values");
    return;
  }

  let bfp;
  if (gender === "male") {
    // US Navy formula for males
    bfp = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    // US Navy formula for females
    bfp = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }

  // Validate body fat percentage
  if (bfp < 2) {
    alert("⚠️ That percentage is unreasonably low! Body fat percentages below 2% can be dangerous to your health. Please enter a realistic value.");
    return;
  } else if (bfp > 50) {
    alert("⚠️ That percentage is high! Body fat percentages above 50% can be associated with serious health risks. Please ensure your inputs are accurate.");
    return;
  }

  const { label, className } = interpretBFP(bfp, gender);

  bfpText.textContent = `${bfp.toFixed(1)}%`;
  bfpText.className = className;

  const article = label === "Athlete" ? "an " : "";
  descText.innerHTML = `You are classified as ${article}<strong style="text-transform: none;">${label}</strong>`;
}

// Updated interpretBFP function
function interpretBFP(bfp, gender) {
  if (gender === "male") {
    if (bfp < 6) {
      return { label: "Essential Fat", className: "essential" };
    } else if (bfp < 14) {
      return { label: "Athlete", className: "athletes" };
    } else if (bfp < 18) {
      return { label: "Fitness", className: "fitness" };
    } else if (bfp < 25) {
      return { label: "Average", className: "average" };
    } else {
      return { label: "Obese", className: "obese" };
    }
  } else if (gender === "female") {
    if (bfp < 10) {
      return { label: "Essential Fat", className: "essential" };
    } else if (bfp < 21) {
      return { label: "Athlete", className: "athletes" };
    } else if (bfp < 25) {
      return { label: "Fitness", className: "fitness" };
    } else if (bfp < 32) {
      return { label: "Average", className: "average" };
    } else {
      return { label: "Obese", className: "obese" };
    }
  }
}

// Event listeners
form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);
genderField.addEventListener("change", toggleHipField);

// Initial call to set the BFP scale visibility based on the default selected gender
toggleHipField();
à
