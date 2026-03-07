from flask import Flask
import requests

app = Flask(__name__)



@app.route('/')
def load_balancer():
  


    return "hello world"


if __name__ == "__main__":
    app.run(debug=True)