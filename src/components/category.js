import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import 'components/style.scss';
// import 'style.scss';

class Category extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <Container fluid>
                <Row className='center tmpHeight black'>
                    {/* title */}
                    <div>
                        For category
                    </div>
                </Row>
            </Container>        
        )
    }
}
export default Category;
