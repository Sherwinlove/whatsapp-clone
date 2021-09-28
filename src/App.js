import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function App() {
  return (
    //BEM naming convention
    <div className="app">
      {/* <h1>Let's Build a WhatsApp Clone</h1> */}
    <div className="app__body">
      <Router>
        <Sidebar />
          <Switch>
            <Route path ="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
