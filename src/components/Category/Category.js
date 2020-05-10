import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {CategoryItem,SearchResult} from 'components'
import './Category.scss'
import data from './Data.json'

const TITLE_ITEM = { type:1, title: "업장 카테고리" , iconSrc: './images/shop.svg'};
const FOLD_ITEM = {type:3, iconSrc:'./images/keyboard_arrow_up-24px.svg'}

class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.category_list=data["category_main"];
        this.select_id=[];
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
        const {mobileFlag} = this.props;
        console.log(mobileFlag);
        return(
            <Container fluid>
                <CategoryItem item={TITLE_ITEM}/>
                <Row className={`category-container${mobileFlag ? '-mobile' : ''}`}>                    
                    {itemList}
                </Row>
                <CategoryItem item={FOLD_ITEM}/>
                <SearchResult/>
            </Container>        
        )
    }
}
export default Category;
