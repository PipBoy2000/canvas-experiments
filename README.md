This is a React App that takes images, loads them into a HTML5 canvas and then uses animation to mimic a slideshow.

If I had to do this all over again, I would probably try to use REACT-CANVAS [https://github.com/Flipboard/react-canvas] as it seemed as if I duplicated some of how they approached this problem and they probably did it way better. But I only figured this out after I was almost done building this. 

Basically, the work horse here is src/components/ImageGIFView. It handles the image uploading and animated pushing of the relevent image to `src/components/ImageCanvas`
