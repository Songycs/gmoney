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
    var selected=this.props.store.search.regionFlag?'selected':'';
    switch(item.type){
      case "LOGO":
        return (
          <img src={item.iconLogo} className={`logo ${mobile}`} alt="icon" />
        );
      case "CURRENCY":
        return (
            <div onClick={item.disable ? null : this.props.onClick} className={`currency ${mobile} ${selected}`}>
              <div className={'body'}>
                <img src={item.iconCurrency} className={`icon`} alt="icon" />
                <span className={`text ${mobile}`}>지역화폐를 선택해주세요</span>
              </div>
              <img src={item.iconDropDown}className={`dropdown ${mobile}`}/>
            </div>
        );
      default:
        return(<div/>);
    }
  }
}

export default AppBarItem;