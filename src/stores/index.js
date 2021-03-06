import data from './Data.json'
import { observable, action, toJS} from 'mobx'
import axios from 'axios';
import {isMobile} from 'components'

const { kakao } = window;
const franchiseAPI = "https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/search?search_word=" 
const boundAPI = "https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/bound?long="
class Stores {
  @observable franchiseList;
  @observable filterList;
  @observable categoryFlag;
  @observable searchListFlag;
  @observable categoryList;
  @observable listName;
  @observable searchKeyword;
  @observable regionFlag;
  @observable region;
  @observable mobileFlag;
  @observable mapObject;
  @observable markers;
  @observable currentLocation;  
  @observable currnetAddress;
  @observable currentMarkers;
  @observable currentLocationLoad;

  constructor() {
    this.filterList = [];
    this.franchiseList = [];
    this.selectFranchise=undefined;    
    this.listName="category_main";
    this.categoryList=data[this.listName];
    this.searchKeyword="";
    this.categoryFlag=false;
    this.regionFlag=false;
    this.region={region:"",text:"지역화폐를 선택해주세요"};
    this.searchListFlag = false;
    this.mobileFlag = isMobile.Android() || isMobile.iOS();
    this.mapObject = null;
    this.currentLocation ='';    
    this.currentAddress = '';
    this.currentMarkers = [];
    this.currentLocationLoad = false;    

    // //FOR UPDATE AUTOMATICALLY
    //  observe(this,(change=>{
    //   if(change.name==='franchiseList')
    //     {
    //       this.franchiseJSX = [];
    //       this.franchiseList.map((item,index)=>
    //             {
    //               item.type=2;
    //               this.franchiseJSX.push((<SearchListItem item={item} onClick={(e)=>{this.handleClickItem(e)}}/>))
    //               return null;
    //             }
    //             )//map
    //       if(!this.searchListFlag)
    //             this.searchListFlag=true;
    //     }
    //     }
    // ))
  }
  handleClickItem=(e)=>{
  }
  @action
  AddFilter = (item) => {
    this.filterList = [...this.filterList, item];
  }
  @action
  RemoveFilter = (item) => {    
    this.filterList=this.filterList.filter(e => e !== item); 
  }

  @action
  ClearFilter = () => {
    this.filterList =[];
  }

  @action
  RemoveLastFilter = () => {
    this.filterList.pop();
  }

  @action
  RemoveSubFilter = () => {
    this.filterList=this.filterList.slice(0,1);
  }
  
  @action
  isMainCategory = () => {
    return this.listName === "category_main";
  }

  @action
  SetCategoryList = (name) => {
    this.listName=name;    
    this.categoryList=data[this.listName];
  }

  @action
  GetCurrentDepth = ()=>{
    return this.filterList.length;
  }

  @action
  SetCategoryFlag = (flag)=>{
    this.categoryFlag=flag;
  }

  @action
  GetSubCategoryById=(id)=>{
    switch(id){
        case 0:
            return "category_main"
        case 1:
            return "category_sub_food";                                
        case 2:
            return "category_sub_cafe";
        case 3:
            return "category_sub_market";
        case 4:
            return "category_sub_health";
        case 5:
            return "category_sub_gas";
        case 6:
            return "category_sub_mart";
        case 7:
            return "category_sub_living";
        case 8:
            return "category_sub_beauty";
        case 9:
            return "category_sub_book";
        case 10:
            return "category_sub_culture";
        case 11:
            return "category_sub_leisure";
        case 12:
            return "category_sub_pashion";
        case 13:
            return "category_sub_academy";
        case 14:
            return "category_sub_car";
        case 15:
            return "category_sub_electronic";
        case 16:
            return "category_sub_hotel";
        case 17:
            return "category_sub_construct";
        case 18:
            return "category_sub_etc";
        default:
            return "";
    }
  }

  @action
  GetRegionList = () =>{
    return data["region_list"];
  }

  @action
  GetRegionByName = (name) => {
    let list = data["region_list"];
    if(list.find(element=>element.text===name))
        return list.find(element=>element.text===name);
    else
      return list.find(element=>element.text==="비서비스 지역");
  }
  @action
  getMobileFlag = () => {
    return this.mobileFlag;
  }

