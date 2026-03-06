from flask import Flask ,request,jsonify
from flask_cors import CORS 
import pandas as pd 
import numpy as np

app =Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def display_data():
    file = request.files.get('file')
    if(file):
        df =pd.read_csv(file)
        print(df.head())
        df.replace({np.nan:None})
        result= df.head().to_dict(orient="records")
        return jsonify({
            "data":result
        })
        
    else:
        return jsonify({
        "message":"no file deen uploaded"
        })


if __name__ =="__main__":
    app.run(debug=True)