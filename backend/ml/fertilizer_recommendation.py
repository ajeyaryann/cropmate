def recommend_fertilizer(nitrogen, phosphorus, potassium):

    fertilizer = ""
    reason = ""

    # Nitrogen check
    if nitrogen < 50:
        fertilizer = "Urea"
        reason = "Low Nitrogen detected. Urea helps increase nitrogen levels."

    # Phosphorus check
    elif phosphorus < 40:
        fertilizer = "DAP"
        reason = "Low Phosphorus detected. DAP improves root development."

    # Potassium check
    elif potassium < 40:
        fertilizer = "MOP"
        reason = "Low Potassium detected. MOP improves crop strength."

    else:
        fertilizer = "NPK Balanced Fertilizer"
        reason = "Soil nutrients are balanced. Use NPK for maintenance."

    return {
        "fertilizer": fertilizer,
        "reason": reason
    }


import sys

if __name__ == "__main__":

    nitrogen = float(sys.argv[1])
    phosphorus = float(sys.argv[2])
    potassium = float(sys.argv[3])

    result = recommend_fertilizer(
        nitrogen,
        phosphorus,
        potassium
    )

    print(result)