import React from '../../../node_modules/react';
import {isMobile} from 'components'
import { observer, inject } from 'mobx-react';
import {toJS} from 'mobx';

@inject("store")
@observer
class MapItem extends React.Component {
  constructor(props){
    super(props);    
  }
  render() {
    const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;    
    let mobileClassName=this.props.store.util.getMobileClassName();    
    return (
      <div onClick={item.disable ? null : this.props.onClick} className={`map-item-container ${mobileClassName} ${classExt}`} >
        <img src={item.iconSrc} className={`map-item-icon${mobileClassName} ${classExtForImg}`}/>
        <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''}map-item-title ${mobileClassName}`}>{item.title}</span>
        <span className={`${classExtForText ? `${classExtForText} ` : ''}map-item-text ${mobileClassName}`}>{item.text}</span>
      </div>
    )
  }
}

export default MapItem;