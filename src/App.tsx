import './App.css';
import Book from './components/Book/Book';
import SearchBar from './components/SearchBar/SearchBar';
import SideBar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="header">
        <img src="/icon-site.png" alt="library icon" width="100px" className="header-img" />
        <div className="header-title">
          <span>Library</span>
          <span>App</span>
        </div>
      </div>
      <SearchBar />
      <div className="books-grid">
        <Book />
      </div>
    </div>
  );
}

export default App;
