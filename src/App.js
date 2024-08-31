import logo from './logo.svg';
import './App.css';

import NavBar from './view/navBar';
import PageContent from './view/pageContent'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div style={{zIndex:999}}>
           <NavBar />
      </div>
      <div  style={{height:'100vh', marginLeft:'40px'}}>
<Outlet/>
      </div>
 

    </div>
  );
}

export default App;
