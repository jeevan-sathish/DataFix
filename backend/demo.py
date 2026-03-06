# items =["apple","banana","grapes","onion","chilly","orange","guava","ginger","pineapple","garlic","mint"]

# cache={
    
# }
# cache["frequent"]=["apple"]
# # inp =str(input("enter the items :"))


names = ["jeevan","ravan","raju","somesh","chintu"]
data ={
    
}
inp =str(input("enter the name"))
for keys, values in data.items():
    if str(keys).lower() == inp:
        print(keys,"found")
    else:
        data[inp]=inp
        


print(data.items())
            
            
        
    

