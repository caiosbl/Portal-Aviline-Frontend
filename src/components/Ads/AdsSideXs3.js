import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import {Row,Container} from 'reactstrap';

class AdsSideXs3 extends Component {


  render() {
    return (
   <Container>
        <Row className="show-grid" style={{marginBottom:20}}>
            <Image src="/adsSideXs3.png"  width={'100%'} height={'20%'}/>
        </Row>
        </Container>
    );
  }
}
export default AdsSideXs3;
