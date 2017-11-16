import React from 'react';
import ImageGIFView from './components/ImageGIFView';
import './App.css';
var createReactClass = require('create-react-class');

var App = createReactClass({

  getInitialState: function() {
    return {
      containerWidth: 0,
      containerHeight: 0,
      urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/london.jpg',
        'http://www.93143.mrsite.com/USERIMAGES/sydmay09%20147%20copypw.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/paris.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/san-francisco.jpg']
    }
  },

  render() {
    return (
      <section className="App container text-center">
          <ImageGIFView
            urls = {this.state.urls}
          />
      </section>
    );
  }
});

export default App;
