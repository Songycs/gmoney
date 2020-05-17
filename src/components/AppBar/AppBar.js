import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppBarItem from './AppBarItem'
import './AppBar.scss'
import { observer, inject } from 'mobx-react';

const CURRENCY_BUTTON = { type:"normal", title: "기준화폐" , iconSrc: './images/base-money.svg' , text: "경기지역"};
const LOGO_BUTTON = { type:"normal", title: "", iconSrc: './images/logo.svg'};
const EDITOR_BUTTON = { type:"normal", title: "경기콕콕을 만든 사람들", iconSrc: './images/arrow_right.svg' };
const SEARCH = {type:'search'}

@inject("store")
@observer
class AppBar extends Component {
    constructor(props){
        super(props);        
    }

    handleSearch=()=>{
        console.log('handleSearch',this.props.store.category.searchKeyword);
    }

    render() {        
        return(            
            <Container fluid>
                <Row className={`appbar-container${this.props.store.util.getMobileFlag() ? '-mobile' : ''}`}>
                    {
                        this.props.store.util.getMobileFlag()
                            ?//mobile
                            <div className='appbar'>                                
                                <AppBarItem item={LOGO_BUTTON} classExtForImg={'logo-mobile'}/>
                                <AppBarItem item={CURRENCY_BUTTON} classExtForTitle={'ref-currency'} classExtForText={'ref-currency-text'}/>
                            </div>
                            ://desktop
                            <div className='appbar'> 
                                <AppBarItem item={LOGO_BUTTON} classExtForImg={'logo'}/>
                                <AppBarItem item={SEARCH} onClick={this.handleSearch}/>
                                <AppBarItem item={EDITOR_BUTTON} classExt={'row-reverse'} classExtForTitle={'editor-link'}/>                                                          
                            </div>
                    }
                </Row>
            </Container>
        );
    }
}
export default AppBar;
