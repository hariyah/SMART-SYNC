import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy dataset (replace with real user data)
data = {
    "user_id": [1, 2, 3, 4, 5],
    "productive_hours": [5, 7, 3, 6, 8],
    "distraction_hours": [2, 1, 4, 3, 2],
    "breaks_taken": [3, 2, 5, 4, 3]
}

df = pd.DataFrame(data)

# Apply K-Means Clustering to classify productivity levels
try:
    kmeans = KMeans(n_clusters=3, random_state=42)
    df['cluster'] = kmeans.fit_predict(df[['productive_hours', 'distraction_hours', 'breaks_taken']])
except Exception as e:
    print(f"Error during clustering: {e}")

# Function to provide recommendations
def get_recommendation(productive_hours, distraction_hours):
    if productive_hours >= 6:
        return "You're highly productive! Keep up the good work."
    elif distraction_hours > 3:
        return "Try reducing distractions to improve efficiency."
    else:
        return "Maintain focus and take structured breaks."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    productive_hours = data.get('productive_hours')
    distraction_hours = data.get('distraction_hours')

    if productive_hours is None or distraction_hours is None:
        return jsonify({"error": "Missing required parameters: 'productive_hours' and 'distraction_hours' are required."}), 400

    try:
        productive_hours = float(productive_hours)
        distraction_hours = float(distraction_hours)
    except ValueError:
        return jsonify({"error": "Invalid parameter types: 'productive_hours' and 'distraction_hours' must be numbers."}), 400

    # Validate input ranges
    if productive_hours < 0 or distraction_hours < 0:
        return jsonify({"error": "Invalid values: 'productive_hours' and 'distraction_hours' must be non-negative."}), 400

    recommendation = get_recommendation(productive_hours, distraction_hours)
    return jsonify({"recommendation": recommendation})

@app.route('/')
def home():
    return "Welcome to the AI Productivity Insights API!"

if __name__ == '__main__':
    app.run(port=5000, debug=True)
