import { observable, action } from 'mobx'
import {isMobile} from 'components'
class Util {
  @observable mobileFlag;

  constructor() {
    this.mobileFlag = isMobile.Android() || isMobile.iOS();
  }    

  @action
  getMobileFlag = () => {
    return this.mobileFlag;
  }

  @action
  getMobileClassName = () =>{
    if(this.mobileFlag) return "mobile";
    else return "";
  }
}

export default Util;