import Header from "./Components/Header";
import CoreConcepts from "./Components/MiddleContent";
import TabContent from "./Components/TabContent";

function App() {
  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <TabContent />
      </main>
    </div>
  );
}

export default App;
