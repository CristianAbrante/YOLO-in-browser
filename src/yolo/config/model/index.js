const modelsPath = "/src/yolo/config/model/";

/**
 * Models path are exported because tf.loadModel
 * expects a URL instead the actual json config
 * file.
 */
export default {
  tiny: {
    v1: modelsPath + "v1_tiny.json",
    v2: modelsPath + "v2_tiny.json",
    v3: modelsPath + "v3_tiny.json"
  },
  v3: modelsPath + "v3.json"
}