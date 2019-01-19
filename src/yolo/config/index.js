import classes from './classes/';
import {anchors} from './anchors/';
import model from './model/';

export default {
  v1tiny: {
    name: "v1tiny",
    model: model.tiny.v1,
    classes: classes.voc,
    anchors: anchors.tiny.v1,
  },
  v2tiny: {
    name: "v2tiny",
    model: model.tiny.v2,
    classes: classes.coco,
    anchors: anchors.tiny.v2,
  },
  v3tiny: {
    name: "v3tiny",
    model: model.tiny.v3,
    classes: classes.coco,
    anchors: anchors.tiny.v3,
  },
  v3: {
    name: "v3",
    model: model.v3,
    classes: classes.coco,
    anchors: anchors.v3,
  }
}