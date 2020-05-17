import { observable, action, computed, toJS} from 'mobx'
const { kakao } = window;

class Map {
  @observable mapObject;
  @observable markers;
  @observable currentLocation;
  @observable currentRegion;
  @observable currnetAddress;
  @observable currentMarkers;

  constructor() {
    this.mapObject = null;
    this.currentLocation = '';
    this.currentRegion = '';
    this.currentAddress = '';
    this.currentMarkers = [];
    this.CurrentLocation();
  }
  @action
  SetMap = (map) =>
  {
    this.mapObject = map;
  }
  GetMap = () =>
  {
    return this.mapObject;
  }
  @action
  GetCenter = () => {
    return this.currentLocation;
  }
  @action
  SetCenter = (loc) => {
    var map = this.mapObject;
    this.mapObject.setCenter(loc)
  }
  @action
  GetLocation = () => {
    return this.currentLocation;
  }
  @action
  SetLocation = (loc) => {
    this.currentLocation = loc;
  }
  @action
  CurrentLocation = async () => {

    var locPosition = new kakao.maps.LatLng(37.56812473178144, 126.9218518787957); //default or fail
    var geocoder = new kakao.maps.services.Geocoder();
    var callback = (result,status) =>{
        if(status === kakao.maps.services.Status.OK){
            //구 찾기 
            this.currentAddress =result[1].address_name;
            this.currentRegion = result[1].region_2depth_name;
        }
    }
    if (navigator.geolocation) {
         await navigator.geolocation.getCurrentPosition(function(position){
             var lat = position.coords.latitude, // 위도
                 lon = position.coords.longitude; // 경도
             locPosition = new kakao.maps.LatLng(lat, lon); //
             searchAddrFromCoords(locPosition,callback)  
            });
     }
     else {
     }
     this.currentLocation = locPosition;
     function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }
    }

    @action
    GetDistance = (lat,long) => {
      var center = this.currentLocation;
      var centerLat = center.getLat();
      var centerLong = center.getLng();
      var dLat = deg2rad(lat-centerLat);
      var dLon = deg2rad(long-centerLong);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(centerLat)) * Math.cos(deg2rad(lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = 6371 * c; // Distance in km
      return Math.round(d*1000);
      function deg2rad(deg) {
          return deg * (Math.PI/180)
      }
    }
    @action
    SetMarkers = async (locations,imageSrc) => { 
      await this.ClearMarkers();
      var tmpMap = this.mapObject;
      var marker ;
      for (var i = 0; i < Object.keys(locations).length; i++) {
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
          this.currentMarkers.push(marker)
          marker.setMap(tmpMap);
      }
      return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('');
        },100);
    })      
   }
   @action
   ClearMarkers = ()=>{
    for(var i = 0; i<this.currentMarkers.length;i++)
      this.currentMarkers[i].setMap(null);
    this.currentMarkers = [];
    return new Promise(function(resolve,reject){
      setTimeout(function(){
          resolve('');
      },100);
  })    
  }
}

export default Map