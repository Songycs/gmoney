import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppBarItem from './AppBarItem'
import './AppBar.scss'
import { observer, inject } from 'mobx-react';

const CURRENCY_BUTTON = { type:"CURRENCY",title: "기준화폐" , iconCurrency: './images/base-money.svg',iconDropDown:'./images/path-3.svg'};
const LOGO_BUTTON = { type:"LOGO",title: "", iconLogo: './images/logo.svg'};

@inject("store")
@observer
class AppBar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let mobile=this.props.store.util.getMobileClassName();
        return(
            <Container fluid className='appbar-container'>
                <Row className={`appbar ${mobile}`}>
                    <AppBarItem item={LOGO_BUTTON}/>
                    <AppBarItem item={CURRENCY_BUTTON} classExt={'currency-container'}/>
                </Row>
            </Container>
        );
    }
}
export default AppBar;
