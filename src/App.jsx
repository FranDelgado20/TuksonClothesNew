import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import NavbarComp from "./components/NavbarComp";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import FooterComp from "./components/FooterComp";



const App = () => {
  return (
   <Router>
    <div className="App">
      <div  >

      <NavbarComp/>

      </div>
      <main className="mainSection">
        <RoutesViews/>
      </main>
      <div>
        <FooterComp/>
      </div>
    </div>
   </Router>
  )
}

export default App