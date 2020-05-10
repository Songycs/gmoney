import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
const { kakao } = window;

const franchiseAPI = "https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/search?search_word=" 

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
        locations:[],
        franchises:[],
        center:null,
        geocoder:null,
        map : null
        }
        this._getFranchises = this._getFranchises.bind(this);
        this.CurrentLocation = this.CurrentLocation.bind(this);

    }

    //call this as this._getFranchises('치킨','한식','파주');
    //limit 100
    //call _getFranchises('','','region') for initial page load/'This location'
    //call _getFranchises('','category','region'); for category
    //call _getFranchises('search_word','',''region); for search ;
    //call _getFranchises('','','') for whole franchises -> time out occured
    _getFranchises= async (search_word,category,region)=>{
        let response = await axios.get(`${franchiseAPI}${search_word}&region=${region}&category=${category}`);
        this.setState({franchises:JSON.parse((await response).data.body).body})
        
        // await axios
        // .get(`https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/search?search_word=${search_word}&region=${region}&category=${category}`)
        // .then(function(response) {
        //     //json string to json object
        //     let result = JSON.parse(response.data.body).body;
        //     console.log(result);
        //     //return or setState depending on functions, plz check console.log
        // })
        // .catch(function(error) {
        //   console.log('What happened? ' + error.response);
        // });
    }       
    FirstLoad = async () => {
            var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            await this.CreateMap();
            await this._getFranchises('초밥','','파주')
            console.log(this.state.franchises);
            this.SetMarkers(this.state.franchises,imageSrc);
            this.GetDistances(37.54930614086602, 126.91356528952767);

    } 
        
    SetMarkers = async (locations,imageSrc) => { 
        let tmpMap = this.state.map;
        var marker ;
        for (var i = 0; i < Object.keys(locations).length; i++) {
            console.log("position ", i , " : ", locations[i].lat,locations[i].long);
            // marker size
            var imageSize = new kakao.maps.Size(24, 35); 
            // make markerImage
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            // marker
            var markerPosition  = new kakao.maps.LatLng(locations[i].lat,locations[i].long); 
            marker = new kakao.maps.Marker({
                map: tmpMap, // 마커를 표시할 지도
                position: markerPosition,  // 마커를 표시할 위치
                title : locations[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage, // 마커 이미지 
                clickable: true
            });
            marker.setMap(tmpMap);
            //check kakao api example marker info
        }      
     }

     CurrentLocation = async () => {
        var locPosition = new kakao.maps.LatLng(37.56812473178144, 126.9218518787957); //default or fail
        var tmpMap = this.state.map; 
        var geocoder = new kakao.maps.services.Geocoder();
        var callback = (result,status) =>{
            if(status === kakao.maps.services.Status.OK){
                //구 찾기 
                this.setState({region:result[1].region_2depth_name})
            }
        }
        if (navigator.geolocation) {
             await navigator.geolocation.getCurrentPosition(function(position){
                 var lat = position.coords.latitude, // 위도
                     lon = position.coords.longitude; // 경도
                 locPosition = new kakao.maps.LatLng(lat, lon); //
                 tmpMap.setCenter(locPosition);
                 searchAddrFromCoords(locPosition,callback)  
                });
         }
         function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }
         //fail to load geolocation 
         // else { 
                 //https://apis.map.kakao.com/web/sample/customOverlay2/

         //     locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
         //     console.log(locPosition) 
         // }  
     }     
     
     //from map center to other franchise 미터단위
     GetDistances = (lat,long) => {
            var center = this.state.map.getCenter();
            var centerLat = center.getLat();
            var centerLong = center.getLng();
            var dLat = deg2rad(lat-centerLat);
            var dLon = deg2rad(long-centerLong);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(centerLat)) * Math.cos(deg2rad(lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = 6371 * c; // Distance in km
            console.log("distance:",Math.round(d*1000));
            return Math.round(d*1000);

            function deg2rad(deg) {
                return deg * (Math.PI/180)
            }
        }
    

     CreateMap = () => {
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
                this.setState({map}) 
                //  max,min level set alloewed
                map.setMaxLevel(9);
                // zoom control
                var mapTypeControl = new kakao.maps.MapTypeControl();
                map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
                var zoomControl = new kakao.maps.ZoomControl();
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                this.CurrentLocation();
                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                    // 클릭한 위도, 경도 정보를 가져옵니다 
                   var latlng = mouseEvent.latLng;
                   console.log("latlng:",latlng)
                    //set another events
                });
                }
             );
            }//script.onload
     }



    async componentDidMount(){
        this.FirstLoad();
    }//componentDidMount

    
    render() {
        return(
            <Container fluid className="map-container">
                <Row className='map'>
                    <div className ='map-display' id='map'>
                        MapMap
                    </div>
                </Row>
            </Container>        
    )
    }
}
export default Map;