import styled from 'styled-components';

export const LinkButton = styled.div`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-size: 1rem;
  line-height: 1.5;
  color: #777777;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

    & .link-button {
      padding: 0;
      marginRight: 10px;
      background: rgba(0, 0, 0, 0);
      border: 0;
      borderRadius: 0;
      textAlign: left;

      &:hover {
        color: #7bcc3a !important;
      }
    }
`;

export const SearchButton = styled.div`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-size: 1rem;
  line-height: 1.5;
  color: #777777;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  padding: 1px 15px;
  height: 30px;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 65px;
  color: white;

  @media (max-width: 969px) {

  }

  @media (max-width: 700px) {
    left: 270px;
  }

  @media (max-width: 700px) {
    right: 5px;
    left: unset;
  }

  @media (max-width: 400px) {

    left: unset;
  }

  @media (max-width: 375px) {
    right: 5px;
    left: unset;
  }

  @media (max-width: 320px) {
    right: 0;
    left: unset;
  }
`;

export const MenuContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-top: 0;
  display: block;
  //flex-flow: row;
  //padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  //margin-bottom: 15px;
  //justify-content: space-between;

  @media (max-width: 700px) {
    flex-flow: column;
  }
`;

export const Spacer = styled.div`
  margin: 0 20px;
  height: 100%;
  width: 1px;
  background: rgba(255, 255, 255, 0.03);
`;

export const ImageContainer = styled.div`
  height: 100%;
  display: flex;

  @media (max-width: 575px) {
    min-height: 60px;
    position: relative;
  }
`;

export const ElefosLink = styled.a`
  display: flex;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  justify-self: center;
  object-fit: cover;
`;

export const IconImage = styled.img`
  height: 60px;
  padding: 3px 0px;
  display: table-cell;
  vertical-align: middle;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 25px 50px;


  @media (max-width: 700px) {
    justify-content: flex-start;
  }

  @media (max-width: 400px) {
    align-items: baseline;
    flex-flow: column;
  }
`;

export const FlexLinks = styled.div`
  display: flex;
  max-height: 20px;

  & .nav-link {
      padding: 0;
      margin-right: 10px;
      background: rgba(0, 0, 0, 0);
      border: 0;
      borderRadius: 0;
      textAlign: left;

      &:hover {
        div {
          color: #7bcc3a !important;
        }
      }
  }

  @media (max-width: 400px) {
    margin-bottom: 10px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: rgba(4, 4, 64, 0.05) 0px 2px 40px 0px;
  background: rgb(243, 243, 243);
  padding: 25px 65px;

  @media (max-width: 700px) {
    justify-content: flex-start;
  }

  @media (max-width: 500px) {
    padding: 10px;
  }

  @media (max-width: 421px) {
    padding: 10px;
  }

  @media (max-width: 320px) {
    padding: 5px;
  }
`;

export const OmniSearchInput = styled.input`
  height: 48px;
  font-size: 14px;
  width: 100%;
  background: #e9e9e9 !important;
  text-indent: .6rem;
  padding: 1px 15px;
  color: #212529;
  position: relative;
  border: none;

  & ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-size: 0.8rem;
  }
  & ::-moz-placeholder {
    /* Firefox 19+ */
    font-size: 0.8rem;
  }
  & :-ms-input-placeholder {
    /* IE 10+ */
    font-size: 0.8rem;
  }
  & :-moz-placeholder {
    /* Firefox 18- */
    font-size: 0.8rem;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: auto;
  max-height: 40px;
  display: flex;
  align-self: center;
  justify-self: center;
  object-fit: cover;
`;

