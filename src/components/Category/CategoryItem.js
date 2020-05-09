import React from '../../../node_modules/react';

class CategoryItem extends React.Component {
    constructor(props){
        super(props);        
    }
  render() {
    const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;
    switch (item.type){
        case 1:
            return (
                <div onClick={item.disable ? null : this.props.onClick} className={`category-title-container ${classExt}`}>
                    <img src={item.iconSrc} className={`category-title-icon ${classExtForImg}`} alt="icon" />
                    <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''} category-title-text`}>{item.title}</span>
                </div>
            );
        case 2:
            return (
                <div onClick={item.disable ? null : this.props.onClick} className={`category-item-container ${classExt}`}>
                    <span className={`${classExtForText ? `${classExtForText} ` : ''} category-item-text`}>{item.text}</span>
                </div>
            );
        case 3:
            return (
                <div onClick={item.disable ? null : this.props.onClick} className={`category-fold-container ${classExt}`}>
                    <img src={item.iconSrc} className={`category-title-icon ${classExtForImg}`} alt="icon" />
                </div>
            );
        case 4:
            return(
                <div onClick={item.disable ? null : this.props.onClick} className={`category-result-container ${classExt}`}>
                    <img src={item.iconSrc} className={`category-title-icon ${classExtForImg}`} alt="icon" />
                </div>
            )        
        default:
            break;
    }
  }
}

export default CategoryItem;