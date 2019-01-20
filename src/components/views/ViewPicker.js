import React from 'react';
import ImageView from '../views/image/';
import VideoView from '../views/video/';

export default {
  image_view: model => <ImageView model={model}/>,
  video_view: model => <VideoView model={model}/>
}