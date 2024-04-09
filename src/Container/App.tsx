import { Header, Footer } from "../Components/Layout";
import { Home, MenuItemDetails, NotFound} from "../Pages";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Header></Header>
      <div  style={{paddingBottom:"80px"}}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/MenuItemDetails/:menuItemId" element={<MenuItemDetails></MenuItemDetails>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
