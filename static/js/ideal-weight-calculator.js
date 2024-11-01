class IBWCalculator {
    constructor(height, age, gender) {
      this.height = height; // Height should be in centimeters
      this.age = age;      // Store age (although it's not used in calculations)
      this.gender = gender; // Store gender
    }

    calculateIBW() {
      let ibw;

      // Calculate IBW using the Hamwi method
      if (this.gender === "male") {
        ibw = 48 + 2.7 * ((this.height / 2.54) - 60); // Hamwi method for male
      } else if (this.gender === "female") {
        ibw = 45.5 + 2.2 * ((this.height / 2.54) - 60); // Hamwi method for female
      }

      return ibw;
    }

    getResult() {
      const ibw = this.calculateIBW();

      const formulas = {
        hamwi: ibw,
        devine: this.gender === "male"
                  ? 50 + 2.3 * ((this.height / 2.54) - 60)
                  : 45.5 + 2.3 * ((this.height / 2.54) - 60),
        robinson: this.gender === "male"
                  ? 52 + 1.9 * ((this.height / 2.54) - 60)
                  : 49 + 1.7 * ((this.height / 2.54) - 60),
        miller: this.gender === "male"
                  ? 56.2 + 1.41 * ((this.height / 2.54) - 60)
                  : 53.1 + 1.36 * ((this.height / 2.54) - 60),
      };

      return { ibw, formulas };
    }
  }

  //* selectors

  const selectors = {
    form: document.getElementById("calculator"),
    result: document.getElementById("result"),
    hamwi: document.getElementById("hamwi"),
    devine: document.getElementById("devine"),
    robinson: document.getElementById("robinson"),
    miller: document.getElementById("miller"),
  };

  //* renderer

  const render = ({ ibw, formulas }) => {
    // Move the IBW result to the Hamwi display
    selectors.hamwi.textContent = ibw.toFixed(1).toLocaleString("en") + ' kg';

    for (const k in formulas) {
      const weight = formulas[k].toFixed(1); // Use toFixed(1) for one decimal place
      selectors[k].textContent = weight.toLocaleString("en") + ' kg';
    }
  };

  //* event handlers

  const onFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const height = Number(form.height.value);
    const age = Number(form.age.value);
    const gender = form.gender.value;

    if (isNaN(height) || isNaN(age)) {
      alert("Height and age must be numeric");
      return;
    }

    // Unrealistic values checks
    if (height < 50 || height > 250) {
      alert("⚠️ Please enter a realistic height (50 cm - 250 cm).");
      return;
    }
    if (age < 1) {
      alert("AGE??");
      return;
    } if (age < 5) {
      alert("Are you sure you're not a baby superhero?");
      return;
    } if (age > 120) {
      alert("Wow! You must have some amazing stories to tell from the 1800s!");
      return;
    }

    selectors.result.classList.remove("show");

    setTimeout(() => {
      const calc = new IBWCalculator(height, age, gender);

      render(calc.getResult());

      selectors.result.classList.add("show");
    }, 400);
  };

  const onFormReset = () => {
    selectors.result.classList.remove("show");
  };

  //* event listeners

  selectors.form.addEventListener("submit", onFormSubmit);
  selectors.form.addEventListener("reset", onFormReset);
