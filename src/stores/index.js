import data from './Data.json'
import { observable, action, toJS } from 'mobx'
import axios from 'axios';
import {isMobile} from 'components'

const { kakao } = window;
const franchiseAPI = "https://283e27mdvd.execute-api.ap-northeast-2.amazonaws.com/0505/search?search_word=" 

class Stores {
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
    this.currentLocation = '';    
    this.currentAddress = '';
    this.currentMarkers = [];    
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
    return list.find(element=>element.text===name);
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
  GetFranchises = async (search_word,region,cate1,cate2)=> {
    let response = await axios.get(`${franchiseAPI}${search_word}&region=${region}&cate1=${cate1}&cate2=${cate2}`);
    this.franchiseList = JSON.parse((response).data.body).body;
    return toJS(this.franchiseList);
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
    var locPosition = new kakao.maps.LatLng(37.56812473178144, 126.9218518787957); //default or fail
    var geocoder = new kakao.maps.services.Geocoder();
    var callback = (result,status) =>{
        if(status === kakao.maps.services.Status.OK){
            //구 찾기 
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
    return Math.round(d*1000);
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
      await this.GetFranchises(this.searchKeyword,this.region.region,toJS(this.filterList[0]),toJS(this.filterList[1]));
    else if(this.GetCurrentDepth()===1)
      await this.GetFranchises(this.searchKeyword,this.region.region,toJS(this.filterList[0]),'');
    var imageSrc = './images/my-marker.png'; 
    var markerList = this.franchiseList;
    await this.SetMarkers(markerList,imageSrc);
  }
}

export default Stores;