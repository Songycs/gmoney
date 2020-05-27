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

    getSubCategoryById=(id)=>{
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

    handleClickCategory= async (e,item) =>{
        await this.handleCategory(e,item);
        if(this.props.store.category.GetCurrentDepth()===2)
            await this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,'파주',toJS(this.props.store.category.filterList[0].text),toJS(this.props.store.category.filterList[1].text));
        else if(this.props.store.category.GetCurrentDepth()===1)
            await this.props.store.franchises.GetFranchises(this.props.store.category.searchKeyword,'파주',toJS(this.props.store.category.filterList[0].text),'');

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        var markerList = this.props.store.franchises.franchiseList;
        await this.props.store.map.SetMarkers(markerList,imageSrc);
    }

    handleCategory=(e,item)=>{  
        if(typeof item.back !== 'undefined'){//백 버튼 눌렀을 경우            
            this.props.store.category.RemoveSubFilter();//마지막 필터 삭제
            this.props.store.category.SetCategoryList(this.getSubCategoryById(0));//첫 카테고리 선택으로 돌아가기
            this.props.store.category.SetCategoryName(this.getSubCategoryById(0));
        }
        else if (this.props.store.category.filterList.includes(item)){//같은 버튼 눌렀을 경우
            this.props.store.category.RemoveLastFilter();//마지막 필터 삭제 (어차피 같은 필터가 마지막에 있을거니까)
        }
        else if (this.props.store.category.GetCurrentDepth()===item.depth){//같은 뎁스 다른 버튼 눌렀을 경우
            this.props.store.category.RemoveLastFilter();//마지막 필터 삭제 (어차피 뎁스 같은 필터가 마지막에 있을거니까)
            this.props.store.category.AddFilter(item);
            if (item.depth===1){
                this.props.store.category.SetCategoryList(this.getSubCategoryById(item.id));
                this.props.store.category.SetCategoryName(this.getSubCategoryById(item.id));
            }
        }
        else{//첫 카테고리 선택할 경우      
            if (this.props.store.category.getCurrentDepth===2){
                this.props.store.category.ClearFilter();
            }
            this.props.store.category.AddFilter(item);
            if (item.depth===1){
                this.props.store.category.SetCategoryList(this.getSubCategoryById(item.id));
                this.props.store.category.SetCategoryName(this.getSubCategoryById(item.id));
            }
        }
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
        
        return(
            <Container fluid className={`category-container ${mobile} ${selected}`}>
                <Row className={`category-search-container ${mobile}`}>
                    <CategoryItem item={btnOpenCategory} onClick={this.onClickOpen} classExt={selected}></CategoryItem>    
                    <CategoryItem item={searchBar}></CategoryItem>    
                </Row>
                {this.props.store.category.categoryFlag&&
                    
                    <Row className={`category-button-container`}>
                    {
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
                }
                
            </Container>
        )
    }
}
export default Category;
