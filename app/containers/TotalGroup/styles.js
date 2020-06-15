import styled from 'styled-components';

export const TotalAndChartContainer = styled.div`
  display: block;
  padding: 25px 50px;
  width: 100%;
  font-size: 14px;
  font-family: Lato;

  @media (max-width: 767px) {
    overflow: auto;
  }
`;

export const TotalContainer = styled.div`
  background: rgb(255, 255, 255);

  @media (max-width: 1279px) {
    max-height: 300px;
  }
  @media (max-width: 767px) {
    margin: 0;
    max-height: 100%;
  }
`;

export const Total = styled.div`
  width: 100%;
  min-height: 300px @media (max-width: 414px) {
    padding: 10px;
  }

  & .no-padding {
    padding: 0;
  }

  & .row {
    margin: 0;
    min-height: 150px;
  }

  @media (max-width: 767px) {
    & .row {
      flex-flow: column;
    }
    
    & .no-padding {
      max-width: 100%;
    }
  }
`;

export const Chart = styled.div``;

export const TotalItem = styled.div`
  padding: 20px;
  height: 100%;
  & .total-item-title {
    color: #77838f;
  }

  &.item-top-left {
    border-right: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
  }

  &.item-top-right {
    border-right: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
  }
  &.item-bottom-left {
    border-right: 1px solid #f3f3f3;
  }
  &.item-bottom-right {
    border-right: 1px solid #f3f3f3;
  }

  @media (max-width: 767px) {
    text-align: center;
    &.item-bottom-left {
      border-right: 1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
    }
  }
`;
