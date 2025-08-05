from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'treatments.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []
        
def save_data(new_treatment):
    # Check if file exists and load existing treatments
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            try:
                treatments = json.load(f)
                if not isinstance(treatments, list):
                    treatments = [treatments]  # Handle case where JSON was a single object
            except json.JSONDecodeError:
                treatments = []
    else:
        treatments = []

    # Append the new treatment
    treatments.append(new_treatment)

    # Save updated array back to file
    with open(DATA_FILE, 'w') as f:
        json.dump(treatments, f, indent=2)


@app.route('/api/treatments', methods=['GET'])
def get_treatments():
    try:

        data = load_data()
        if not data:
            data == []
        print('Data:', data)
        return jsonify(data), 200
    except Exception as e:
        print('Error getting treatment data:', e)
    # return jsonify(load_data())
        return jsonify({'error': 'Failed to load treatments'}), 400

@app.route('/api/treatments', methods=['POST'])
def add_treatment():
    try:
        treatment = request.get_json() 
        required_fields = ['code', 'description', 'fee', 'category']
        missing_fields = [field for field in required_fields if field not in treatment or treatment[field] == '']
        
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

        print(f'Treatment:', treatment)
        save_data(treatment)
        return jsonify({
            'message': 'Treatment added successfully',
            'saved_treatment': treatment
            }), 201

    except Exception as e:
        print('Error adding new treatment:', e)
        return jsonify({'error': 'Failed to add new treatment'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
