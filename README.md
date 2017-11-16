This is a React App that takes images, loads them into a HTML5 canvas and then uses animation to mimic a slideshow.

If I had to do this all over again, I would probably try to use REACT-CANVAS [https://github.com/Flipboard/react-canvas] as it seemed as if I duplicated some of how they approached this problem and they probably did it way better. But I only figured this out after I was almost done building this. 

Some basic notes: I have gotten feed back from others that React.createClass was still the way to go as extending out Component will create components that have a lot of performance baggage. So I did that here. But, I can easily code with Component extentsions.  Also, I used Bootstrap CSS. Not so much for the look and feel but for the layout structure that they already have in place. In a real prod env I would use our own CSS platform.

Basically, the custom work horse here is `src/components/ImageGIFView`. It handles the image uploading and animated pushing of the relevent image to `src/components/ImageCanvas` while `src/compnents/SliderComponent` provides an input event hook for `ImageGIFView`. `ImageCanvas` & `SliderComponent` are full modular and reusable components that can be used for other applications.

I used the good old windows.requestFrameAnimation for timing the image drawing on the canvas. I also had to use a lot of callBacks with setState calls because things would happen far quicker than the state would be eventually updated. I do have a flag in state for no longer calling the animation should the component be dismounted, just to be on the memory leakage safe side.  

I could have used Redux, but I thought this was such a simple app that it would be extra boilerplate. 

TODO(s):

`ImageUtils.drawFitImage` would do its job well in resizing portrait vs landscape images for use within the canvas. But I had to set the canvas width and height to a very middle range size to produce a Lowest Common Denominator aspect ratio that would work with the least amount of jaggies (especially for portrait) for both extremes in viewport size (iPhone 6 vs desktop).  If I had more time, I would like to find some sort of library that would handle this better.
