import React from 'react';
import { observer, inject } from 'mobx-react';
import {toJS} from 'mobx';

@inject("store")
@observer
class RegionItem extends React.Component {
  constructor(props){
    super(props);    
  }
  render() {
    const { item, classExt} = this.props;
    let mobile=this.props.store.util.getMobileClassName();
    var selected=this.props.store.category.regionFlag?'selected':'';    
    switch (item.type){
      case 1://openbutton
        return (
            <div onClick={item.disable ? null : this.props.onClick} className={`open ${mobile} ${selected}`}>
              <div className={'body'}>
                <img src={'./images/base-money.svg'} className={`icon`} alt="icon" />
                <span className={`text ${mobile}`}>{item.text}</span>
              </div>
              <img src={'./images/path-3.svg'}className={`dropdown ${mobile}`}/>
            </div>
        );
      case 2://selectbutton
        return (
          <div onClick={item.disable ? null : this.props.onClick} className={`region-item ${mobile} ${classExt}`} >
            {item.text}
          </div>
        )
    }
    return (<div/>);
  }
}

export default RegionItem;