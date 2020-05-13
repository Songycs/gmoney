import { observable, action, computed } from 'mobx'

const { kakao } = window;

class Map {
  @observable mapObject;
  @observable markers;
  @observable franchises;

  constructor() {
    this.CreateMap();
  }

  CreateMap = () => {
    console.log("store-createmap started;")
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=da95929a40edbaa821402e4ba92c944d&autoload=false";
    document.head.appendChild(script);
    script.onload = () => {
        console.log("store-script-onload started;")
        kakao.maps.load(() => {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center:new kakao.maps.LatLng(37.76143559004246 , 126.78252600780544), // 지도의 중심좌표
                level: 7 // map level
            }; 
            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다 
            this.mapObject = map;
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



  @action
  GetCenter = () => {
    console.log(this.mapObject.getCenter());
    //this.name = user.name;
  }

//   @action
//   isAdmin = () =>{
//     return (this.uid==="admin@zibezi.com" || this.uid==="pmw1130@gmail.com");//this.uid === "admin_zibezi";
//   }

//   @action
//   isLogin = () =>{
//     // return this.uid !== '' && this.name !== '';
//     return this.uid !== '';
//   }

//   @computed
//   get isLogined(){
//     return this.uid !== '';
//   }
}

export default Map