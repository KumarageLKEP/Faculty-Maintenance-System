
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";

import AppRoutes from "./AppRoutes";
import './App.css';
import Footer from "./Components/Footer/Footer";

function App() {
  

  

  return (
    <Router>
      <div className="App">
        <Header/>
        <AppRoutes />
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
