// script.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sleepForm");
    const wakeOption = document.getElementById("wakeOption");
    const bedOption = document.getElementById("bedOption");
    const wakeTimeInputs = document.getElementById("wakeTimeInputs");
    const bedTimeInputs = document.getElementById("bedTimeInputs");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsPanel = document.getElementById("settingsPanel");
    const resultsList = document.getElementById("suggested-times");

    // Button elements
    const nowButton = document.getElementById("nowButton");
    const thirtyMinLater = document.getElementById("thirtyMinLater");
    const oneHourLater = document.getElementById("oneHourLater");

    // Toggle settings panel on button click
    settingsBtn.addEventListener("click", () => {
        settingsPanel.style.display = settingsPanel.style.display === "none" ? "block" : "none";
    });

    // Show or hide input fields based on selected option
    wakeOption.addEventListener("change", () => {
        wakeTimeInputs.style.display = "block";
        bedTimeInputs.style.display = "none";
    });

    bedOption.addEventListener("change", () => {
        bedTimeInputs.style.display = "block";
        wakeTimeInputs.style.display = "none";
    });

    // Helper function to set time fields
    function setTimeFields(hourField, minuteField, ampmField, dateObj) {
        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        hourField.value = hours;
        minuteField.value = minutes.toString().padStart(2, '0');
        ampmField.value = ampm;
    }

    // Set time to now
    nowButton.addEventListener("click", () => {
        const now = new Date();
        setTimeFields(document.getElementById("bedHour"), document.getElementById("bedMinute"), document.getElementById("bedAmPm"), now);
    });

    // Set time to 30 minutes later
    thirtyMinLater.addEventListener("click", () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        setTimeFields(document.getElementById("bedHour"), document.getElementById("bedMinute"), document.getElementById("bedAmPm"), now);
    });

    // Set time to 1 hour later
    oneHourLater.addEventListener("click", () => {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        setTimeFields(document.getElementById("bedHour"), document.getElementById("bedMinute"), document.getElementById("bedAmPm"), now);
    });


    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Get the values from the inputs
        const cycleLength = parseInt(document.getElementById("cycleLength").value);
        const fallAsleepTime = parseInt(document.getElementById("fallAsleepTime").value);

        // Validation for cycle length (e.g., realistic range: 60 to 120 minutes)
        if (cycleLength < 60 || cycleLength > 120) {
            alert("Please enter a sleep cycle length between 60 and 120 minutes.");
            return; // Prevent form submission
        }

        // Validation for fall asleep time (e.g., realistic range: 0 to 60 minutes)
        if (fallAsleepTime < 0 || fallAsleepTime > 60) {
            alert("Please enter a fall asleep time between 0 and 60 minutes.");
            return; // Prevent form submission
        }

        // Populate formData based on selection
        if (wakeOption.checked) {
            formData.append("hour", document.getElementById("wakeHour").value);
            formData.append("minute", document.getElementById("wakeMinute").value);
            formData.append("ampm", document.getElementById("wakeAmPm").value);
        } else if (bedOption.checked) {
            formData.append("hour", document.getElementById("bedHour").value);
            formData.append("minute", document.getElementById("bedMinute").value);
            formData.append("ampm", document.getElementById("bedAmPm").value);
        }

        formData.append("cycleLength", cycleLength);
        formData.append("fallAsleepTime", fallAsleepTime);

        // Fetch request to backend
        const response = await fetch("/calculators/sleep-calculator", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // Display highlighted cycles (5th and 6th) in a new div
        const highlightedCycles = document.getElementById("highlighted-cycles");
        const cycle5 = document.getElementById("cycle-5");
        const cycle6 = document.getElementById("cycle-6");
        const highlightedMessage = document.getElementById("highlighted-message");

        // Check if "wake" or "bed" was selected to set the message
        if (wakeOption.checked) {
            highlightedMessage.textContent = "If you want to wake up refreshed, go to bed at one of the following times:";
        } else if (bedOption.checked) {
            highlightedMessage.textContent = "If you go to bed, wake up at one of the following times to feel refreshed:";
        }

        // Set times for the 5th and 6th cycles
        cycle5.textContent = `${data.sleep_times[4]} (5 sleep cycles)`;  // Index 4 for 5th cycle
        cycle6.textContent = `${data.sleep_times[5]} (6 sleep cycles)`;  // Index 5 for 6th cycle

        highlightedCycles.style.display = "block"; // Show the div
        document.getElementById("results").style.display = "block"; // Show the main results div

        // Display remaining results (7th, 4th, 3rd, 2nd, 1st cycles) in the main list
        const reducedSleepTimes = [
            data.sleep_times[6],  // 7th cycle
            data.sleep_times[3],  // 4th cycle
            data.sleep_times[2],  // 3rd cycle
            data.sleep_times[1],  // 2nd cycle
            data.sleep_times[0]   // 1st cycle
        ];

        resultsList.innerHTML = ""; // Clear previous results
        reducedSleepTimes.forEach((time, index) => {
            const listItem = document.createElement("li");

            // Time display (left-aligned)
            const timeText = document.createElement("p");
            timeText.innerHTML = `<strong class="name">${time}</strong>`;

            // Cycle count display (right-aligned)
            const cycleCount = document.createElement("span");
            const cycleNumber = [7, 4, 3, 2, 1][index]; // Correct cycle numbers
            const cycleLabel = cycleNumber === 1 ? "sleep cycle" : "sleep cycles";
            cycleCount.classList.add("value");
            cycleCount.textContent = `(${cycleNumber} ${cycleLabel})`; // Added parentheses

            // Append time and cycle count to the list item
            listItem.appendChild(timeText);
            listItem.appendChild(cycleCount);
            resultsList.appendChild(listItem);
        });
    });
});



