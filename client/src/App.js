import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home' //first page displaying all albums and image previews
import Album from './Album' //photo preview page with sidebar navigation
import Picture from './Picture' //individual photos are displayed here
//css styling has also been broken up among the components for ease of reading and to avoid calling styles that won't be used

class App extends Component {
  render() {
    return (
      <Router>
        <Switch> 
          <Route exact path="/" component={Home}/>
          <Route exact path="/album/:albumid/:imageid" component={Picture} />
          <Route path="/album/:albumid" component={Album} />
        </Switch> 
      </Router> 
    ); //need an exact path to avoid rendering both the album and picture
  }
}

export default App;