import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import InquiryPage from "./InquiryPage";
import { Outlet } from "react-router-dom";
 import Page from "./Page";
import Showrequst from "./pages/super/showrequst";

function App() {
  return (
    <div className="App">
      <Header/>
    <Outlet/>
    <Footer/>
    </div>
  );
}

export default App;
