import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {MapItem} from 'components'
import './Map.scss'

const LOCAL_BUTTON={iconSrc:'./images/combined-shape.svg', title:'지역설정'}
const SET_CUR_LOCATION_BUTTON={iconSrc:'./images/my-location.svg',title:'내 위치 보기'}

const LOCAL_BUTTON_MOBILE={iconSrc:'./images/combined-shape-copy.svg'}


class MapButtons extends Component {
    constructor(props){
        super(props);
    }   

    componentDidMount() {

    }//componentDidMount

    render() {
        const {mobileFlag} = this.props;
        var CUR_LOCATION_BUTTON={iconSrc:'./images/locating.svg', title:'현재위치' , text:'경기도 용인시 처인구 중부대로 1199'}
        var SEARCH_LOCATION_EDIT={type:'EditText',text:'검색어를 입력해주세요'}
        var CURRENCY_BUTTON={iconSrc:'./images/base-money.svg',title:'기준화폐', text:'경기지역화폐'}        
        if (mobileFlag){
            return (
                <Container fluid >                    
                    <Row className={'map-button-container-mobile'}>
                        <MapItem item={LOCAL_BUTTON_MOBILE} mobileFlag={mobileFlag}/>
                        <MapItem item={SEARCH_LOCATION_EDIT} mobileFlag={mobileFlag} classExt={'serach-edit-text'}/>
                    </Row>
                </Container>    
            )
        }
        else{
            return (
                <Container fluid >
                    <Row className={'map-button-container'}>
                        <MapItem item={LOCAL_BUTTON} classExtForTitle={'green'} classExt={'local-btn'} mobileFlag={mobileFlag}/>
                        <MapItem item={CUR_LOCATION_BUTTON} classExt={'cur-loc'} mobileFlag={mobileFlag}/>
                        <MapItem item={CURRENCY_BUTTON} classExt={'currency-btn'} mobileFlag={mobileFlag}/>
                        <MapItem item={SET_CUR_LOCATION_BUTTON} classExtForTitle={'white'} classExt={'set-cur-loc-btn'} mobileFlag={mobileFlag}/>
                    </Row>
                </Container>
            )
        }
    }
}
export default MapButtons;