import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import './Region.scss'
import {RegionItem} from 'components'

@inject("store")
@observer
class Region extends Component {    
    onClickOpen=(e)=>{        
        this.props.store.regionFlag=!this.props.store.regionFlag;        
    }
    handleClickRegion=(e,item)=>{
        //TODO 현위치화폐 버튼 클릭 시 동작
        this.props.store.regionFlag=!this.props.store.regionFlag;
        this.props.store.region=item;
        this.props.store.RefreshResultList();
    }
    render() {
        var regionButton=this.props.store.GetRegionList().map((item,index)=>{
            return <RegionItem    
                        key={index}
                        item={item}
                        onClick={
                            (e)=>{
                                this.handleClickRegion(e,item)
                            }}/>
        })
        var btnOpen={type:1, text:this.props.store.region.text};        
        let mobile=this.props.store.getMobileClassName();
        var selected=this.props.store.regionFlag?'selected':'';
        return(
            <Container fluid className={`region-container ${mobile} ${selected}`}>
                <RegionItem item={btnOpen} onClick={this.onClickOpen}/>                
                <Row className={`region-list ${mobile} ${selected}`}>
                    {regionButton}
                </Row>
            </Container>
        )
    }
}
export default Region;