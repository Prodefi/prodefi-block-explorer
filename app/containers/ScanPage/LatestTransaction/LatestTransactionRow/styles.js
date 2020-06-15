import styled from 'styled-components';

export const RowData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 0 3px 10px;
  background-color: ${({iteration}) => (iteration % 2 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)')};
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
    text-decoration: none !important;
    color: #468216 !important;
  }

  &.link-long-address {
    max-width: 90%;
    width: 100%;
  }
`;

export const ItemContainer = styled.div`
  background-color: ${({iteration}) => (iteration % 2 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)')};
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  min-height: 70px;

  &:last-child {
    border-bottom: none;
  }

  & .row {
    align-items: baseline;
  }
  
  & .custom-value-tx {
    display: flex;
    justify-content: flex-end;
  }

  & .delegator-address {
    div {
      display: flex;
      align-items: center;

      span {
        min-width: 40px;
      }

      a {
        width: 90%;
        max-width: 90%;
        color: #7bcc3a;
        font-size: 14px;
      }
    }
  }
  
  @media (max-width: 1279px) {
    & .row {
      align-items: center;
    }
    & .custom-value-tx {
      padding-left: 10px;
      justify-content: flex-start;
    }
  }
  
  @media (max-width: 1024px) {
    & .custom-value-tx {
      padding-left: 10px;
      justify-content: flex-start;
    }
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
    & .custom-value-tx {
      justify-content: flex-start;
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
    
    & .delegator-address {
      padding-left: 10px;
    }
  }
`;

export const TextSpan = styled.div`
  font-size: 14px;
  color: #7bcc3a;
  padding-left: 10px;
  min-width: 75px;
  min-width: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.margin-bottom-10px {
    margin-bottom: 10px;
  }

  @media (max-width: 1400px) {
    span {
      font-size: 11px;
    }
  }
  
  @media (max-width: 992px) {
    &.text-span-icon {
      padding-left: 0px;
    }
  }

  @media (max-width: 767px) {
    &.delegator-address {
      flex-flow: column;
    }
  }
`;

export const FlexContainer66 = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 66%;
  // align-items: flex-start;
`;

export const FlexContainer34 = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 34%;
  align-items: flex-end;
`;
