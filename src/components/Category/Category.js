import React, { Component } from 'react';
import { Container, Row, Col, Button, ThemeProvider } from 'react-bootstrap';
import {CategoryItem,isMobile} from 'components'
import './Category.scss'
import { observer, inject } from 'mobx-react';
import {observable,toJS} from 'mobx'

const FOLD_ITEM = {type:3, iconSrc:'./images/keyboard_arrow_up-24px.svg'}
const INIT_RESULT_ITEM = {type:4, isInit:true}

@inject("store")
@observer
class Category extends Component {
    constructor(props){
        super(props);        
        this.state = {                 
            fold:false            
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

    handleClickFold=()=>{
        if(this.state.fold){
            this.setState({
                fold:false
            })
        }
        else{
            this.setState({
                fold:true
            })
        }
    }

    handleClickCategory=(e,item)=>{        
        if(typeof item.back != 'undefined'){//백 버튼 눌렀을 경우            
            this.props.store.category.RemoveSubFilter();//마지막 필터 삭제
            this.props.store.category.SetCategoryList(this.getSubCategoryById(0));//첫 카테고리 선택으로 돌아가기
            this.props.store.category.SetCategoryName(this.getSubCategoryById(0));
        }
        else if (this.props.store.category.filterList.includes(item)){//같은 버튼 눌렀을 경우
            this.props.store.category.RemoveLastFilter();//마지막 필터 삭제 (어차피 같은 필터가 마지막에 있을거니까)
        }
        else if (this.props.store.category.GetCurrentDepth()==item.depth){//같은 뎁스 다른 버튼 눌렀을 경우
            this.props.store.category.RemoveLastFilter();//마지막 필터 삭제 (어차피 뎁스 같은 필터가 마지막에 있을거니까)
            this.props.store.category.AddFilter(item);
            if (item.depth==1){
                this.props.store.category.SetCategoryList(this.getSubCategoryById(item.id));
                this.props.store.category.SetCategoryName(this.getSubCategoryById(item.id));
            }
        }
        else{//첫 카테고리 선택할 경우            
            if (this.props.store.category.getCurrentDepth==2){
                this.props.store.category.ClearFilter();
            }
            this.props.store.category.AddFilter(item);
            if (item.depth==1){
                this.props.store.category.SetCategoryList(this.getSubCategoryById(item.id));
                this.props.store.category.SetCategoryName(this.getSubCategoryById(item.id));
            }
        }
    }

    handleClickItem=(e)=>{
        console.log('handleClickItem')
    }

    render() {      
        var searchList=this.props.store.franchises.franchiseList.length==0?<CategoryItem item={INIT_RESULT_ITEM}/>:toJS(this.props.store.franchises.franchiseList).map((item)=>{return <CategoryItem item={item} onClick={this.handleClickItem}/>});        
        var backItem = {type:2, back:true, text : "뒤로가기"}
        return(
            <Container fluid className={`category-wrapper${this.props.store.util.getMobileFlag() ? '-mobile' : ''}`}>
                <Row className={`category-button-wrapper${this.props.store.util.getMobileFlag() ? '-mobile' : ''}`}>
                    <CategoryItem item={{ type:1, title: "업장 카테고리" , iconSrc: './images/shop.svg', selectList:this.props.store.category.filterList}}/>                                      
                        {!this.state.fold&& 
                        <Row className={`category-button-container${this.props.store.util.getMobileFlag() ? '-mobile' : ''}`} >
                            {
                                this.props.store.category.isMainCategory()?
                                ''
                                :
                                <CategoryItem item={backItem} onClick={(e)=>{this.handleClickCategory(e,backItem)}}/>
                            }
                            {
                                this.props.store.category.categoryList.map((item,index)=>{
                                    return <CategoryItem    
                                                key={index} 
                                                item={item} 
                                                classExt={`${this.props.store.category.filterList.includes(item)?'select':''}`} 
                                                onClick={
                                                    (e)=>{
                                                        this.handleClickCategory(e,item)
                                                    }}/>
                                })
                            }
                        </Row>
                        }                    
                    <CategoryItem item={FOLD_ITEM} onClick={this.handleClickFold} classExtForImg={`${this.state.fold?'flip':''}`}/>
                </Row>
                <Row className={`search-result-container${this.props.store.util.getMobileFlag() ? '-mobile' : ''}`}>
                {searchList}                    
                </Row>
            </Container>
        )
    }
}
export default Category;
