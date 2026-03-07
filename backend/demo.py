# items =["apple","banana","grapes","onion","chilly","orange","guava","ginger","pineapple","garlic","mint"]

# cache={
    
# }
# cache["frequent"]=["apple"]
# # inp =str(input("enter the items :"))


# names = ["jeevan","ravan","raju","somesh","chintu"]
# data ={
    
# }
# inp =str(input("enter the name"))
# for keys, values in data.items():
#     if str(keys).lower() == inp:
#         print(keys,"found")
#     else:
#         data[inp]=inp
        


# print(data.items())
            
servers = ["Server1", "Server2", "Server3"]

requests = ["Req1", "Req2", "Req3", "Req4", "Req5", "Req6"]

index = 0

for req in requests:
    server = servers[index]
    print(req, "handled by", server)
    index = (index + 1) % len(servers)
            
        
    

