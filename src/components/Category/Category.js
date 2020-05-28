import React, { Component } from 'react';
import { Container, Row, Col, Button, ThemeProvider } from 'react-bootstrap';
import {CategoryItem,isMobile} from 'components'
import './Category.scss'
import { observer, inject } from 'mobx-react';
import {observable,toJS} from 'mobx'

@inject("store")
@observer
class Category extends Component {
    constructor(props){
        super(props);        
        this.state = {         
        };        
    }
    componentDidMount(){
    }
    handleClickCategory= async (e,item) =>{
        await this.handleCategory(e,item);
        this.refreshList()
    }
    refreshList=async()=>{
        if(this.props.store.category.GetCurrentDepth()===2)
            await this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,this.props.store.category.region.region,toJS(this.props.store.category.filterList[0]),toJS(this.props.store.category.filterList[1]));
        else if(this.props.store.category.GetCurrentDepth()===1)
            await this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,this.props.store.category.region.region,toJS(this.props.store.category.filterList[0]),'');

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        var markerList = this.props.store.franchises.franchiseList;
        await this.props.store.map.SetMarkers(markerList,imageSrc);
    }
    handleCategory=(e,item)=>{
        if(typeof item.back !== 'undefined'){//백 버튼 눌렀을 경우            
            this.props.store.category.RemoveSubFilter();//마지막 필터 삭제
            this.props.store.category.SetCategoryList(this.props.store.category.GetSubCategoryById(0));//첫 카테고리 선택으로 돌아가기            
        }
        else if (this.props.store.category.filterList.includes(item.text)){//같은 버튼 눌렀을 경우
            this.props.store.category.RemoveLastFilter();//마지막 필터 삭제 (어차피 같은 필터가 마지막에 있을거니까)
        }
        else if (this.props.store.category.GetCurrentDepth()===item.depth){//같은 뎁스 다른 버튼 눌렀을 경우
            this.props.store.category.RemoveLastFilter();//마지막 필터 삭제 (어차피 뎁스 같은 필터가 마지막에 있을거니까)
            this.props.store.category.AddFilter(item.text);
            if (item.depth===1){
                this.props.store.category.SetCategoryList(this.props.store.category.GetSubCategoryById(item.id));                
            }
        }
        else{//첫 카테고리 선택할 경우      
            if (this.props.store.category.getCurrentDepth===2){
                this.props.store.category.ClearFilter();
            }
            this.props.store.category.AddFilter(item.text);
            if (item.depth===1){
                this.props.store.category.SetCategoryList(this.props.store.category.GetSubCategoryById(item.id));                
            }
        }
        console.log(this.props.store.category.filterList);
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve('');
            },100);
        })      
    }

    onClickOpen=(e)=>{        
        this.props.store.category.SetCategoryFlag(!this.props.store.category.categoryFlag);
    }

    render() {              
        var btnOpenCategory = {type:3,iconSrc:'./images/category.svg'}
        var searchBar={type:4,iconSrc:'./images/keyobard_arrow_up-24px.svg'};
        var mobile=this.props.store.util.getMobileClassName();
        var selected=this.props.store.category.categoryFlag?'selected':'';
        var backButton={type:2 ,back:true, text:'뒤로가기'};
        
        return(
            <Container fluid className={`category-container ${mobile} ${selected}`}>
                <Row className={`category-search-container ${mobile}`}>
                    <CategoryItem item={btnOpenCategory} onClick={this.onClickOpen} classExt={selected}></CategoryItem>    
                    <CategoryItem item={searchBar}></CategoryItem>    
                </Row>
                
                <Row className={`category-button-container ${selected}`}>                    
                    {
                        !this.props.store.category.isMainCategory() && this.props.store.category.categoryFlag &&
                        <CategoryItem item={backButton} onClick={(e)=>{this.handleClickCategory(e,backButton)}}/>
                    }                    
                    {
                        this.props.store.category.categoryFlag &&
                        this.props.store.category.categoryList.map((item,index)=>{
                        return <CategoryItem    
                                    key={index} 
                                    item={item}
                                    onClick={
                                        (e)=>{
                                            this.handleClickCategory(e,item)
                                        }}/>
                        })
                    }                    
                </Row>
            </Container>
        )
    }
}
export default Category;
