import sys
import json
import pickle
import numpy as np

# Load model
model = pickle.load(open("ml/crop_model.pkl", "rb"))

try:
    input_json = sys.argv[1]
    data = json.loads(input_json)

    features = np.array([[
        data["N"],
        data["P"],
        data["K"],
        data["temperature"],
        data["humidity"],
        data["ph"],
        data["rainfall"]
    ]])

    # Get probabilities
    probabilities = model.predict_proba(features)[0]

    # Get class labels
    classes = model.classes_

    # Get top 3 indices
    top_indices = np.argsort(probabilities)[-3:][::-1]

    # Get top 3 crops
    top_crops = [classes[i] for i in top_indices]

    # Convert to string
    result = ", ".join(top_crops)

    print(result)

except Exception as e:
    print("Error:", str(e))