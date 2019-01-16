
/**
 * Anchors are "proportions" of the bounding boxes that are
 * going to be predicted.
 *
 * They are used to estimate the actual width or height of
 * the final boxes, to a usual configuration.
 *
 * @type {{tiny: {v1: number[], v2: number[], v3: number[]}, v3: number[]}}
 */
export const anchors = {
  tiny: {
    v1: [1.08,1.19, 3.42,4.41, 6.63,11.38, 9.42,5.11, 16.62,10.52],
    v2: [0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828],
    v3: [10,14, 23,27, 37,58, 81,82, 135,169, 344,319],
  },
  v3: [10,13, 16,30, 33,23, 30,61, 62,45, 59,119, 116,90, 156,198, 373,326]
};

export const v3_masks = {
  "3": [[6, 7, 8], [3, 4, 5], [0, 1, 2]],
  "2": [[3, 4, 5], [1, 2, 3]]
};