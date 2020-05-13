import { observable, action, computed,toJS } from 'mobx'
import axios from 'axios';


const franchiseAPI = "https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/search?search_word=" 

class Franchises {
  @observable franchiseList;

  constructor() {
    this.franchiseList = [];
  }
  @action
  GetFranchises = async (search_word,category,region)=> {
    let response = await axios.get(`${franchiseAPI}${search_word}&region=${region}&category=${category}`);
    this.franchiseList = JSON.parse((response).data.body).body;
    return toJS(this.franchiseList);
        // await axios
        // .get(`https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/search?search_word=${search_word}&region=${region}&category=${category}`)
        // .then(function(response) {
        //     //json string to json object
        //     let result = JSON.parse(response.data.body).body;
        //     console.log(result);
        //     //return or setState depending on functions, plz check console.log
        // })
        // .catch(function(error) {
        //   console.log('What happened? ' + error.response);
        // });
  }  

  @action
  GetList = () => {
    return toJS(this.franchiseList);
  }
//   @computed
//   get isLogined(){
//     return this.uid !== '';
//   }
}

export default Franchises;