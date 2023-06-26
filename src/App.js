import Details from "./Components/Details";
import AddMoivies from "./Components/AddMovies";
import Cards from "./Components/Cards";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import { createContext, useState} from "react";
import Login from "./Components/Login";
import Singup from "./Components/Singup";
import Edit from "./Components/Edit";

const Appstate = createContext();

function App() {
  const [login,setLogin]=useState(false);
  const [userName,setUserName]=useState('');
  const [user_id,setUserId] = useState('');
  const [role,setRole] = useState('');
  return (
    <Appstate.Provider value={{ login, userName,user_id,role, setLogin, setUserName,setUserId,setRole }}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMoivies />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/detail/edit/:id" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<Singup />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
