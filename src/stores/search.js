import { observable, action} from 'mobx'

class Search {
  @observable searchListFlag;

  constructor() {
    this.searchListFlag = false;
  }

  @action
  SetSearchListFlag = (flag)=>{
    this.searchListFlag=flag;
  }
}
export default Search;