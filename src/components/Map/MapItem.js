import React from '../../../node_modules/react';

class MapItem extends React.Component {
  render() {
    const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;
    return (
      <div onClick={item.disable ? null : this.props.onClick} className={`map-item-container ${classExt}`}>
        <img src={item.iconSrc} className={`map-item-icon ${classExtForImg}`} alt="icon" />
        <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''}map-item-title`}>{item.title}</span>
        <span className={`${classExtForText ? `${classExtForText} ` : ''}map-item-text`}>{item.text}</span>
      </div>
    )
  }
}

export default MapItem;