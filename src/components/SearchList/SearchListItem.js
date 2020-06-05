import React, { Component} from 'react';
import { observer, inject } from 'mobx-react';
import './SearchList.scss'
import {Link} from 'react-router-dom';

@inject("store")
@observer
class SearchListItem extends Component {  
    render() {
        const { item, classExt} = this.props;        
        let mobile=this.props.store.getMobileClassName();
        var selected=this.props.store.searchListFlag?'selected':'';
        switch(item.type){            
            case 1://HeaderButton
                return(
                    <div onClick={item.disable ? null : this.props.onClick} className={`searchlist-open ${mobile} ${classExt}`} >
                        <span className={`text`} >{selected?'목록닫기':'목록보기'}</span>
                        <img alt={'Arrow'} src={'./images/keyboard_arrow_up-24px.svg'} className={`icon ${selected}`}/>
                    </div>
                )
            case 2://ListButton
                return(
                    <div onClick={item.disable ? null : this.props.onClick} className={`searchlist-result-container ${classExt}`}>
                        <div className='body'>
                            <div className='category'>{item.cate2}</div>
                            <div className='name'>{item.name}</div>
                            <div className='distance'>{this.props.store.GetDistance(item.lat,item.long)}</div>
                            <div className='address'>{item.add}</div>
                            <div className='phone'>{item.phone}</div>
                        </div>
                        <img alt={'Path'} className='path' src='./images/finding-away-b.svg'></img>
                        <a href={`https://map.kakao.com/link/to/${item.name}/${item.lat},${item.long}`}>
                            <img alt={'Share'} className='share' src='./images/share.svg'></img></a>
                    </div>
                )
            default:
                return(
                    <div/>
                )
        }
        
    }
}
export default SearchListItem;