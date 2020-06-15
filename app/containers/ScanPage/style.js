import styled, { keyframes } from 'styled-components';

export const SectionOne = styled.div`
  width: 260px;
  padding-top: 40px;
  margin-right: 30px;
  display: inherit;
  flex-direction: column;

  @media (max-width: 1280px) {
    min-width: 260px;
  }

  @media (max-width: 992px) {
    max-width: 260px;
    width: 100%;
    min-width: auto;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }
`;

export const Wrapper = styled.section`
  display: inherit;
  flex-direction: column;
  background-color: #fff;
  padding: 0;
  // margin: 0 25px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #eee;
`;

export const HeaderLeft = styled.div`
  font-size: 24px;
`;

export const HeaderRight = styled.div`
  margin-left: auto;
  justify-content: center;
  align-items: center;
  display: flex;

  .header-btn {
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #7bcc3a;
    color: #7bcc3a;
    padding: 5px;

    &:hover {
      background-color: #7bcc3a;
      color: white;
      text-decoration: none !important;
    }

    &:focus {
      outline: none;
    }
  }
`;

export const HeaderTable = styled.thead`
  font-size: 14px;
  font-weight: 500;
  color: #747474;
`;

export const HeaderSpan = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  position: absolute;
  top: 0;
`;

export const Container = styled.div`
  background-color: #0c0d0d;
  padding: 0 15px 15px 15px;
  width: 100%;
`;

export const TextSpan = styled.span`
  display: block;
  font-size: 14px;
`;

export const GreenSpan = styled.span`
  color: rgba(0, 128, 0, 0.7);
  font-size: 15px;
  font-weight: bold;
`;

// Svg icons
const spinnerRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const PlayIcon = styled.svg`
  position: absolute;
  right: 10px;
  top: 3px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  color: #000;

  & path {
    fill: #fff;
  }

  &:hover path {
    fill: #548afd;
  }
`;

export const SpinnerContainer = styled.div`
  width: 100px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const Spinner = styled.svg`
  width: 40px;
  height: 40px;
  animation: ${spinnerRotate} 1.5s infinite;

  & path {
    fill: rgba(178, 216, 155, 1);
  }
`;

export const Spacing = styled.div`
  min-width: 25px;
`;

export const ScanContainer = styled.div`
  padding: 25px 50px;
  max-width: 100%;
  width: 100%;

  @media (max-width: 767px) {
    padding: 5px;
    .row {
      flex-flow: column;
    }
    
    & .fix-bug-tablet {
      max-width: 100%;
    }
  }
`;

export const ChartItem = styled.div`
  .chartTarget {
    min-width: 100%;
    max-width: 100%;
    height: 300px;
  }

  @media (max-width: 767px) {
    .chartTarget {
      height: 379px;
    }
  }
  
  @media (max-width: 414px) {
    .chartTarget {
      min-width: 350px;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  @media (max-width: 375px) {
    .chartTarget {
      min-width: 330px;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  @media (max-width: 320px) {
    .chartTarget {
      min-width: 300px;
      max-width: 300px;
      margin: 0 auto;
    }
  }
`;

export const ChartContainerItem = styled.div`
  .col-12 {
    padding: 0;
  }

  @media (max-width: 414px) {
    margin-bottom: 40px;
  }
`;

export const TotalAndChar = styled.div`
  padding: 25px 50px;
  width: 100%;

  & .row {
    .custom-padding-left {
      padding: 0 0 0 15px;
    }

    .custom-padding-right {
      padding: 0 15px 0 0;
    }
  }

  @media (max-width: 767px) {
    padding: 5px;

    & .row {
      .custom-padding-left {
        padding: 0;
      }

      .custom-padding-right {
        padding: 0;
      }
    }
  }
  
  @media (max-width: 576px) {
    padding: 5px;
    margin-bottom: 60px;

    & .row {
      .custom-padding-left {
        padding: 0 5px;
      }

      .custom-padding-right {
        padding: 0 5px;
      }
    }
  }
`;
