import { observable, action } from 'mobx'
import data from './Data.json'

class Category {
  @observable filterList;
  @observable categoryFlag;
  @observable searchListFlag;
  @observable categoryList;
  @observable listName;
  @observable searchKeyword;
  @observable regionFlag;
  @observable region;

  constructor() {
    this.filterList = [];
    this.listName="category_main";
    this.categoryList=data[this.listName];
    this.searchKeyword="";
    this.categoryFlag=false;
    this.regionFlag=false;
    this.region={region:"",text:"지역화폐를 선택해주세요"};
    this.searchListFlag = false;
  }
  @action
  AddFilter = (item) => {
    this.filterList = [...this.filterList, item];
  }
  @action
  RemoveFilter = (item) => {    
    this.filterList=this.filterList.filter(e => e !== item); 
  }

  @action
  ClearFilter = () => {
    this.filterList =[];
  }

  @action
  RemoveLastFilter = () => {
    this.filterList.pop();
  }

  @action
  RemoveSubFilter = () => {
    this.filterList=this.filterList.slice(0,1);
  }
  
  @action
  isMainCategory = () => {
    return this.listName == "category_main";
  }

  @action
  SetCategoryList = (name) => {
    this.listName=name;    
    this.categoryList=data[this.listName];
  }

  @action
  GetCurrentDepth = ()=>{
    return this.filterList.length;
  }

  @action
  SetCategoryFlag = (flag)=>{
    this.categoryFlag=flag;
  }

  @action
  GetSubCategoryById=(id)=>{
    switch(id){
        case 0:
            return "category_main"
        case 1:
            return "category_sub_food";                                
        case 2:
            return "category_sub_cafe";
        case 3:
            return "category_sub_market";
        case 4:
            return "category_sub_health";
        case 5:
            return "category_sub_gas";
        case 6:
            return "category_sub_mart";
        case 7:
            return "category_sub_living";
        case 8:
            return "category_sub_beauty";
        case 9:
            return "category_sub_book";
        case 10:
            return "category_sub_culture";
        case 11:
            return "category_sub_leisure";
        case 12:
            return "category_sub_pashion";
        case 13:
            return "category_sub_academy";
        case 14:
            return "category_sub_car";
        case 15:
            return "category_sub_electronic";
        case 16:
            return "category_sub_hotel";
        case 17:
            return "category_sub_construct";
        case 18:
            return "category_sub_etc";
        default:
            return "";
    }
  }

  @action
  GetRegionList = () =>{
    return data["region_list"];
  }
}

export default Category;