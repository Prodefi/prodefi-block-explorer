// Core
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter, NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  MenuContainer,
  InputContainer,
  ImageContainer,
  LinkButton,
  SearchButton,
  OmniSearchInput,
  Image,
  ElefosLink,
  FlexContainer,
  Spacer,
  FlexLinks,
} from './styles';
import prodefiLogo from '../../assets/images/logo.png';
import './custom.css';

const initialState = {
  inputSearch: '',
  isMounted: false,
};

class NavigationMenu extends PureComponent {
  state = initialState;

  componentDidMount() {
    this.setState({isMounted: true});
  }

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  onFieldChange = e => this.setState({[e.target.name]: e.target.value});

  omniSearch = () => {
    const {inputSearch} = this.state;
    const {history} = this.props;

    const trimInputSearch = inputSearch.replace(/\s/g, '');
    let searchLength = trimInputSearch.length;
    if (searchLength === 0) return;

    if (searchLength === 64) { // txhash
      history.push(`/transaction/${trimInputSearch}`);

    } else if (searchLength === 49) { // is a validator profile
      history.push(`/validator-profile/${trimInputSearch}/latest`);

    } else if (searchLength >= 32 && searchLength <= 64) { // is a address
      history.push(`/address/${trimInputSearch}`);

    } else if (!isNaN(parseInt(trimInputSearch))) { // => height => search by block height
      history.push(`/block/${trimInputSearch}`);
    } else {
      history.push('/404');
    }

    this.setState(initialState);
  };

  handleKey = e => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this.omniSearch();
    }
  };

  render() {
    const {inputSearch} = this.state;

    return (

      <MenuContainer>

        <FlexContainer>
          <ImageContainer>
            <NavLink exact to="/">
              <Image style={{
                marginRight: '10px',
              }} src={prodefiLogo}/>
            </NavLink>
          </ImageContainer>
          <FlexLinks>

            <NavLink className="nav-link" exact to="/">
              <LinkButton>Block Explorer</LinkButton>
            </NavLink>

            <NavLink className="nav-link" exact to="/validators">
              <LinkButton>Validators</LinkButton>
            </NavLink>

          </FlexLinks>
        </FlexContainer>

        <InputContainer>
          <OmniSearchInput
            value={inputSearch}
            type="text"
            placeholder="Search by Block Height, Txn Hash, or Account Address"
            name="inputSearch"
            onChange={this.onFieldChange}
            onKeyUp={this.handleKey}
          />
          <SearchButton onClick={this.omniSearch} color="secondary">
            <FontAwesomeIcon color="#777777" icon="search" style={{cursor: 'pointer'}}/>
          </SearchButton>
        </InputContainer>

      </MenuContainer>

    );
  }
}

NavigationMenu.propTypes = {
  producers: PropTypes.array,
  history: PropTypes.any,
};

export default withRouter(NavigationMenu);
