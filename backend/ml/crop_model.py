import sys

N = float(sys.argv[1])
P = float(sys.argv[2])
K = float(sys.argv[3])
temperature = float(sys.argv[4])
humidity = float(sys.argv[5])
ph = float(sys.argv[6])
rainfall = float(sys.argv[7])

if rainfall > 200:
    crop = "Rice"
elif temperature > 25 and humidity > 60:
    crop = "Maize"
elif ph < 6:
    crop = "Potato"
else:
    crop = "Wheat"

print(crop)