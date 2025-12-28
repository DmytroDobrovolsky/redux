import './App.css';
import { store } from './app/store'
import { Provider } from 'react-redux'
import PostPage from './components/PostPage/PostPage';


function App() {
  return (
       <Provider store={store}>
    <div className="App">
      <PostPage/>
      
    </div>
    </Provider>
  );
}

export default App;
