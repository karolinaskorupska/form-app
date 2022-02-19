import logo from "./logo-heycloud-white.png";
import './App.css';
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo"/>
      </header>
      <main className="App-main">
        <Form/>
      </main>
    </div>
  );
}

export default App;
