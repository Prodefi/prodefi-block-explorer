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
  margin-bottom: 40px;
  background: rgb(255, 255, 255);
`;

export const Total = styled.div`
  width: 100%;
`;

export const ChartContainer = styled.div`
  height: 300px;

  @media (max-width: 767px) {
    margin: 0;
    & .row {
      margin: 0;
      .no-padding {
        padding: 0;
      }
    }
  }
  
  @media (max-width: 576px) {
    margin: 25px 0;
    & .row {
      margin: 0;
      .no-padding {
        padding: 0;
      }
    }
  }

  @media (max-width: 414px) {
    .row {
      justify-content: center;
    }
  }
`;
