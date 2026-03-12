import pandas as pd
import numpy as np
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)

def remove_outliers(df):
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        
        df = df[(df[col] >= lower) & (df[col] <= upper)]
    
    return df

@app.route("/upload", methods=["POST"])
def upload():

    file = request.files.get("file")

    if not file:
        return jsonify({"error":"No file uploaded"}),400

    df = pd.read_csv(file)

    before_desc = df.describe(include="all").fillna("").to_dict()


    df = df.drop_duplicates()

    numeric_cols = df.select_dtypes(include=[np.number]).columns

    for col in numeric_cols:
        df[col] = df[col].fillna(df[col].mean())

    df = df.replace({np.nan:None})

    df = remove_outliers(df)

    after_desc = df.describe(include="all").fillna("").to_dict()

    buffer = io.StringIO()
    df.to_csv(buffer,index=False)
    buffer.seek(0)

    return jsonify({
        "data": df.head().to_dict(orient="records"),
        "before": before_desc,
        "after": after_desc,
        "csv": buffer.getvalue()
    })


if __name__ == "__main__":
    app.run(debug=True)