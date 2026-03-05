import pandas as pd

df = pd.read_csv("datasets/Titanic-Dataset.csv")
survived =df[df["Survived"]==1]
unsurvived =df[df["Survived"]==0]
survived.to_csv("saved_dataset/survived_dataset.csv",index=False)
unsurvived.to_csv("saved_dataset/unsurvived_dataset.csv" , index=False)