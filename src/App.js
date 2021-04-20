import './App.css';
import LogIn from './components/LogIn/LogIn';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './components/Home/Home';
import Inventory from './components/Inventory/Inventory';
import SignUp from './components/SignUp/SignUp';
import { useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
    error:""
});

  return (
    <UserContext.Provider value={[user,setUser]}>
    <Router>
      <Switch>
        <Route path="/login">
           <LogIn></LogIn>
        </Route>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/inventory">
          <Inventory></Inventory>
        </Route>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
