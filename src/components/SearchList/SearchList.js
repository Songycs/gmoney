import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import './SearchList.scss'
import {SearchListItem} from 'components'

@inject("store")
@observer
class SearchList extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    onClickOpen=(e)=>{
        this.props.store.searchListFlag=!this.props.store.searchListFlag;        
    }
    handleClickItem=(e)=>{

    }
    render() {        
        var btnOpen={type:1}
        let mobile=this.props.store.getMobileClassName();
        var selected=this.props.store.searchListFlag?'selected':'';        
        return(
            <Container fluid className={`searchlist-container ${mobile} ${selected}`}>
                <SearchListItem item={btnOpen} onClick={this.onClickOpen} />                    
                    <Row className={`searchlist-result ${selected}`}>
                        {this.props.store.franchiseList.map((item)=>{
                            item.type=2;
                            return <SearchListItem item={item} onClick={(e)=>{this.handleClickItem(e)}}/>})}
                    </Row>                    
            </Container>
        )
    }
}
export default SearchList;