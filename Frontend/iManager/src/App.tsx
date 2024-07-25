import './App.css'
import { Route, Routes } from 'react-router-dom'
import { RequiredAuth } from './contexts/auth/RequiredAuth'
import Login from './pages/Login/Login'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<RequiredAuth><Login/></RequiredAuth>}/>
      </Routes>
    </div>
  )
}

export default App;