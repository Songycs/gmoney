import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {MapItem} from 'components'
import './Map.scss'

const LOCAL_BUTTON={iconSrc:'./images/combined-shape.svg', title:'지역설정'}
const CUR_LOCATION_BUTTON={iconSrc:'./images/locating.svg', title:'현재위치' , text:'경기도 용인시 처인구 중부대로 1199'}
const CURRENCY_BUTTON={iconSrc:'./images/base-money.svg',title:'기준화폐', text:'경기지역화폐'}
const SET_CUR_LOCATION_BUTTON={iconSrc:'./images/my-location.svg',title:'내 위치 보기'}

class MapButtons extends Component {
    constructor(props){
        super(props);
    }   

    componentDidMount() {

    }//componentDidMount

    render() {
        const {mobileFlag} = this.props;
        console.log(mobileFlag)
        return(
            <Container fluid >
                mobileFlag?
                <Row className={`map-button-container${mobileFlag ? '-mobile' : ''}`}>
                    <MapItem item={LOCAL_BUTTON}/>
                    <MapItem item={CUR_LOCATION_BUTTON}/>                    
                </Row>
                :
                <Row className={`map-button-container${mobileFlag ? '-mobile' : ''}`}>
                    <MapItem item={LOCAL_BUTTON} classExtForTitle={'green'}/>
                    <MapItem item={CUR_LOCATION_BUTTON} />
                    <MapItem item={CURRENCY_BUTTON}/>
                    <MapItem item={SET_CUR_LOCATION_BUTTON} classExtForTitle={'white'} classExt={'ref'}/>
                </Row>
            </Container>        
        )
    }
}
export default MapButtons;