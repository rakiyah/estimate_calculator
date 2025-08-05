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
        
def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)


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
        print(f'Treatment:', treatment)
        return jsonify({'message': 'Treatment added successfully'}), 201

    except Exception as e:
        print('Error adding new treatment:', e)
        return jsonify({'error': 'Failed to add new treatment'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
