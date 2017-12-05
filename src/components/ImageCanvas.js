import React from 'react';
import {ImageUtils} from '../utilities';

var createReactClass = require('create-react-class');

var ImageCanvas = createReactClass({

  canvasEl: null,

  getCanvasContext: function() {
    return this.canvas.getContext('2d');
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
    return <canvas className="gif-canvas"
      ref={(node) => {this.canvasEl = node;}}
      width={this.props.width}
      height={this.props.height} />;
  }

});

export default ImageCanvas;
