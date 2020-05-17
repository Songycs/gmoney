import { observable, action } from 'mobx'
import data from './Data.json'

class Category {
  @observable filterList;
  @observable categoryList;
  @observable listName;

  constructor() {
    this.filterList = [];
    this.listName="category_main";
    this.categoryList=data["category_main"];
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
  GetCategoryList = () => {
    return this.categoryList;
  }

  @action
  isMainCategory = () => {
    return this.listName == "category_main";
  }

  @action
  SetCategoryList = (name) => {        
    this.categoryList=data[name];    
  }

  @action
  SetCategoryName = (name) =>{
    this.listName = name;
  }

  @action
  GetCurrentDepth=()=>{
    return this.filterList.length;
  }

}

export default Category;