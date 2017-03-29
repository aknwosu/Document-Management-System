import React from 'react';
import {render} from 'react-dom';
import Signup from './components/signup/signup.jsx';
import Login from './components/login/login.jsx';

class App extends React.Component {
 render () {
   return (
   <div>
   <div>
    <Signup  />
   </div>
   </div>
   );
 }
}

render(<App/>, document.getElementById('app'));