import logo from "./logo.svg";
import "./App.css";
import CRUDProduct from "./components/CRUDProduct";
function App() {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossorigin="anonymous"
        ></link>
      </head>
      <div className="App">
        <CRUDProduct></CRUDProduct>
      </div>
    </html>
  );
}

export default App;
