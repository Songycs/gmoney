import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppBarItem from './AppBarItem'
import './AppBar.scss'

const CURRENCY_BUTTON = { title: "기준화폐" , iconSrc: './images/base-money.svg' , text: "경기지역"};
const LOGO_BUTTON = { title: "", iconSrc: './images/logo.svg'};
const EDITOR_BUTTON = { title: "경기콕콕을 만든 사람들", iconSrc: './images/arrow_right.svg' };

class AppBar extends Component {
    constructor(props){
        super(props);        
    }
    render() {        
        const {mobileFlag} = this.props;
        return(            
            <Container fluid>
                <Row className={`appbar-container${mobileFlag ? '-mobile' : ''}`}>
                    {
                        mobileFlag
                            ?
                            <div className='appbar'>                                
                                <AppBarItem item={LOGO_BUTTON}/>
                                <AppBarItem item={CURRENCY_BUTTON} classExtForTitle={'ref-currency'} classExtForText={'ref-currency-text'}/>
                            </div>
                            :
                            <div className='appbar'>
                                <AppBarItem item={LOGO_BUTTON}/>
                                <AppBarItem item={EDITOR_BUTTON} classExt={'row-reverse'} classExtForTitle={'editor-link'}/>                                                          
                            </div>
                    }
                </Row>
            </Container>
        );
    }
}
export default AppBar;
