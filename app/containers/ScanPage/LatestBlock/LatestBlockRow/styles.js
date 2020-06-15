import styled from 'styled-components';

export const RowData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 0 3px 10px;
  background-color: ${({ iteration }) => (iteration % 2 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)')};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #7bcc3a;
  font-size: 13px;
  display: flex;

  &:hover {
    text-decoration: underline;
  }
`;

export const ItemContainer = styled.div`
  border: 1px solid #eee;
  background-color: ${({ iteration }) => (iteration % 2 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)')};
  padding: 0.75rem 1.25rem;
  border-bottom: none;
  font-size: 14px;
  max-height: 100px;
  min-height: 70px;
  width: 100%;

  &:last-child {
    border-bottom: 1px solid #eee;
  }

  & .row {
    &.row-text-baseline {
      align-items: baseline;
      margin: 0;
      justify-content: flex-end;
    }
  }
  
  @media (max-width: 1024px) {
    max-height: 120px;
    height: 85px;
  }

  @media (max-width: 992px) {
    & .custom-mobile {
      display: flex;
    }
    & .row {
      &.row-text-baseline {
        flex-flow: row;
        justify-content: flex-start;
        padding-left: 10px;
      }
    }
  }
  
  @media (max-width: 767px) {
    padding: 5px;
    & .custom-mobile {
      display: flex;
    }
    & .row {
      &.row-text-baseline {
        flex-flow: row;
        justify-content: flex-start;
        padding-left: 10px;
      }
    }
  }
`;

export const TextSpan = styled.div`
  font-size: 13px;
  color: #000;
  padding-left: 10px;
  min-width: 75px;
  display: flex;
  align-items: center;

  @media (max-width: 1400px) {
    span {
      font-size: 11px;
    }
  }
  
  @media (min-width: 1241px) {
    &.custom-total {
      width: 100%;
      justify-content: flex-end;
    }
  }

  @media (max-width: 767px) {
    align-items: flex-start;

    &.custom-total {
      justify-content: flex-start;
    }
  }
`;

export const FlexContainer70 = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 70%;

  & .proposer {
    display: flex;

    & span {
      min-width: 42%;
    }
    & a {
      min-width: 58%;
    }
  }
`;

export const FlexContainer30 = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 30%;
  align-items: flex-end;

  @media (max-width: 767px) {
    align-items: flex-start;
  }
`;
