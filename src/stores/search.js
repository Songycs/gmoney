import { observable, action} from 'mobx'
import data from './Data.json'

class Search {
  @observable searchListFlag;
  @observable regionFlag;

  constructor() {
    this.searchListFlag = false;
    this.regionFlag=false;
  }

  @action
  SetSearchListFlag = (flag)=>{
    this.searchListFlag=flag;
  }

  @action
  SetRegionFlag = (flag) =>{
    this.regionFlag=flag;
  }

  @action
  GetRegionList = () =>{
    return data["region_list"];
  }
}
export default Search;