
import Map from './map';
import Franchises from './franchises';

class Stores{
  constructor(){
    this.map = new Map();
    this.franchises = new Franchises();
  }
}
export default Stores;