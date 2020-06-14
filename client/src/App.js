import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './style.css';
// my components
import Navbar from './components/Navbar'
import loginComp from './components/loginComp'
import registerComp from './components/registerComp'
import myBooksComp from './components/myBooksComp'
import createComp from './components/createComp'
import booksComp from './components/booksComp'
import homeComp from './components/homeComp'
import bookComp from './components/bookComp'
import editComp from './components/editComp'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/login' component={loginComp} />
          <Route path='/register' component={registerComp} />

          <Route path='/my-books' component={myBooksComp} />
          <Route path='/create' component={createComp} />

          <Route path='/books' component={booksComp} />
          <Route path='/book/:id' component={bookComp} />
          <Route path='/edit/:id' component={editComp} />
          <Route path='/' component={homeComp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
