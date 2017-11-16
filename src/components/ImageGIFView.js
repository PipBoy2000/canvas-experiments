import React from 'react';
import raf from 'raf';
import {ImageUtils} from '../utilities';
import ImageCanvas from './ImageCanvas';
import SliderComponent from './SliderComponent';

var imageLoadingCount; // not for virtual DOM state purposes
var createReactClass = require('create-react-class');

var ImageGIFView = createReactClass({

  getInitialState: function() {
    return {
      interval: 3500,
      lastFrameTime: 0,
      iteration: 0,
      intervalStep: .25,
      intervalMin: 0,
      intervalMax: 7,
      canvasBaseWidth: 1334,
      canvasBaseHeight: 750,
      imagesUploaded: false,
      keepAnimating: false,
      images: [],
      urls: this.props.urls,
      currentImage: new Image()
    }
  },

  componentWillMount: function() {
    imageLoadingCount = 0;
    ImageUtils.getImageFromUrl(this.state.urls[imageLoadingCount],
                              this.onImageLoad,
                              this.onImageLoad);
  },

  componentWillUnmount: function() {
      this.setState({keepAnimating: false});
  },

  animationFrame: function() {
    if (this.state.keepAnimating) {
      let now = Date.now();
      let runtime = (now - this.state.lastFrameTime);
      if (runtime > this.state.interval) {
        let iteration = (this.state.iteration > this.state.images.length-1)
                       ? 0
                       : this.state.iteration;
        let currentImage = this.state.images[iteration];
        let stateObj = { iteration: iteration+1,
                        currentImage,
                        lastFrameTime: now };
        this.setState(stateObj, function() {
          raf(this.animationFrame);
        });
      } else {
        raf(this.animationFrame);
      }
    }
  },

  onImageLoad: function( image = null ) {
    let callBack = function( ) {
      imageLoadingCount++;
      if (imageLoadingCount < this.state.urls.length ) {
        ImageUtils.getImageFromUrl(this.state.urls[imageLoadingCount],
                                  this.onImageLoad,
                                  this.onImageLoad);
      } else {
        let callBack = function() {
          raf(this.animationFrame);
        }
        this.setState({imagesUploaded: true,
                        currentImage: this.state.images[0],
                        startTime: 0,
                        keepAnimating: true},
                        callBack);
        }
    }

    if (image) {
      this.setState({images: [...this.state.images, image]}, callBack);
    } else {
      callBack.call(this);
    }
  },

  changeIncrementValue: function (value) {
    this.setState({interval: value * 1000});
  },

  render() {
    return (
      <div>
        {
          this.state.imagesUploaded === false ?
          <div className="jumbotron alert-danger">
            <h1>IMAGES DID NOT LOAD</h1>
            <h2>Check internet connectivity</h2>
          </div>
          :
          <div className="imageGIF-wrapper">
            <ImageCanvas
              image={this.state.currentImage}
              width={this.state.canvasBaseWidth}
              height={this.state.canvasBaseHeight}
            />
            <h3 className="interval-label">
              Current Interval: {this.state.interval / 1000}/sec
            </h3>
            <SliderComponent
                rangeValue={this.state.interval / 1000}
                changeHandler={this.changeIncrementValue}
                step={this.state.intervalStep}
                max={this.state.intervalMax}
                min={this.state.intervalMin}
             />
          </div>
        }
      </div>
    );
  }
});

export default ImageGIFView;
