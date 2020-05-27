import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import {observable,toJS} from 'mobx'
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
        this.props.store.search.SetSearchListFlag(!this.props.store.search.searchListFlag);
    }
    handleClickItem=(e)=>{

    }
    render() {
        var searchList=this.props.store.franchises.franchiseList.length==0?<div/>:toJS(this.props.store.franchises.franchiseList).map((item)=>{item.type=2;return <SearchListItem item={item} onClick={this.handleClickItem}/>});
        console.log(searchList);
        var btnOpen={type:1}
        let mobile=this.props.store.util.getMobileClassName();
        var selected=this.props.store.search.searchListFlag?'selected':'';
        return(
            <Container fluid className={`searchlist-container ${mobile} ${selected}`}>
                <SearchListItem item={btnOpen} onClick={this.onClickOpen} />
                {this.props.store.search.searchListFlag&&
                    <Row className='searchlist-result'>
                        <Col className='wrapper'>
                        {searchList}
                        </Col>                        
                    </Row>
                }
            </Container>
        )
    }
}
export default SearchList;