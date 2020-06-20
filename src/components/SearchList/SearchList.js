import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import {observe,observable} from 'mobx'
import './SearchList.scss'
import {SearchListItem} from 'components'

@inject("store")
@observer
class SearchList extends Component {
    @observable franchiseJSX;

    constructor(props){
        super(props);
        this.state = {
        }
        this.franchiseJSX2=[];

        //FOR UPDATE AUTOMATICALLY
     observe(this.props.store,(change=>{
        if(change.name==='franchiseList')
          {
            this.franchiseJSX = [];
            this.props.store.franchiseList.map((item)=>
                  {
                    item.type=2;
                    this.franchiseJSX.push((<SearchListItem item={item} onClick={(e)=>{this.handleClickItem(e)}}/>))
                    return null;
                  }
                  )//map
            // if(!this.props.store.searchListFlag)
            // this.props.store.searchListFlag=true;
          }
          }
      ))
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
                      {this.franchiseJSX}
                    </Row>                    
            </Container>
        )
    }
}
export default SearchList;