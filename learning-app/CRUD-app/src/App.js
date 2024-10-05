//  Bootstrap CSS
import "./css/bootstrap.min.css";
//  Medipro CSS
import "./css/normalize.css";
import "./css/style.css";
import "./css/responsive.css";

import RouterComponents from "./routes/RouterComponent";
import Header from "./common/layout/Header";

function App() {
  return (
    <>
      <Header />
      <RouterComponents />
    </>
  );
}

export default App;
