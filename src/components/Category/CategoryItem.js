import React from '../../../node_modules/react';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class CategoryItem extends React.Component {
    constructor(props){
        super(props);        
    }
  render() {
    const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;
    switch (item.type){
        case 1://카테고리 타이틀
            return (
                <div onClick={item.disable ? null : this.props.onClick} className={`category-title-container ${classExt}`}>
                    <img src={item.iconSrc} className={`category-title-icon ${classExtForImg}`} alt="icon" />
                    <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''} category-title-text`}>{item.title}</span>
                </div>
            );
        case 2://카테고리 버튼
            return (
                <div onClick={item.disable ? null : this.props.onClick} className={`category-button ${classExt}`}>
                    <span className={`${classExtForText ? `${classExtForText} ` : ''} category-button-text`}>{item.text}</span>
                </div>
            );
        case 3://접기 펼치기
            return (
                <div onClick={item.disable ? null : this.props.onClick} className={`category-fold-container ${classExt}`}>
                    <img src={item.iconSrc} className={`category-title-icon ${classExtForImg}`} alt="icon" />
                </div>
            );
        case 4://필터링결과 아이템
            if(item.isInit){//처음시작
                return(
                    <div className={`category-result-container-init ${classExt}`}>                        
                        <div className={'init-text'}>
                            경기지원화폐, 어디서 쓸 수 있지?<br/>
                            경기도 방방곳곳<br/>
                            콕콕 찝어 알려드릴게요<br/>
                        </div>
                        <img className={'init-img'} src='./images/ef.png'/>
                    </div>
                );
            }
            else{
                return(
                    <div onClick={item.disable ? null : this.props.onClick} className={`category-result-container ${classExt}`}>
                        <div className='contents-wrapper'>
                            <div className='first-row'>
                                <div className='title'>{item.name}</div>
                                <div className='spliter'></div>
                                {/* <div className='distance'>내 위치에서 {item.distance}m</div> */}
                            </div>
                            <div className='info'>{item.address}</div>
                            <div className='info'>{item.phone}</div>
                        </div>
                        <img className='img-btn' src='./images/finding-away-b.svg'></img>
                        <img className='img-btn' src='./images/share.svg'></img>
                    </div>
                )    
            }
        case undefined:
            return(
                <div onClick={item.disable ? null : this.props.onClick} className={`category-result-container ${classExt}`}>
                    <div className='contents-wrapper'>
                        <div className='first-row'>
                            <div className='title'>{item.name}</div>
                            <div className='spliter'></div>
                            <div className='distance'>내 위치에서 {this.props.store.map.GetDistance(item.lat,item.long)}m</div>
                        </div>
                        <div className='info'>{item.address}</div>
                        <div className='info'>{item.phone}</div>
                    </div>
                    <img className='img-btn' src='./images/finding-away-b.svg'></img>
                    <img className='img-btn' src='./images/share.svg'></img>
                </div>
            )    
        default:
            break;
    }
  }
}

export default CategoryItem;