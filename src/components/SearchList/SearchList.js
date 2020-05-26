import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
        this.props.store.search.SetSearchListFlag(!this.props.store.search.searchListFlag);
    }
    render() {
        var btnOpen={type:1,iconSrc:'./images/keyboard_arrow_up-24px.svg'}
        let mobile=this.props.store.util.getMobileClassName();
        return(
            <Container fluid className={`searchlist-container ${mobile}`}>
                <SearchListItem item={btnOpen} onClick={this.onClickOpen}/>
                {this.props.store.search.searchListFlag&&
                    <Row className='searchlist-result'>
                        
                    </Row>
                }
            </Container>
        )
    }
}
export default SearchList;