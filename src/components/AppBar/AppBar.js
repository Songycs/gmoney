import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import AppBarItem from './AppBarItem'
import './AppBar.scss'
import { observer, inject } from 'mobx-react';
import {Region} from 'components'

const LOGO_BUTTON = { type:"LOGO",title: "", iconLogo: './images/logo.svg'};

@inject("store")
@observer
class AppBar extends Component {
    onClickOpenRegion=(e)=>{
        this.props.store.SetRegionFlag(!this.props.store.regionFlag);
    }

    render() {
        let mobile=this.props.store.getMobileClassName();
        return(
            <Container fluid className='appbar-container'>
                <Row className={`appbar ${mobile}`}>
                    <AppBarItem item={LOGO_BUTTON}/>
                    <Region/>
                </Row>
            </Container>
        );
    }
}
export default AppBar;
