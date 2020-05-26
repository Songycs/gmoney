
import Map from './map';
import Franchises from './franchises';
import Category from './category';
import Util from './util';
import Search from './search';

class Stores{
  constructor(){
    this.map = new Map();
    this.franchises = new Franchises();
    this.category = new Category();
    this.util = new Util();
    this.search = new Search();
  }
}
export default Stores;