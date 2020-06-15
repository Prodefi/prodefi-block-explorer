import styled from 'styled-components';

export const PlayIcon = styled.svg`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;

  & path {
    fill: #fff;
  }

  &:hover path {
    fill: #548afd;
  }
`;

export const OverflowContainer = styled.section`
  overflow: hidden;
  width: 100%;
  height: auto;
  max-height: 600px;
`;

export const HeadDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const SmallText = styled.div`
  margin-top: 20px;
  font-size: 11px;
`;

export const TableContainer = styled.div`
 
  background-color: rgba(255, 255, 255, 0.03);

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

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  font-size: 24px;
  border-bottom: 1px solid #eee;
`;

export const DivTag = styled.div`
  width: 100%;
`;
