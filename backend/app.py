from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():

    file = request.files['file']

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    df = pd.read_csv(file)

    # replace NaN with None
    df = df.replace({np.nan: None})

    data = df.head(20).to_dict(orient="records")

    return jsonify({
        "message": "File received successfully",
        "data": data
    })

if __name__ == "__main__":
    app.run(debug=True)