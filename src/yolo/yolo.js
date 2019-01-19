import * as tf from '@tensorflow/tfjs';
import postprocess from './postprocess';
import Config from './config';

export default class Yolo {
  static MAX_BOXES = 20;
  static INPUT_SIZE = 416;
  static SCORE_THRESHOLD = .5;
  static IOU_THRESHOLD = .3;

  model;
  config;

  constructor(versionName) {
    this.config = Yolo.getModelConfig(versionName)
  }

  loadModel = async () => {
    this.model = await tf.loadModel(this.config.model);
  };

  async predict(image) {
    let outputs = tf.tidy(() => {
      const canvas = document.createElement('canvas');
      canvas.width = Yolo.INPUT_SIZE;
      canvas.height = Yolo.INPUT_SIZE;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, Yolo.INPUT_SIZE, Yolo.INPUT_SIZE);

      let imageTensor = tf.fromPixels(canvas, 3);
      imageTensor = imageTensor.expandDims(0).toFloat().div(tf.scalar(255));
      return this.model.predict(imageTensor);
    });

    const boxes = await postprocess(
        this.config.name,
        outputs,
        this.config.anchors,
        this.config.classes.length,
        this.config.classes,
        [image.height, image.width],
        Yolo.MAX_BOXES,
        Yolo.SCORE_THRESHOLD,
        Yolo.IOU_THRESHOLD,
    );
    tf.dispose(outputs);
    return boxes;
  }

  static getModelConfig(versionName) {
    if (Config[versionName] === undefined)
      throw new Error('undefined model config: ' + versionName);

    return Config[versionName];
  }
}