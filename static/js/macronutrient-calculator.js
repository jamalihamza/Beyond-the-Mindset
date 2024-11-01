class MacroCalculator {
  constructor(weight, height, age, gender, activity, goal) {
    this.weight = weight;
    this.height = height;
    this.age = age;
    this.gender = gender;
    this.activity = activity;
    this.goal = goal;
  }

  calculateMacros() {
    // Calculate BMR
    let bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age;
    bmr += this.gender === "male" ? 5 : -161;

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
    };

    const tdee = bmr * activityMultipliers[this.activity];

    // Goal adjustments
    const calorieAdjustment =
      this.goal === "lose_weight"
        ? -500
        : this.goal === "gain_weight"
        ? 500
        : 0;
    const totalCalories = tdee + calorieAdjustment;

    // Macronutrient ratios based on goal
    const ratios = {
      lose_weight: { carbs: 0.4, protein: 0.3, fats: 0.3 },
      maintain_weight: { carbs: 0.5, protein: 0.25, fats: 0.25 },
      gain_weight: { carbs: 0.5, protein: 0.3, fats: 0.2 },
    };

    const { carbs, protein, fats } = ratios[this.goal];

    return {
      carbs: Math.round((totalCalories * carbs) / 4),
      protein: Math.round((totalCalories * protein) / 4),
      fats: Math.round((totalCalories * fats) / 9),
    };
  }
}

// Selectors
const selectors = {
  form: document.getElementById("calculator"),
  result: document.getElementById("result"),
  carbs: document.getElementById("carbs"),
  protein: document.getElementById("protein"),
  fats: document.getElementById("fats"),
};

// Render function
const render = ({ carbs, protein, fats }) => {
  selectors.carbs.textContent = `${carbs.toLocaleString("en")} g`;
  selectors.protein.textContent = `${protein.toLocaleString("en")} g`;
  selectors.fats.textContent = `${fats.toLocaleString("en")} g`;
};

// Event handlers
const onFormSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const weight = Number(form.weight.value);
  const height = Number(form.height.value);
  const age = Number(form.age.value);
  const gender = form.gender.value;
  const activity = form.activity.value;
  const goal = form.goal.value;

  // Basic validation for numeric values
  if (isNaN(weight) || isNaN(height) || isNaN(age)) {
    alert("Weight, height, and age must be numeric.");
    return;
  }

  // Realistic range checks
  if (height < 50 || height > 250) {
    alert("⚠️ Please enter a realistic height (50 cm - 250 cm).");
    return;
  }
  if (weight < 20 || weight > 500) {
    alert("⚠️ Please enter a realistic weight (20 kg - 500 kg).");
    return;
  }
  if (age < 1) {
    alert("AGE??");
    return;
  }
  if (age < 5) {
    alert("Are you sure you're not a baby superhero?");
    return;
  }
  if (age > 120) {
    alert("Wow! You must have some amazing stories to tell from the 1800s!");
    return;
  }

  const calc = new MacroCalculator(weight, height, age, gender, activity, goal);
  render(calc.calculateMacros());

  selectors.result.classList.add("show");
};

const onFormReset = () => {
  selectors.result.classList.remove("show");
};

// Event listeners
selectors.form.addEventListener("submit", onFormSubmit);
selectors.form.addEventListener("reset", onFormReset);
