import logo from '../logo.svg'
import '../style/App.scss';
import YoutubeCloneApp from './Youtube-App';


function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className='m-3'>
            Welcome To Youtube App
          </h1>
          <YoutubeCloneApp />
        </header>
      </div>
    </>
  );
}

export default App;
