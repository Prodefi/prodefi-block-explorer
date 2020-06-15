import styled from 'styled-components';

export const Spacing = styled.div`
  height: 10px;
`;

export const PrettyContainer = styled.div`
  display: block;
  padding: 10px;
  width: 100%;
  background: rgb(255, 255, 255);
  font-size: 14px;
  font-family: Lato;

  @media (max-width: 767px) {
    overflow: auto;
  }
`;

export const SummaryContainer = styled.div`
  background: rgb(43, 43, 43);
  width: 100%;
`;

export const ResourceContainer = styled.div`
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
  overflow: auto;

  & ::-webkit-scrollbar {
    height: 10px;
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

export const TransactionTitle = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid;
  border-color: rgba(255, 255, 255, 0.3);
`;

export const TransactionList = styled.div`
  overflow: auto;
  border-bottom: 1px solid (255, 255, 255, 0.3);
  margin-bottom: 20px;

  & ::-webkit-scrollbar {
    height: 10px;
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

export const ActionType = styled.span`
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 2px 10px;
  word-break: keep-all;
  cursor: pointer;
  white-space: nowrap;
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

export const TDataEllipsis = styled(TData)`
  min-width: 200px;
  word-break: break-all;
  display: block;
`;

export const SpanEllipsis = styled.span`
  word-break: break-all;
  display: block;
  border-top: unset !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActionDataTextarea = styled.textarea`
  width: 100%;
  background: none;
  color: white;
  border: none;
  min-height: 100px;

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

export const ProgressDescription = styled.div`
  font-weight: 700;
  text-align: center;
`;

export const RedirectToBlock = styled.a`
  margin: 0 3px;
  cursor: pointer;
`;

export const FilterActionContainer = styled.div`
  padding: 15px 0;
`;

export const FilterActionInput = styled.input`
  padding: 1px 15px;
  height: 30px;
  fontsize: 14px;
  border: 0;
  borderradius: 0;

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
