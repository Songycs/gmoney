import React from '../../../node_modules/react';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class MapItem extends React.Component {  
  onClickZoomButton=(val)=>{
    this.props.store.mapObject.setLevel(this.props.store.mapObject.getLevel()+val);
  }
  onClickCurrentLocButton=async()=>{
    await this.props.store.SetCurrentLocation();    
  }
  render() {
    const { item} = this.props;    
    let mobile=this.props.store.getMobileClassName(); 
    switch(item.type){
      case 1://확대축소
        return (
          <div className={`map-button ${mobile}`} >
            <div className={`enlargement ${mobile}`} onClick={()=>{this.onClickZoomButton(-1)}}>+</div>
            <div className={`reduction ${mobile}`} onClick={()=>{this.onClickZoomButton(1)}}>-</div>
          </div>
        )
      case 2://현위치
        return (
          <div onClick={this.onClickCurrentLocButton} className={`map-loc ${mobile}`} >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path fill="#00D0BD" fillRule="evenodd" d="M9 0c4.963 0 9 4.037 9 9s-4.037 9-9 9-9-4.037-9-9 4.037-9 9-9zm-.158.636C4.406.718.805 4.269.64 8.684H3v.632H.64c.165 4.415 3.766 7.966 8.202 8.048v-2.206h.632v2.196c4.29-.24 7.725-3.728 7.887-8.038h-2.045v-.632h2.045C17.199 4.374 13.764.887 9.474.646v2.196h-.632zM9 5.684c1.831 0 3.316 1.485 3.316 3.316 0 1.831-1.485 3.316-3.316 3.316-1.831 0-3.316-1.485-3.316-3.316C5.684 7.169 7.17 5.684 9 5.684z"/>
            </svg>            
          </div>
        )
      default:
        return (<div/>)
    }
    
  }
}

export default MapItem;