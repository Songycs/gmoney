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
        switch(item.type){            
            case 1://HeaderButton
                return(
                    <div onClick={item.disable ? null : this.props.onClick} className={`searchlist-open ${mobile} ${classExt}`} >
                        <span>목록보기</span>
                        <img src={item.iconSrc} className={`searchlist-open-icon`}/>
                    </div>
                )
        }
        return(
            <div/>
        )
    }
}
export default SearchListItem;