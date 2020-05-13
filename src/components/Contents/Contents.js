import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Map,Category,isMobile} from 'components'
import { observer, inject } from 'mobx-react';
import './Contents.scss'

@inject('store')
@observer
class Contents extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }   

    componentDidMount() {

    }//componentDidMount

    render() {
        const store = this.props;
        let mobileFlag=isMobile.Android() || isMobile.iOS();
        return(
            <Container fluid>
                <Row className={`contents${mobileFlag ? '-mobile' : ''}`}>
                    <Map store={store} mobileFlag={mobileFlag}/>
                    <Category mobileFlag={mobileFlag}/>
                </Row>
            </Container>        
        )
    }
}
export default Contents;