import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import {MapItem,Category,SearchList} from 'components'
import { observer, inject } from 'mobx-react';
import './Map.scss'
const { kakao } = window;

@inject("store")
@observer
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    async FirstLoad(){
        this.props.store.RefreshResultList();
        await this.CreateMap();
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        var markerList = this.props.store.franchiseList;
        await this.props.store.SetMarkers(markerList,imageSrc);
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
                this.props.store.SetMap(map);                
                //  max,min level set alloewed
                map.setMaxLevel(8);                
                // kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                //    var latlng = mouseEvent.latLng});
                this.props.store.SetCurrentLocation();
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
        var mapButton={type:1}      
        var locButton={type:2}      
        return(
            <Container fluid className='map-container'>
                <Row className={`map`} id='map'/>
                <Category/>
                <SearchList/>
                <MapItem item={mapButton} />
                <MapItem item={locButton} />
            </Container>
        )
    }
}
export default Map;