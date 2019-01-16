import * as tf from '@tensorflow/tfjs';
import Models from './config/model/';

export default class Yolo {
  model;
  version;

  constructor(version) {
    this.version = version;
  }

  loadModel = async () => {
    this.model = await tf.loadModel(v3);
  }
}