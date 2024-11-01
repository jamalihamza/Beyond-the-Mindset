from flask import Flask, redirect, render_template, url_for
from sleep import sleep_bp  # Import the blueprint


app = Flask(__name__)
app.register_blueprint(sleep_bp)  # Register the blueprint


@app.route('/')
def index():
    return redirect(url_for('calculators'))


# Calculator route
@app.route('/calculator')
def calculator_redirect():
    return redirect(url_for('calculators'))

@app.route('/calculators')
def calculators():
    return render_template('calculators.html')


# Full calculator routes
@app.route('/calculators/sleep-cycle-calculator')
def sleep_cycle_calculator():
    return render_template('sleep-cycle-calculator.html')


@app.route('/calculators/bmi-calculator')
def bmi_calculator():
    return render_template('bmi-calculator.html')


@app.route('/calculators/bmr-calculator')
def bmr_calculator():
    return render_template('bmr-calculator.html')


@app.route('/calculators/ideal-weight-calculator')
def ideal_weight_calculator():
    return render_template('ideal-weight-calculator.html')


@app.route('/calculators/water-intake-calculator')
def water_intake_calculator():
    return render_template('water-intake-calculator.html')


@app.route('/calculators/body-fat-calculator')
def body_fat_calculator():
    return render_template('body-fat-calculator.html')


@app.route('/calculators/max-heart-rate-calculator')
def max_heart_rate_calculator():
    return render_template('max-heart-rate-calculator.html')


@app.route('/calculators/lean-body-mass-calculator')
def lean_body_mass_calculator():
    return render_template('lean-body-mass-calculator.html')


@app.route('/calculators/macronutrient-calculator')
def macronutrient_calculator():
    return render_template('macronutrient-calculator.html')


@app.route('/calculators/creatine-calculator')
def creatine_calculator():
    return render_template('creatine-calculator.html')


# Shortened routes for easy access
@app.route('/sleep')
def short_sleep():
    return redirect(url_for('sleep_cycle_calculator'))

@app.route('/bmi')
def short_bmi():
    return redirect(url_for('bmi_calculator'))

@app.route('/bmr')
def short_bmr():
    return redirect(url_for('bmr_calculator'))

@app.route('/calorie')
def calorie_redirect():
    return redirect(url_for('bmr_calculator'))

@app.route('/ideal-weight')
def short_ideal_weight():
    return redirect(url_for('ideal_weight_calculator'))

@app.route('/water-intake')
def short_water_intake():
    return redirect(url_for('water_intake_calculator'))

@app.route('/body-fat')
def short_body_fat():
    return redirect(url_for('body_fat_calculator'))

@app.route('/max-heart-rate')
def short_max_heart_rate():
    return redirect(url_for('max_heart_rate_calculator'))

@app.route('/lean-body-mass')
def short_lean_body_mass():
    return redirect(url_for('lean_body_mass_calculator'))

@app.route('/macronutrient')
def short_macronutrient_1():
    return redirect(url_for('macronutrient_calculator'))

@app.route('/macro')
def short_macronutrient_2():
    return redirect(url_for('macronutrient_calculator'))

@app.route('/creatine')
def short_creatine():
    return redirect(url_for('creatine_calculator'))



@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/device-soon')
def device_soon():
    return render_template('device-soon.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
