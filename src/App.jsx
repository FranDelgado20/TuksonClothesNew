import "aos/dist/aos.css";
import NavbarComp from "./components/NavbarComp";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import FooterComp from "./components/FooterComp";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavbarComp />
        <main className="mainSection">
          <RoutesViews />
        </main>
        <FooterComp />
      </div>
    </Router>
  );
};

export default App;