  @action
  getMobileClassName = () =>{
    if(this.mobileFlag) return "mobile";
    else return "";
  }
  @action
  GetFranchisesBound = async(long, lat, distance) =>{
    let response = await axios.get(`${boundAPI}${long}&lat=${lat}&distance=${distance}`);
    this.franchiseList = JSON.parse((response).data.body).body;
    console.log(JSON.parse((response).data.body).body)
    return toJS(this.franchiseList);
  }
  @action
  GetFranchises = async (search_word,region,cate1,cate2,long,lat)=> {
    let response = await axios.get(`${franchiseAPI}${search_word}&region=${region}&cate1=${cate1}&cate2=${cate2}&long=${long}&lat=${lat}`);
    this.franchiseList = JSON.parse((response).data.body).body;
    return toJS(this.franchiseList);
  }

  @action
  MarkerClickAction = async (name) =>{
    this.selectFranchise=this.franchiseList.find(e=>e.name===name);
    this.searchListFlag=true;
  }

  @action
  GetList = () => {
    return toJS(this.franchiseList);
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
  SetCenter = (loc) => {    
    this.mapObject.setCenter(loc)
  }
  @action
  SetLocation = (loc) => {
    this.currentLocation = loc;
  }
  @action
  SetCurrentLocation = async () => {
    this.currentLocationLoad=false;
    var locPosition = new kakao.maps.LatLng(37.56812473178144, 126.9218518787957); //default or fail
    var geocoder = new kakao.maps.services.Geocoder();
    var callback = (result,status) =>{
        if(status === kakao.maps.services.Status.OK){
            //구 찾기 
            this.currentLocation = new kakao.maps.LatLng(result[0].y,result[0].x);
            this.currentAddress =result[1].address_name;
            var regionText = result[1].region_2depth_name.split(' ')[0];
            this.region = this.GetRegionByName(regionText);
            this.mapObject.setCenter(locPosition);            
            var myMarkerSize = new kakao.maps.Size(40, 40); 
            var myMarkerSrc = './images/cur-loc-marker.png'
            var markerImage = new kakao.maps.MarkerImage(myMarkerSrc, myMarkerSize); 
            var marker = new kakao.maps.Marker({
              map: this.mapObject,
              position: locPosition,
              clickable: false,
              image : markerImage // 마커 이미지 
            });
            marker.setMap(this.mapObject);
            this.currentLocationLoad = true;
        }
    }
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        function(position){                    
          var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
          locPosition = new kakao.maps.LatLng(lat, lon);
          searchAddrFromCoords(locPosition,callback);
        });
    }    
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
    if(d >= 1)
      return d.toFixed(2)+"KM";
    else 
      return Math.round(d*1000)+"M";
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
  }
  @action
  SetMarkers = async (locations,imageSrc) => { 
    await this.ClearMarkers();
    var tmpMap = this.mapObject;    
    for (var i = 0; i < Object.keys(locations).length; i++) {        
        // marker size        
        var imageSize = new kakao.maps.Size(16, 16); 
        // make markerImage
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        // marker
        var markerPosition  = new kakao.maps.LatLng(locations[i].lat,locations[i].long); 
        var marker = new kakao.maps.Marker({
            map: tmpMap, // 마커를 표시할 지도
            position: markerPosition,  // 마커를 표시할 위치
            title : locations[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage, // 마커 이미지 
            clickable: true        
        });
        (function(marker,clickfunc) {
          // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
          kakao.maps.event.addListener(marker, 'click', function() {
            clickfunc(marker.getTitle())
          });
        })(marker,this.MarkerClickAction);
        this.currentMarkers.push(marker);
        
             
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
  @action
  RefreshResultList=async()=>{
    if(this.GetCurrentDepth()===2)
      await this.GetFranchises(this.searchKeyword,this.region.region,toJS(this.filterList[0]),toJS(this.filterList[1]),this.currentLocation.getLng(),this.currentLocation.getLat());
    else if(this.GetCurrentDepth()===1)
      await this.GetFranchises(this.searchKeyword,this.region.region,toJS(this.filterList[0]),'',this.currentLocation.getLng(),this.currentLocation.getLat());
    else 
      console.log("without category");
    var imageSrc = './images/my-marker.png'; 
    var markerList = this.franchiseList;
    await this.SetMarkers(markerList,imageSrc);
  }
}

export default Stores;