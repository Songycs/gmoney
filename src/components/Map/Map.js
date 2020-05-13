import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {MapButtons,isMobile} from 'components'
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
                // zoom control
                var mapTypeControl = new kakao.maps.MapTypeControl();
                map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
                var zoomControl = new kakao.maps.ZoomControl();
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
    async componentDidMount(){
        this.FirstLoad();
    }//componentDidMount
    render() {
        let mobileFlag=isMobile.Android() || isMobile.iOS();
        return(
            <Container fluid className={`map-container${mobileFlag ? '-mobile' : ''}`}>
                <Row className={`map${mobileFlag ? '-mobile' : ''}`}>                    
                    <div className ='map-display' id='map'>
                        MapMap
                    </div>
                    <MapButtons mobileFlag={mobileFlag}/>
                </Row>
            </Container>        
    )
    }
}
export default Map;