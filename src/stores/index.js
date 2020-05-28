
import Map from './map';
import Franchises from './franchises';
import Category from './category';
import Util from './util';

class Stores{
  constructor(){
    this.map = new Map();
    this.franchises = new Franchises();
    this.category = new Category();
    this.util = new Util();    
  }
}
export default Stores;