import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [labor, setLabor] = useState(10)
  const [materials, setMaterials] = useState(10)
  const [result, setResult] = useState(null)

  const optimize = async () => {
    const response = await axios.post("http://localhost:5000/api/optimize", {
       labor_hours: parseInt(labor),
       materials: parseInt(materials) 
      })
      setResult(response.data)
  }

  return (
      <div>
        <h1>Central Planning Dashboard</h1>
        <label>Labor Hours: </label>
        <input type="number" value={labor} onChange={(e) => setLabor(e.target.value)} />
        <br />
        <label>Materials: </label>
        <input type="number" value={materials} onChange={(e) => setMaterials(e.target.value)} />
        <br />
        <button onClick={optimize}>Optimize</button>
        {result && (
          <div>
            <h2>Results</h2>
            <p>Product A: {result.Product_A}</p>
            <p>Product B: {result.Product_B}</p>
            <p>Objective Function Value: {result.Objective}</p>
          </div>
        )}
      </div>
  )
}

export default App
