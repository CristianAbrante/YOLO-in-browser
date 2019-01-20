import ViewsInfo from './views-info';
import ViewPicker from './ViewPicker';

class ViewsManager {
  model;
  viewsKeys;
  currentViewIndex;

  constructor(model) {
    this.model = model;
    this.viewsKeys = Object.keys(ViewsInfo);
    this.currentViewIndex = 0;
  }

  setCurrentView = index => {
    if (index < 0 || index >= this.viewsKeys.length)
      throw new Error('view index is not in range');

    this.currentViewIndex = index;
  };

  getCurrentViewsNames = () => {
    let names = [];
    for (let i = 0; i < this.viewsKeys.length; i++) {
      let key = this.viewsKeys[i];
      names.push(ViewsInfo[key].name);
    }
    return names;
  };

  getCurrentViewsIcons = () => {
    let icons = [];
    for (let i = 0; i < this.viewsKeys.length; i++) {
      let key = this.viewsKeys[i];
      icons.push(ViewsInfo[key].icon);
    }
    return icons;
  };

  getCurrentViewInfo = () => {
    return ViewsInfo[this.getCurrentViewKey()];
  };

  getCurrentViewKey = () => {
    return this.viewsKeys[this.currentViewIndex];
  };

  getCurrentViewComponent = () => {
    let info = this.getCurrentViewInfo();
    return ViewPicker[info.name](this.model);
  };
}

export default ViewsManager;