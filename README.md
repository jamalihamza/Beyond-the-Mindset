Beyond the Mindset

Video Demo: [NOT YET]

Description:
"Beyond the Mindset" is a web platform designed to empower individuals to manage their physical well-being through specialized health calculators. Users can access tools for assessing various health metrics, such as BMI, BMR, heart rate, and sleep needs. Each calculator provides an easy-to-use interface along with explanations and insights, facilitating better understanding and management of personal health.

Project Files and Structure:
app.py: The main Flask application file that defines the app's routes, handles user requests, and renders the corresponding templates.
sleep.py: A Python script that handles the sleep calculation logic.
templates/: This directory contains HTML files for the different pages of the application, ensuring clear organization and ease of navigation.
static/: This folder includes CSS, JavaScript, and image files that provide styling and functionality to the web pages. Each calculator features unique styles to enhance user experience.
requirements.txt: A file listing the Python packages required to run the application.

Design Choices:
The project is structured to provide a clear and straightforward user experience. Each health calculator is designed with its own CSS and JavaScript, ensuring that users can navigate the platform without confusion. The choice to separate calculators into individual files allows for easier maintenance and updates in the future.

Inspiration for the project came from reputable sources such as the NHS, NIH, and various health-focused websites. The goal is to create a reliable platform that encourages users to take an active role in their health management.

Future Plans:
While the current version focuses on health calculators, there are plans to expand the platform to include mental health assessments and a blog section. These additions aim to provide users with a more comprehensive resource for health and wellness, offering insights and support for both physical and mental well-being.

Installation Instructions
To set up the project locally, follow these steps:

Clone the Repository:
git clone https://github.com/jamalihamza/Beyond-the-Mindset.git

Navigate to the Project Directory:
cd beyond-the-mindset

Install Dependencies:
pip install -r requirements.txt

To run the application locally:

Start the Flask App:
flask run
Access the App: Open a web browser and go to http://127.0.0.1:5000 to interact with the app.

License
This project is licensed under the MIT License.