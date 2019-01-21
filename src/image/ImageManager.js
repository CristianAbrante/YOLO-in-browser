

class ImageManager {
  loadImage = (imageSrc, callback) => {
    let image = new Image();
    image.onload = () => {callback(image)};
    image.src = imageSrc;
  };

  loadImageFromInput = (input, callback) => {
    if (!input.files) {
      throw new Error('Your browser does not support file loader.');
    } else {
      let file = input.files[0];
      let fr = new FileReader();
      fr.onload = () => {this.loadImage(fr.result, callback)};
      fr.readAsDataURL(file);
    }
  }
}

export default ImageManager