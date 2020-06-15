// Core
import React, {PureComponent} from 'react';
import {Row} from "reactstrap";
import {FooterContainer} from "./styles";

class Footer extends PureComponent {

  render() {

    return (
      <FooterContainer>
        <Row style={{margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Copyright © ProDeFi. All rights reserved
        </Row>
      </FooterContainer>
    );
  }
}

export default Footer;
