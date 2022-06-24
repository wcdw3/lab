import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FindAtomPage from './pages/find-atom/FindAtomPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '16px'}}>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />}/>
          <Route path="find-atom" element={<FindAtomPage />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
