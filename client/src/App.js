import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to The Fib Calculator!</h1>
          {/* <Link to="/">Home</Link> */}
          {/* <Link to="/otherpage">Other Page</Link> */}
        </header>
        <div className="App-content">
          <Route exact path="/" component={Fib} />
          {/* <Route path="/otherpage" component={OtherPage} /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
