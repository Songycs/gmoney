import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import {CategoryItem} from 'components'
import './Category.scss'
import { observer, inject } from 'mobx-react';

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
        this.props.store.RefreshResultList();
    }    
    handleCategory=(e,item)=>{
        if(typeof item.back !== 'undefined'){//백 버튼 눌렀을 경우            
            this.props.store.RemoveSubFilter();//마지막 필터 삭제
            this.props.store.SetCategoryList(this.props.store.GetSubCategoryById(0));//첫 카테고리 선택으로 돌아가기            
        }
        else if (this.props.store.filterList.includes(item.text)){//같은 버튼 눌렀을 경우
            this.props.store.RemoveLastFilter();//마지막 필터 삭제 (어차피 같은 필터가 마지막에 있을거니까)
        }
        else if (this.props.store.GetCurrentDepth()===item.depth){//같은 뎁스 다른 버튼 눌렀을 경우
            this.props.store.RemoveLastFilter();//마지막 필터 삭제 (어차피 뎁스 같은 필터가 마지막에 있을거니까)
            this.props.store.AddFilter(item.text);
            if (item.depth===1){
                this.props.store.SetCategoryList(this.props.store.GetSubCategoryById(item.id));                
            }
        }
        else{//첫 카테고리 선택할 경우      
            if (this.props.store.getCurrentDepth===2){
                this.props.store.ClearFilter();
            }
            this.props.store.AddFilter(item.text);
            if (item.depth===1){
                this.props.store.SetCategoryList(this.props.store.GetSubCategoryById(item.id));                
            }
        }        
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve('');
            },100);
        })      
    }

    onClickOpen=(e)=>{        
        this.props.store.SetCategoryFlag(!this.props.store.categoryFlag);
    }

    render() {              
        var btnOpenCategory = {type:3,iconSrc:'./images/category.svg'}
        var searchBar={type:4,iconSrc:'./images/keyobard_arrow_up-24px.svg'};
        var mobile=this.props.store.getMobileClassName();
        var selected=this.props.store.categoryFlag?'selected':'';
        var backButton={type:2 ,back:true, text:'뒤로가기'};
        
        return(
            <Container fluid className={`category-container ${mobile} ${selected}`}>
                <Row className={`category-search-container ${mobile}`}>
                    <CategoryItem item={btnOpenCategory} onClick={this.onClickOpen} classExt={selected}></CategoryItem>    
                    <CategoryItem item={searchBar}></CategoryItem>    
                </Row>
                
                <Row className={`category-button-container ${selected}`}>                    
                    {
                        !this.props.store.isMainCategory() && this.props.store.categoryFlag &&
                        <CategoryItem item={backButton} onClick={(e)=>{this.handleClickCategory(e,backButton)}}/>
                    }                    
                    {
                        this.props.store.categoryFlag &&
                        this.props.store.categoryList.map((item,index)=>{
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
