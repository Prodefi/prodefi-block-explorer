import styled from 'styled-components';

export const PrettyContainer = styled.div`
  display: block;
  width: 100%;
  font-size: 14px;
  font-family: Lato;

  @media (max-width: 767px) {
    overflow: auto;
  }
`;

export const SummaryContainer = styled.div`
  width: 100%;

  .address-pretty-row {
    margin: 0 0 15px 0;
    padding: 15px;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
    border-radius: 5px;
  }
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

export const NoDataDiv = styled.div`
  background: #000;
  color: #fff;
`;

export const SpanEllipsis = styled.span`
  word-break: break-all;
  display: block;
  border-top: unset !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActionSelect = styled.select`
  float: right;
  background: unset;
  color: white;
`;

export const ActionOption = styled.option`
  color: black;
  background: rgba(0, 0, 0, 0);
`;

export const TitleDiv = styled.div`
  font-weight: 300;
`;

export const FirstRow = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    flex-flow: column;
    align-items: flex-start;
  }
`;

export const FirstRow2 = styled.div`
  display: flex;
  flex-flow: row-reverse;
`;

export const ValidatorProfileRank = styled.div`
  margin-right: 10px;

  span {
    border: 1px solid #000;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
`;

export const ValidatorProfileLogo = styled.div`
  margin-right: 10px;
  max-width: 100px;

  & img {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
`;

export const ValidatorProfileAddressGroup = styled.div`

  & .validator-name {
    font-size: 22px;
    font-weight: 600;
    color: #222;
  }

  & .validator-operator {
    font-size: 15px;
    font-weight: 600;
    color: #545151;
  }
`;

export const ValidatorProfileStatus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 50px;
    width: 90px;
    height: 30px;
    background: ${({bg}) => bg};
    color: #fff;
    line-height: 1;
`;

export const ValidatorProfileDetail = styled.div`

`;

export const ValidatorProfileDetailItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const ValidatorProfileDetailItemLabel = styled.h2`
  min-width: 160px;
  font-size: 16px;
  margin: 0;
  font-weight: 600;
`;

export const ValidatorProfileDetailItemValue = styled.div`
  
  &.empty {
    font-style: italic;
    color: #969696;
  }
`;

export const ValidatorProfileThirdTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const ValidatorProfileThirdBody = styled.div`
  display: flex;

  @media (max-width: 576px) {
    flex-flow: column;
    margin-bottom: 15px;
  }
`;

export const ValidatorProfileThirdBodyChart = styled.div`
  max-width: 200px;
  min-width: 200px;
`;

export const ValidatorProfileThirdBodyDetail = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-around;
`;

export const Total = styled.div`

  & div {
    &:first-child{
      font-size: 15px;
      font-weight: 600;
      color: #545151;
    }

    &:last-child{
      font-weight: 500;
    }
  }

`;

export const Self = styled.div`
  display: flex;

  & .left-side {
    margin-right: 25px;
    & div {
      font-weight: 500;
      &:first-child{
        font-size: 15px;
        font-weight: 600;
        color: #545151;
      }
      &:last-child{
        font-weight: 500;
      }
    }
  }

  & .right-side {
    & div {
      &:first-child{
        font-size: 15px;
        font-weight: 600;
        color: #545151;
      }
    }
  }
`;

export const ValidatorSetGroup = styled.div`
    display: grid;
    grid-gap: 5px;
    align-items: center;
    grid-template-columns: repeat(20,13px);
    grid-auto-flow: row;
    padding-top: 10px;

    @media (max-width: 414px) {
      grid-template-columns: repeat(19,13px);
    }

    @media (max-width: 380px) {
      grid-template-columns: repeat(17,13px);
    }

    @media (max-width: 375px) {
      grid-template-columns: repeat(16,13px);
    }

    @media (max-width: 350px) {
      grid-template-columns: repeat(14,13px);
    }
`;

export const ValidatorSetItem = styled.a`
    width: 13px;
    height: 25px;
    background: ${({bg}) => bg};
    cursor: pointer;
`;

export const ValidatorProfileDelegators = styled.div`

`;

export const ValidatorProfileDelegatorHeader = styled.div`

`;

export const ValidatorProfileDelegatorBody = styled.tr`

`;

export const ItemContainer = styled.tr`
  padding: 0px 5px;
  border-bottom: 0.1px solid rgba(243, 243, 243);
  background-color: ${({iteration}) => (iteration % 2 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)')};
`;

export const TextSpan = styled.td`
  padding: 10px 0px;
  font-size: 12px;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 10px;
  text-align: center;
  min-width: 75px;
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

  @media (max-width: 376px) {
    .pagination {
      li {
        a {
          padding: 13px;
        }
      }
    }
  }

  @media (max-width: 350px) {
    .pagination {
      li {
        a {
          padding: 10px;
        }
      }
    }
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
