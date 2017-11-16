

export const ImageUtils = {
  drawFitImage: (imageObj = {}, context= {}) => {
    var canvas = context.canvas;
  	var imageAspectRatio = imageObj.width / imageObj.height;
  	var canvasAspectRatio = canvas.width / canvas.height;
  	var renderableHeight, renderableWidth, xStart, yStart;

  	if(imageAspectRatio < canvasAspectRatio) {
  		renderableHeight = canvas.height;
  		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
  		xStart = (canvas.width - renderableWidth) / 2;
  		yStart = 0;
  	} else if(imageAspectRatio > canvasAspectRatio) {
  		renderableWidth = canvas.width
  		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
  		xStart = 0;
  		yStart = (canvas.height - renderableHeight) / 2;
  	} else {
  		renderableHeight = canvas.height;
  		renderableWidth = canvas.width;
  		xStart = 0;
  		yStart = 0;
  	}
  	context.drawImage(imageObj, xStart, yStart,
      renderableWidth, renderableHeight);
  },
  loadImageUrl: function (url) {
    const imgPromise = new Promise(function imgPromise(resolve, reject) {
        const imgElement = new Image();

        imgElement.addEventListener('load', function imgOnLoad() {
            resolve(this);
        });
        imgElement.addEventListener('error', function imgOnError() {
            reject();
        })
        imgElement.src = url;
    });

    return imgPromise;
  },
  getImageFromUrl: function( url,
                    onLoadFunc = function(){},
                    onLoadFailureFunc= function(){} ) {
                      
   this.loadImageUrl(url).then(
      function fulfilled(img) {
          onLoadFunc(img);
      },
      function rejected() {
          console.log('That image was not found');
          onLoadFailureFunc();
      }
   );
  }
}
