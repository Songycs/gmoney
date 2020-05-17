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
    const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;
    switch(item.type){
      case 'search':
        return (              
          <div className="search-container">
            <input type="input" class="search-field" placeholder="가맹점" name="search" id='search' value={this.searchKeyword} onChange={this.inputChange} required />
            <label for="search" class="search-label">가맹점 검색</label>
            <img src="./images/search-24px.svg" onClick={this.props.onClick}></img>
          </div>
          
        )
      default:
        return (
          <div onClick={item.disable ? null : this.props.onClick} className={`appbar-item-container ${classExt}`}>
            <img src={item.iconSrc} className={`appbar-item-icon ${classExtForImg}`} alt="icon" />
            <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''}appbar-item-title`}>{item.title}</span>
            <span className={`${classExtForText ? `${classExtForText} ` : ''}appbar-item-text`}>{item.text}</span>
          </div>
        )
    }    
  }
}

export default AppBarItem;