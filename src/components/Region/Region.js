import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import {observable,toJS} from 'mobx'
import './Region.scss'
import {RegionItem} from 'components'

@inject("store")
@observer
class Region extends Component {
    constructor(props){
        super(props);
        this.state = {            
        }        
    }
    componentDidMount(){

    }
    onClickOpen=(e)=>{        
        this.props.store.category.regionFlag=!this.props.store.category.regionFlag;        
    }
    handleClickRegion=(e,item)=>{
        //TODO 현위치화폐 버튼 클릭 시 동작
        this.props.store.category.regionFlag=!this.props.store.category.regionFlag;
        this.props.store.category.region=item;
    }
    render() {
        var regionButton=this.props.store.category.GetRegionList().map((item,index)=>{
            return <RegionItem    
                        key={index}
                        item={item}
                        onClick={
                            (e)=>{
                                this.handleClickRegion(e,item)
                            }}/>
        })
        var btnOpen={type:1, text:this.props.store.category.region.text};        
        let mobile=this.props.store.util.getMobileClassName();
        var selected=this.props.store.category.regionFlag?'selected':'';
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