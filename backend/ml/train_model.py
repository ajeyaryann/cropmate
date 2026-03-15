import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle

# Load dataset
data = pd.read_csv("Crop_recommendation.csv")

# Features
X = data.drop("label", axis=1)

# Target
y = data["label"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier()

model.fit(X_train, y_train)

# Check accuracy
accuracy = model.score(X_test, y_test)

print("Model Accuracy:", accuracy)

# Save model
pickle.dump(model, open("crop_model.pkl", "wb"))

print("Model saved successfully")