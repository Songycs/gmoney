import React from '../../../node_modules/react';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class CategoryItem extends React.Component {
    constructor(props){
        super(props);        
    }
  render() {
    const { item, classExt} = this.props;
    let searchPlaceholder="장소, 주소 입력"
    let mobile=this.props.store.util.getMobileClassName();
    switch (item.type){        
        case 2://카테고리 버튼
            return (
                <div onClick={item.disable ? null : this.props.onClick} className={`category-button-select`}>
                    <span className={`category-button-select-text`}>{item.text}</span>
                </div>
            );       
        case 3://카테고리 열기닫기 버튼
            return(
                <div onClick={item.disable ? null : this.props.onClick} className={`category-button-open ${mobile}`} >
                    <svg className={`${classExt} ${mobile}`} xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" >
                        <path fill="#00D597" fill-rule="evenodd" d="M15 10c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h14zm0-5c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h14zm0-5c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h14z"/>
                    </svg>
                </div>
            )
        case 4://검색창
            return(
                <div className={`category-input-container ${mobile}`}>
                    <input type="text" className={`category-input-search ${mobile}`} id="search" placeholder={searchPlaceholder} required="" />
                    <img className={`category-input-search-icon ${mobile}`} src="./images/search-24px.svg"/>
                </div>
            )
        default:
            break;
    }
  }
}

export default CategoryItem;