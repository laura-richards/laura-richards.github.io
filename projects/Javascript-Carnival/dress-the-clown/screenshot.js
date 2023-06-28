export function save(clown) {
    // create a canvas element the same size as the
    // images
    const canvas = document.createElement("canvas");
    canvas.width = 384;
    canvas.height = 612;
  
    // draw each source image onto the canvas
    const context = canvas.getContext("2d");
    context.drawImage(clown.shoes, 0, 0);
    context.drawImage(clown.body, 0, 0);
    context.drawImage(clown.head, 0, 0);
  
    // Get a blob from the canvas
    canvas.toBlob((blob) => {
      // get a url for that blob
      const url = URL.createObjectURL(blob);
  
      // create a link to that url
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = url;
      // the download attribute asks the browser to
      // save the file rather than navigate to it
      link.download = "saved-clown";
      link.style.display = "none";
      // fake a click to cause the download
      link.click();
    });
  }