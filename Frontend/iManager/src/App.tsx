import './App.css'
import { Route, Routes } from 'react-router-dom'
import { RequiredAuth } from './contexts/auth/RequiredAuth'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Footer from './components/Footer/Footer'
import AddProduct from './pages/AddProduct/AddProduct'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<RequiredAuth><Home/></RequiredAuth>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<RequiredAuth><Home/></RequiredAuth>}/>
        <Route path='/profile' element={<RequiredAuth><Profile/></RequiredAuth>}/>
        <Route path='/add-product' element={<RequiredAuth><AddProduct/></RequiredAuth>}/>
      </Routes>
    </div>
  )
}

export default App;