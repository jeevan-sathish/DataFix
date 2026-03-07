from flask import Flask,request
import requests

app=Flask(__name__)

server =[
    "http://localhost:5001",
     "http://localhost:5002",
      "http://localhost:5003",
]
index =0
@app.route('/')
def load_balancer():
    global index
    
    
    server =server[index]
    responce = requests.get(server)
    index =(index+1) % len(server)
    
    return responce.text

if __name__=="__main__":
    app.run(port=8000)