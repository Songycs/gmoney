import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {MapItem,isMobile} from 'components'
import { observer, inject } from 'mobx-react';
import './Map.scss'
const { kakao } = window;

@inject("store")
@observer
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
        locations:[],
        geocoder:null,
        map:null
        }
    }
    async FirstLoad(){
        //GetFranchises('search_word','region','cate1','cate2')
        await this.props.store.franchises.GetFranchises('','파주','음식점','한식');
        await this.CreateMap();
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        var markerList = this.props.store.franchises.franchiseList;
        await this.props.store.map.SetMarkers(markerList,imageSrc);
    } 

    async CreateMap(){
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=da95929a40edbaa821402e4ba92c944d&autoload=false";
        document.head.appendChild(script);
        script.onload = () => {
            kakao.maps.load(() => {
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = { 
                    center:new kakao.maps.LatLng(37.76143559004246 , 126.78252600780544), // 지도의 중심좌표
                    level: 7 // map level
                }; 
                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다 
                this.props.store.map.SetMap(map);
                this.setState({map:map});
                //  max,min level set alloewed
                map.setMaxLevel(9);
                map.setCenter(this.props.store.map.currentLocation);
                // kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                //    var latlng = mouseEvent.latLng});
                }
             );
            }//script.onload
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    console.log("Creating map")
                    resolve('');
                },100);
            })
    }
    onClickCurrentLoaction=(e)=>{
        console.log("onClickCurrentLocation");
        var locPosition = new kakao.maps.LatLng(37.56812473178144, 126.9218518787957); //default or fail
        if (navigator.geolocation) {
            //success
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                locPosition = new kakao.maps.LatLng(lat, lon); //
                console.log(position);
                this.props.map.setCenter(locPosition);// 안됨
                console.log("found:", locPosition)
            });
        }
    }

    onClickCurrencyButton=(e)=>{
        console.log("onClickCurrencyButton");
    }

    onClickLocalButton=(e)=>{
        console.log("onClickLocalButton");
    }

    async componentDidMount(){
        this.FirstLoad();
    }//componentDidMount

    render() {
        var LOCAL_BUTTON={iconSrc:'./images/combined-shape.svg', title:'지역설정'}
        var SET_CUR_LOCATION_BUTTON={iconSrc:'./images/my-location.svg',title:'내 위치 보기'}
        var LOCAL_BUTTON_MOBILE={iconSrc:'./images/combined-shape-copy.svg'}        
        var CUR_LOCATION_BUTTON={iconSrc:'./images/locating.svg', title:'현재위치' , text:'경기도 용인시 처인구 중부대로 1199'}
        var SEARCH_LOCATION_EDIT={type:'EditText',text:'검색어를 입력해주세요'}
        var CURRENCY_BUTTON={iconSrc:'./images/base-money.svg',title:'기준화폐', text:'경기지역화폐'}

        let mobileFlag=isMobile.Android() || isMobile.iOS();
        return(
            mobileFlag?
            <Container fluid className={`map-container${mobileFlag ? '-mobile' : ''}`}>
                <Row className={`map${mobileFlag ? '-mobile' : ''}`}>                    
                    <div className ='map-display' id='map'/>
                    <Row className={'map-button-container-mobile'}>
                        <MapItem item={LOCAL_BUTTON_MOBILE} />
                        <MapItem item={SEARCH_LOCATION_EDIT}  classExt={'serach-edit-text'}/>
                    </Row>
                </Row>
            </Container>    
            :
            <Container fluid className={`map-container${mobileFlag ? '-mobile' : ''}`}>
                <Row className={`map${mobileFlag ? '-mobile' : ''}`}>                    
                    <div className ='map-display' id='map'/>
                    <Row className={'map-button-container'}>
                        <MapItem item={LOCAL_BUTTON} classExtForTitle={'green'} classExt={'local-btn'} onClick={this.onClickLocalButton}/>
                        <MapItem item={CUR_LOCATION_BUTTON} classExt={'cur-loc'} />
                        <MapItem item={CURRENCY_BUTTON} classExt={'currency-btn'} onClick={this.onClickCurrencyButton}/>
                        <MapItem item={SET_CUR_LOCATION_BUTTON} classExtForTitle={'white'} classExt={'set-cur-loc-btn'} onClick={this.onClickCurrentLoaction}/>
                    </Row>
                </Row>
            </Container>
        )
    }
}
export default Map;