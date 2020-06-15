import styled, { keyframes } from 'styled-components';

export const ValidatorsContainer = styled.div`
  flex: 1 0 auto;
`;

export const PreWrapper = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  color: white;
  background: rgb(33, 33, 33);
  margin: 0;
  padding: 10px;
  width: 100%;
`;

export const Main = styled.main`
  display: block;
  width: 100%;
  padding: 5px 15px;
  color: #000;
  background: #fff;
`;

// Header
export const Header = styled.header`
  width: 100%;
  color: white;
  background: #fff;
`;

export const DetailTab = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0;
  color: ${({ color }) => color};
  background: ${({ bg }) => bg};
`;

export const PrettyContainer = styled.div`
  display: block;
  padding: 10px;
  width: 100%;
  background: rgb(255, 255, 255);
  font-size: 14px;
  font-family: Lato;
`;

export const SummaryContainer = styled.div`
  background: rgb(43, 43, 43);
  width: 100%;
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.05);
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

export const ActionType = styled.span`
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 2px 10px;
  word-break: keep-all;
  cursor: pointer;
`;

export const TData = styled.td`
  min-width: 120px;
  max-width: 300px;
  word-break: keep-all;
  vertical-align: middle;
`;

export const TDataEllipsis = styled(TData)`
  min-width: 200px;
  word-break: break-all;
`;

export const DivEllipsis = styled.div``;

export const SpanEllipsis = styled.span`
  word-break: break-all;
  display: block;
  border-top: unset !important;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100px;
`;

export const SpanValue = styled.span`
  font-family: 'Avenir DemiBold';
`;

export const ActionDataTextarea = styled.textarea`
  width: 100%;
  background: none;
  color: white;
  border: none;
  min-height: 100px;
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

export const Col = styled.div`
  background: #fff;
  color: #000;
`;
