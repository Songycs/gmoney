import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {CategoryItem,isMobile} from 'components'
import './Category.scss'
import data from './Data.json'
import { observer, inject } from 'mobx-react';
import {observable,toJS} from 'mobx'
const TITLE_ITEM = { type:1, title: "업장 카테고리" , iconSrc: './images/shop.svg'};
const FOLD_ITEM = {type:3, iconSrc:'./images/keyboard_arrow_up-24px.svg'}
const INIT_RESULT_ITEM = {type:4, isInit:true}

@inject("store")
@observer
class Category extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        };
        this.category_list=data["category_main"];
        this.select_id=[];
        this.test_list=data["search_list_for_test"];
        this.search_list=[];
    }

    componentDidMount(){
        var categoryContainer = document.getElementById('category');  
    }

    getSubCategoryById=(id)=>{
        switch(id){
            case 1:
                return "category_sub_food";                                
            case 2:
                return "category_sub_cafe";
            case 3:
                return "category_sub_market";
            default:
                return "";
        }
    }

    render() {
        var itemList=this.category_list.map((item)=>{return <CategoryItem item={item}/>});
        var searchList=this.search_list.length==0?<CategoryItem item={INIT_RESULT_ITEM}/>:this.search_list.map();        
        var testList=this.test_list.length==0?<CategoryItem item={INIT_RESULT_ITEM}/>:toJS(this.props.store.franchises.franchiseList).map((item)=>{return <CategoryItem item={item}/>});
        let mobileFlag=isMobile.Android() || isMobile.iOS();     
        return(
            <Container fluid className={`category-wrapper${mobileFlag ? '-mobile' : ''}`}>
                <Row className={`category-button-wrapper${mobileFlag ? '-mobile' : ''}`}>
                    <CategoryItem item={TITLE_ITEM}/>
                    <Row className={`category-button-container${mobileFlag ? '-mobile' : ''}`}>                    
                        {itemList}      
                    </Row>
                    <CategoryItem item={FOLD_ITEM}/>
                </Row>
                <Row className={`search-result-container${mobileFlag ? '-mobile' : ''}`}>
                {testList}                    
                </Row>
            </Container>
        )
    }
}
export default Category;
