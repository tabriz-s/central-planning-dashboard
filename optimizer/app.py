from flask import Flask, request, jsonify
from pulp import LpMaximize, LpProblem, LpVariable

app = Flask(__name__)

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.json # Get input data from frontend

    # Ex: Maximize profit with labor & raw materials
    product_A = LpVariable("Product_A", lowBound=0, cat="Integer")
    product_B = LpVariable("Product_B", lowBound=0, cat="Integer")

    problem = LpProblem("Production_Optimization", LpMaximize)
    problem += 40*product_A + 30*product_B # Objective (Profit) Function
    problem += 2*product_A + 1*product_B <= data["labor_hours"] # Labor constraint
    problem += 3*product_A + 2*product_B <= data["materials"] # Materials constraint
    
    problem.solve()

    return jsonify({
        "Product_A": product_A.varValue,
        "Product_B": product_B.varValue,
        "Objective": problem.objective.value(),
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)