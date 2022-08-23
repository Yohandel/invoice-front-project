import logo from './logo.svg';
import './App.css';
import { Sidebar } from './components/sidebar/sidebar';

function App() {
  return (
    <>
    <div className='row'>
      <div className='col-md-6'>
      <Sidebar className='sidebar'></Sidebar>
      </div>
      <div className='col-md-6'>
      <div className="App">
      </div>
      </div>
    </div>

      
    </>
  );
}

export default App;
