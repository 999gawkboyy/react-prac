import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Nav from './navigator';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Counter from './Counter';
import Chat from './chat';
import { UserProvider } from './UserContext';

const CounterWrapper = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <h3>Hello World!</h3>
    </div>
  );
}

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/counter' exact Component={CounterWrapper}/>
          <Route path='/chat' exact Component={Chat} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
