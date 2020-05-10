import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {MapButtons} from 'components'
import axios from 'axios';
import './Map.scss'
const { kakao } = window;
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
        locations:[],
        }
        this._getFranchises = this._getFranchises.bind(this)
    }

    //call this as this._getFranchises('치킨','한식','파주');
    //limit 100
    //call _getFranchises('','','region') for initial page load/'This location'
    //call _getFranchises('','category','region'); for category
    //call _getFranchises('search_word','',''region); for search ;
    //call _getFranchises('','','') for whole franchises -> time out occured
    _getFranchises= async (search_word,category,region)=>{
        await axios
        .get(`https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/search?search_word=${search_word}&region=${region}&category=${category}`)
        .then(function(response) {
            //json string to json object
            let result = JSON.parse(response.data.body).body;
            console.log(result);
            //return or setState depending on functions, plz check console.log
        })
        .catch(function(error) {

          console.log('What happened? ' + error.response);
        });
    }        

    componentDidMount() {        
        this._getFranchises('초밥','','');
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=da95929a40edbaa821402e4ba92c944d&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = { 
                    center:new kakao.maps.LatLng(37.56812473178144 , 126.9218518787957), // 지도의 중심좌표
                    level: 3 // map level
                }; 
                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

                               
                
                //  max,min level set alloewed
                map.setMaxLevel(10);

                //check current location
                CurrentLocation();
                var locations = [
                    {
                        title: '낙원교회', 
                        latlng: new kakao.maps.LatLng(37.56811346426742, 126.91851271207138)
                    },
                    {
                        title: '성산교회', 
                        latlng: new kakao.maps.LatLng(37.569321734617006, 126.91988104702122)
                    },
                    {
                        title: '아임웹', 
                        latlng: new kakao.maps.LatLng(37.567612114842014, 126.92330126854371 )
                    },
                    {
                        title: '명성빌라',
                        latlng: new kakao.maps.LatLng(37.56702957142101,126.9211738778154)
                    }
                ];
                var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

                //default location 기준, 확인 시 현재위치찾기 끄기요망
                SetMarkers(locations, imageSrc);

                //set markers on map with locations(list), imageSrc(url / local etc)
                function SetMarkers(locations,imageSrc)
                {
                    for (var i = 0; i < locations.length; i ++) {
    
                        // marker size
                        var imageSize = new kakao.maps.Size(24, 35); 
                        // make markerImage
                        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                        
                        // make marker
                        var marker = new kakao.maps.Marker({
                            map: map, // 마커를 표시할 지도
                            position: locations[i].latlng, // 마커를 표시할 위치
                            title : locations[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            image : markerImage // 마커 이미지 
                        });
                    }

                }
                function CurrentLocation()
                {
                    
                    var locPosition = new kakao.maps.LatLng(37.56812473178144, 126.9218518787957); //default or fail
                    if (navigator.geolocation) {
                        //success
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var lat = position.coords.latitude, // 위도
                                lon = position.coords.longitude; // 경도
                            locPosition = new kakao.maps.LatLng(lat, lon); //
                            map.setCenter(locPosition);
                            console.log("found:", locPosition)
                        });
                        
                    } 
                    //fail to load geolocation / custom overlay가능
                    // else { 
                            //https://apis.map.kakao.com/web/sample/customOverlay2/

                    //     locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
                    //     console.log(locPosition) 
                    // }
    
                }

                function GetDistance(loc1,loc2){
                    //https://aljjabaegi.tistory.com/431
                }

                //click event listener
                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                    // 클릭한 위도, 경도 정보를 가져옵니다 
                   var latlng = mouseEvent.latLng;
                   map.setCenter(latlng);
                    //set another events
                });
                }
             );
            }//script.onload
        }//componentDidMount

    
    render() {
        const {mobileFlag} = this.props;
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
