import Feed from './pages/Feed/Feed';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">📱 SNS Feed</h1>
        </div>
      </header>
      <main className="main">
        <Feed />
      </main>
    </div>
  );
}
export default App;