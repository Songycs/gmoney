import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppBarItem from './AppBarItem'
import './AppBar.scss'
import { observer, inject } from 'mobx-react';
import {toJS} from 'mobx'

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

    handleSearch= async ()=>{
        console.log(this.props.store.category.GetCurrentDepth());
        if(this.props.store.category.GetCurrentDepth()===2)
            await this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,'파주',toJS(this.props.store.category.filterList[0].text),toJS(this.props.store.category.filterList[1].text));
        else if(this.props.store.category.GetCurrentDepth()===1)
            await this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,'파주',toJS(this.props.store.category.filterList[0].text),'');
        else 
            await this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,'파주','','');
        //var result =  this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,this.props.store.map.currentRegion,toJS(this.props.store.category.filterList[0].text),toJS(this.props.store.category.filterList[1].text));
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        var markerList = this.props.store.franchises.franchiseList;
        await this.props.store.map.SetMarkers(markerList,imageSrc);
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
