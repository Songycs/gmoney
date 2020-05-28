import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import './SearchList.scss'

@inject("store")
@observer
class SearchListItem extends Component {
    constructor(props){
        super(props);        
    }
    render() {
        const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;        
        let mobile=this.props.store.util.getMobileClassName();
        var selected=this.props.store.category.searchListFlag?'selected':'';
        switch(item.type){            
            case 1://HeaderButton
                return(
                    <div onClick={item.disable ? null : this.props.onClick} className={`searchlist-open ${mobile} ${classExt}`} >
                        <span className={`text`} >{selected?'목록닫기':'목록보기'}</span>
                        <img src={'./images/keyboard_arrow_up-24px.svg'} className={`icon ${selected}`}/>
                    </div>
                )
            case 2://ListButton
                return(
                    <div onClick={item.disable ? null : this.props.onClick} className={`searchlist-result-container ${classExt}`}>
                        <div className='body'>
                            <div className='category'>{item.cate}</div>
                            <div className='name'>{item.name}</div>
                            <div className='address'>{item.add}</div>
                            <div className='num'>{item.num}</div>
                        </div>
                        <img className='path' src='./images/finding-away-b.svg'></img>
                        <img className='share' src='./images/share.svg'></img>
                    </div>
                )
        }
        return(
            <div/>
        )
    }
}
export default SearchListItem;