import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Auth from './pages/Auth/Auth'
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import AllUsers from './pages/Dashboard/AllUsers/AllUsers';


function App() {


  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/allUsers' element={<AllUsers/>} />
      </Routes>
    <Sidebar/>
    <Footer/>
    </>
  )
}

export default App
