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
    onClickOpen=(e)=>{
        this.props.store.search.SetRegionFlag(!this.props.store.search.regionFlag);
    }
    handleClickRegion=(e,item)=>{

    }
    render() {
        var regionButton=this.props.store.search.GetRegionList().map((item,index)=>{
            return <RegionItem    
                        key={index}
                        item={item}
                        onClick={
                            (e)=>{
                                this.handleClickRegion(e,item)
                            }}/>
        })
        var btnOpen={type:1}
        let mobile=this.props.store.util.getMobileClassName();
        var selected=this.props.store.search.regionFlag?'selected':'';
        return(
            <Container fluid className={`region-container ${mobile} ${selected}`}>
                <RegionItem item={btnOpen} onClick={this.onClickOpen}/>
                {this.props.store.search.regionFlag&&
                <Row className={`region-list ${mobile}`}>
                    {regionButton}
                </Row>}
            </Container>
        )
    }
}
export default Region;