import React from 'react';
import ReactDOM from 'react-dom';
import {ImageUtils} from '../utilities';

var createReactClass = require('create-react-class');

var ImageCanvas = createReactClass({

  getCanvasContext: function() {
    return ReactDOM.findDOMNode(this).getContext('2d');
  },

  componentDidMount: function() {
    if (this.props.image) {
      let context = this.getCanvasContext()
      this.paint(context);
    }
  },
  
  componentDidUpdate: function() {
    let context = this.getCanvasContext();
    context.clearRect(0, 0, this.props.width, this.props.height);
    this.paint(context);
  },


  paint: function(context) {
    context.save();
    ImageUtils.drawFitImage(this.props.image, context);
    context.restore();
  },

  render: function() {
    return <canvas className="gif-canvas" width={this.props.width} height={this.props.height} />;
  }

});

export default ImageCanvas;
