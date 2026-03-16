import pickle
import sys
import numpy as np
import json

# Load trained model
model = pickle.load(open("ml/crop_model.pkl", "rb"))

# Read inputs
N = float(sys.argv[1])
P = float(sys.argv[2])
K = float(sys.argv[3])
temperature = float(sys.argv[4])
humidity = float(sys.argv[5])
ph = float(sys.argv[6])
rainfall = float(sys.argv[7])

data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])

# Predict crop
prediction = model.predict(data)[0]

# Get probability for all crops
probabilities = model.predict_proba(data)[0]
classes = model.classes_

results = []

for i in range(len(classes)):
    results.append({
        "crop": classes[i],
        "probability": float(probabilities[i])
    })

# Sort by probability
results = sorted(results, key=lambda x: x["probability"], reverse=True)

top3 = results[:3]

output = {
    "prediction": prediction,
    "top3": top3
}

print(json.dumps(output))