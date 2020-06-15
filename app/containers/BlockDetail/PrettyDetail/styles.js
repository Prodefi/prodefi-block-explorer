import styled from 'styled-components';

export const PrettyContainer = styled.div`
  display: block;
  padding: 10px;
  width: 100%;
  background: rgb(255, 255, 255);
  font-size: 14px;
  font-family: Lato;
`;

export const SummaryContainer = styled.div`
  background: rgb(255, 255, 255);
  width: 100%;
  
  & .fix-tablet {
    margin-left: -10px;
  }
  
  & .tx-list {
    display: flex; 
    alignItems: center;
  }
  
  @media (max-width: 767px) {
    & .fix-tablet {
      margin-left: 0;
    }
    
    & .tx-list {
      display: flex; 
      alignItems: baseline;
    }
  }
`;

export const NoDataDiv = styled.div`
  background: #000;
  color: #fff;
`;

export const TransactionContainer = styled.div`
  margin-top: 20px;
  background: rgb(43, 43, 43);
  padding: 10px 20px;
  width: 100%;
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.05);
`;

export const TransactionTitle = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid;
  border-color: rgba(255, 255, 255, 0.3);
`;

export const TransactionList = styled.div`
  overflow: auto;

  & ::-webkit-scrollbar {
    height: 10px;
    background-color: rgba(178, 216, 155, 0);
  }

  & ::-webkit-scrollbar-corner {
    background-color: rgba(178, 216, 155, 0);
  }

  & ::-webkit-scrollbar:horizontal {
    position: top;
  }

  & ::-webkit-scrollbar-thumb {
    border: 1px solid rgba(255, 255, 255, 0.7);
    background: rgba(11, 126, 61, 0);
    border-radius: 5px;
  }

  & ::-webkit-scrollbar-thumb:hover {
    background: rgba(11, 126, 61, 0.7);
  }
`;

export const TitleDiv = styled.div`
  font-weight: 300;
`;

export const RedirectToBlock = styled.a`
  margin: 0 3px;
  cursor: pointer;
`;

export const TData = styled.td`
  min-width: 120px;
  max-width: 300px;
  word-break: keep-all;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top: 1px solid rgba(255, 255, 255, 0.3) !important;
`;
