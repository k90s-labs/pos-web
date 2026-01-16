import { useState } from 'react'
import MembersPage from "./pages/MembersPage";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  return <MembersPage />;
}

export default App
