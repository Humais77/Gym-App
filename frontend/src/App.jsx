import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Fouter from './components/Footer.jsx';
import About from './pages/About.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminHomePage from './pages/Admin/AdminHomePage.jsx';
// import AdminLayout from './components/Admin/AdminLayout.jsx';
function App(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route element={<PublicRoute/>}>
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
        </Route>
        <Route path='/admin' element={<PrivateRoute role='admin'></PrivateRoute>}>
          <Route index element={<AdminHomePage/>}/>
        </Route>
      </Routes>
      <Fouter/>
    </BrowserRouter>
  )
}
export default App; 