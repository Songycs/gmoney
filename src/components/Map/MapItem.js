import React from '../../../node_modules/react';
import { observer, inject } from 'mobx-react';
import {toJS} from 'mobx';

@inject("store")
@observer
class MapItem extends React.Component {
  render() {
    const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;
    const {mobileFlag} = this.props;   
    console.log(item); 
    if (item.type=='EditText'){
        return(
            <div onClick={item.disable ? null : this.props.onClick} className={`map-item-container${mobileFlag ? '-mobile' : ''} ${classExt}`} >                
                <span className={`${classExtForText ? `${classExtForText} ` : ''}map-item-text${mobileFlag ? '-mobile' : ''}`}>{item.text}</span>
            </div>
        )
    }
    else if(item.type=='CurrentLocation'){
      return(
        <div onClick={item.disable ? null : this.props.onClick} className={`map-item-container${mobileFlag ? '-mobile' : ''} ${classExt}`} >
        <img src={item.iconSrc} className={`map-item-icon${mobileFlag ? '-mobile' : ''} ${classExtForImg}`}/>
        <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''}map-item-title${mobileFlag ? '-mobile' : ''}`}>{item.title}</span>
        <span className={`${classExtForText ? `${classExtForText} ` : ''}map-item-text${mobileFlag ? '-mobile' : ''}`}>{this.props.store.map.currentAddress}</span>
      </div>
      )
    }
    return (
      <div onClick={item.disable ? null : this.props.onClick} className={`map-item-container${mobileFlag ? '-mobile' : ''} ${classExt}`} >
        <img src={item.iconSrc} className={`map-item-icon${mobileFlag ? '-mobile' : ''} ${classExtForImg}`}/>
        <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''}map-item-title${mobileFlag ? '-mobile' : ''}`}>{item.title}</span>
        <span className={`${classExtForText ? `${classExtForText} ` : ''}map-item-text${mobileFlag ? '-mobile' : ''}`}>{item.text}</span>
      </div>
    )
  }
}

export default MapItem;