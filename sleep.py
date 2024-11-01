from flask import Blueprint, render_template, request, jsonify
from datetime import datetime, timedelta

sleep_bp = Blueprint("sleep", __name__)

# Default values in case the user doesn't change settings
DEFAULT_CYCLE_LENGTH = 90  # in minutes
DEFAULT_FALL_ASLEEP_BUFFER = 15  # in minutes

def calculate_times(base_time, cycles, cycle_length, fall_asleep_buffer, direction="wake"):
    results = []
    for cycle in cycles:
        sleep_duration = cycle * cycle_length + fall_asleep_buffer
        if direction == "wake":
            target_time = base_time - timedelta(minutes=sleep_duration)
        else:  # handle "bed" direction
            target_time = base_time + timedelta(minutes=sleep_duration)
        results.append(target_time.strftime("%I:%M %p"))
    return results

@sleep_bp.route("/calculators/sleep-cycle-calculator", methods=["GET"])
def sleep_cycle_calculator():
    return render_template("sleep-cycle-calculator.html")

@sleep_bp.route("/calculators/sleep-calculator", methods=["POST"])
def calculate_cycle_sleep():
    sleep_times = []

    # Retrieve data from the form
    hour = request.form.get("hour")
    minute = request.form.get("minute")
    ampm = request.form.get("ampm")

    # Build a time string based on the received data
    if hour and minute and ampm:
        time_str = f"{hour}:{minute} {ampm}"
        base_time = datetime.strptime(time_str, "%I:%M %p")
    else:
        return jsonify({"sleep_times": sleep_times})

    # Get custom settings or use defaults
    cycle_length = int(request.form.get("cycleLength", DEFAULT_CYCLE_LENGTH))
    fall_asleep_buffer = int(request.form.get("fallAsleepTime", DEFAULT_FALL_ASLEEP_BUFFER))
    cycles = [1, 2, 3, 4, 5, 6, 7]

    # Determine the direction based on user input
    if request.form.get("option") == "wake":
        direction = "wake"
    else:
        direction = "bed"

    # Calculate sleep times
    sleep_times = calculate_times(base_time, cycles, cycle_length, fall_asleep_buffer, direction)

    return jsonify({"sleep_times": sleep_times})

if __name__ == "__main__":
    app.run(debug=True)
