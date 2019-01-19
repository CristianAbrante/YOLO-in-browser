import * as tf from '@tensorflow/tfjs';
import Models from './config/model/';

export default class Yolo {
  model;
  version;
  isTiny;

  constructor(version, isTiny = true) {
    this.version = version;
    this.isTiny = isTiny;
  }

  loadModel = async () => {
    this.model = await tf.loadModel(this.getModelPath());
  };

  getModelPath = () => {
    Yolo.checkModelConfig(this.version, this.isTiny);
    return this.isTiny ? Models.tiny[this.version] : Models[this.version];
  };

  static checkModelConfig = (version, isTiny) => {
    if (isTiny) {
      if (Models.tiny[version] === undefined)
        throw new Error(version + ' tiny is not available');
    } else {
      if (Models[version] === undefined) {
        throw new Error(version + ' is not available');
      }
    }
  }
}