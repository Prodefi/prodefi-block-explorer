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
  
  /* width */
  & ::-webkit-scrollbar {
    width: 20px;
  }

  /* Track */
  & ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  & ::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 10px;
  }
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




