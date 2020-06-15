import styled, {keyframes} from 'styled-components';

// Modal
const modalWrapperBgc = keyframes`
  from { opacity: 0.7; }
  to { opacity: 1; }
`;

const modalAppear = keyframes`
  from { bottom: 50px; opacity: 0; }
  to { bottom: 0; opacity: 1; }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  animation: ${modalWrapperBgc} 0.5s;
`;

export const InputsJson = styled.div`
  padding: 0 20px;
`;

export const ModalContainer = styled.section`
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: auto;
  margin: 1.75rem auto;
  background-color: white;
  animation: ${modalAppear} 0.5s;

  @media (max-width: 500px) {
    margin: 0px;
  }
`;

// Exit
export const Cross = styled.div`
  position: absolute;
  right: 13px;
  top: 0px;
  font-size: 20px;
  cursor: pointer;
  color: #fff;

  &:after {
    content: '×';
  }

  &:hover {
    color: red;
  }
`;

// Input & Button
export const InputsDiv = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

export const Input = styled.input`
  max-width: 200px;
  height: 45px;
  padding: 0px 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-left: -1px;
`;

export const Button = styled.button`
  outline: none;
  padding: 0px 14px;
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #fff;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
`;

export const GetButton = styled.button`
  width: 100px;
  height: 45px;
  color: #fff;
  background-color: #545454;
  margin-left: -1px;
  &:hover {
    color: #fff;
    background-color: #868181;
  }
`;

// Link
export const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  word-break: break-word;

  &:hover {
    text-decoration: underline;
    color: #005dc1;
  }
`;

// <Main /> containers
export const Main = styled.main`
  display: block;
  margin: 0 65px;
  flex: 1 0 auto;
  
  @media (max-width: 767px) {
    margin: 0 20px;
  }
`;

// Header
export const Header = styled.header`
  width: 100%;
  
  & .fix-mobile { 
    margin: 0 65px; 
    background: rgb(255, 255, 255); 
    border-bottom: 1px solid #dedede;
  }
  
  
  @media (max-width: 767px) {
    & .fix-mobile {
      margin: 0 20px;
    }
  }
`;

export const HeadBox = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgb(33, 33, 33);
`;

export const HeadText = styled.span`
  font-size: 17px;
  color: #fff;
  padding: 5px 0;
`;

export const HeadContainer = styled.div`
  padding: 10px 10px 5px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// Text
export const TextSpan = styled.span`
  font-size: 14px;
  word-break: break-word;
`;

export const TextSpanBold = TextSpan.extend`
  font-weight: bold;
  padding-right: 5px;
`;

export const ApiInput = Input.extend`
  width: 100%;
  max-width: none;

  @media (max-width: 500px) {
    margin-bottom: 5px;
  }
`;

export const PreWrapper = styled.pre`
  color: white;
  background: rgb(33, 33, 33);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  padding: 10px;
`;

export const HeadContainerBI = HeadContainer.extend`
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NoDataDiv = styled.div`
  background: #000;
  color: #fff;
`;

export const DetailTab = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0;
  color: ${({color}) => color};
  background: ${({bg}) => bg};
  
  &:focus {
    outline: none;
  }
`;

export const ActionSelect = styled.select`
  float: right;
  background: unset;
  color: white;
  position: absolute;
  right: 15px;
`;

export const ActionOption = styled.option`
  color: black;
  background: rgba(0, 0, 0, 0);
`;

export const SpanEllipsis = styled.span`
  word-break: break-all;
  display: block;
  border-top: unset !important;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
`;

export const ABIDataTextarea = styled.textarea`
  width: 100%;
  background: none;
  color: white;
  border: none;
  min-height: 100px;
`;
