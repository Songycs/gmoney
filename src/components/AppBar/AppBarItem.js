import React from '../../../node_modules/react';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class AppBarItem extends React.Component {
  state={
    searchKeyword:''
  }
  inputChange=(e)=>{    
    this.props.store.category.searchKeyword=e.target.value;
  }
  render() {
    const { item, classExt} = this.props;
    let mobile=this.props.store.util.getMobileClassName();
    switch(item.type){
      case "LOGO":
        return (
          <div onClick={item.disable ? null : this.props.onClick} className={`appbar-item-container ${mobile} ${classExt}`}>
            <img src={item.iconLogo} className={`logo ${mobile}`} alt="icon" />
          </div>
        );
      case "CURRENCY":
        return (
          <div onClick={item.disable ? null : this.props.onClick} className={`appbar-item-container ${mobile} ${classExt}`}>
            <img src={item.iconCurrency} className={`currency-icon`} alt="icon" />
            <span className={`currency-text ${mobile}`}>{item.title}</span>
            <img src={item.iconDropDown}className={`currency-dropdown ${mobile}`}/>
          </div>
        );
      default:
        return(<div/>);
    }
  }
}

export default AppBarItem;