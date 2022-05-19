import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import RequireAuth from './Pages/RequireAuth';
import AddToDo from './Pages/AddToDo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/' element={
          <RequireAuth>
            <Home></Home>
          </RequireAuth>
        }></Route>
        <Route path='/home' element={
          <RequireAuth>
            <Home></Home>
          </RequireAuth>
        }></Route>
        <Route path='/addtodo' element={
          <RequireAuth>
            <AddToDo></AddToDo>
          </RequireAuth>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
