import React from '../../../node_modules/react';

class AppBarItem extends React.Component {
  render() {
    const { item, classExt, classExtForImg, classExtForTitle, classExtForText  } = this.props;
    return (
      <div onClick={item.disable ? null : this.props.onClick} className={`appbar-item-container ${classExt}`}>
        <img src={item.iconSrc} className={`appbar-item-icon ${classExtForImg}`} alt="icon" />
        <span className={`${classExtForTitle ? `${classExtForTitle} ` : ''}appbar-item-title`}>{item.title}</span>
        <span className={`${classExtForText ? `${classExtForText} ` : ''}appbar-item-text`}>{item.text}</span>
      </div>
    )
  }
}

export default AppBarItem;