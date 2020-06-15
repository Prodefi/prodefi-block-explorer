import styled, {keyframes} from 'styled-components';

export const TransactionsContainer = styled.div`
  margin: 25px 65px;
  flex: 1 0 auto;
  @media (max-width: 767px) {
    margin: 5px;
  }
`;

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #7bcc3a !important;
  font-size: 13px;
  display: flex;

  &:hover {
    text-decoration: underline;
  }
`;

export const ItemContainer = styled.tr`
  padding: 0px 5px;
  border-bottom: 0.1px solid rgba(243, 243, 243);
  background-color: ${({iteration}) => (iteration % 2 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)')};

  & .custom-textspan-td {
    padding: 10px 0px;
    font-size: 12px;
    color: #000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 10px;
    text-align: center;
    min-width: 75px;
  }
`;

export const HeaderPage = styled.div`
  margin-bottom: 25px;

  @media (max-width: 1200px) {
    margin-bottom: 0;

    & .fix-responsive {
      margin-bottom: 25px;
    }
  }
`;

export const ValidatorAvatar = styled.img`
  margin-right: 5px;
  height: 40px;
  width: 40px;
`;

export const ValidatorNameGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderBlock = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  -moz-box-shadow: 4px 4px 4px #d4d4d4;
  -webkit-box-shadow: 4px 4px 4px #d4d4d4;
  box-shadow: 4px 4px 4px #d4d4d4;
  color: #000;

  & div:first-child {
    span {
      color: #72737b;
    }
  }

  & div:nth-child(2) {
    text-align: end;
    font-size: 18px;
  }
`;

export const TextSpan = styled.td`
  font-size: 12px;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px;
  text-align: center;
`;

export const PageTitle = styled.div`
  padding-bottom: 15px;
  text-transform: uppercase;
  font-size: 24px;
  border-bottom: 1px solid #f3f3f3;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  background-color: rgba(255, 255, 255);

  & ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    background-color: rgba(178, 216, 155, 0);
  }

  & ::-webkit-scrollbar-corner {
    background-color: #7bcc3a;
  }

  & ::-webkit-scrollbar:horizontal {
    position: top;
  }

  & ::-webkit-scrollbar-thumb {
    height: 10px;
    width: 10px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    background: #cecece;
    border-radius: 3px;
  }

  & ::-webkit-scrollbar-thumb:hover {
    background: #cecece;
  }
`;

export const HeaderTable = styled.thead`
  font-size: 14px;
  font-weight: 500;
  color: #747474;
  border-bottom: 1px solid #cecece;
  height: 70px;
  tr {
    th {
      height: 45px;
    }
  }
`;

export const TableTag = styled.table`
  overflow-x: auto;
  width: 100%;
  display: table;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const CustomPaging = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 23px 40px 10px 10px;
  background-color: #fff;

  .pagination {
    margin-bottom: 0;
    font-size: 13px;
    li {
      a {
        background: #fff;
        color: #000;

        &:focus {
          outline: none;
        }
      }

      &.active {
        a {
          background: #cecece;
        }
      }
    }
  }

  @media (max-width: 767px) {
    padding: 10px 0;
  }

`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  box-shadow: rgba(4, 4, 64, 0.05) 0px 2px 40px 0px;
  background: rgb(243, 243, 243);
  max-width: 300px;
  width: 100%;
  margin-right: 10px;

  @media (max-width: 700px) {
    justify-content: flex-start;
  }

  @media (max-width: 536px) {
    margin-bottom: 25px;
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
  font-size: 14px;
  width: 100%;
  background: #fff;
  text-indent: .6rem;
  padding: 5px 10px;
  color: #212529;
  position: relative;
  border: 1px solid #b9b9b9;
  border-radius: 5px;

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

  &:focus {
    outline: none;
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
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  color: white;

  @media (max-width: 498px) {
    right: 10px;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 0px;
  align-items: center;

  @media (max-width: 536px) {
    flex-flow: column;
  }
`;

export const ActiveValidator = styled.div`
`;

export const ActiveValidatorBtn = styled.button`
  margin-right: 10px;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 20px;
  border: 1px solid #b9b9b9;
  color: ${({color}) => color};
  background-color: ${({bg}) => bg};

  &:focus {
    outline: none;
  }

`;



