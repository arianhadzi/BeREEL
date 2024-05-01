import logo from './img/tvm-header-logo.png';
import './App.css';
import ShowList from './components/ShowList';
import Show from './components/Show';
import Home from './components/Home';
import {Route, Link, Routes} from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-title'>Welcome to the BeREEL</h1>
        <Link className='showlink' to='/shows'>
          Shows
        </Link>
      </header>
      <br />
      <br />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shows' element={<ShowList />} />
        <Route path='/shows/:id' element={<Show />} />
      </Routes>
    </div>
  );
};

export default App;
