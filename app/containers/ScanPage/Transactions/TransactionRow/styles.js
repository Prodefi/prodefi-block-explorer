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
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ItemContainer = styled.tr`
  padding: 0px 5px;
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.1);
  background-color: ${({ iteration }) => (iteration % 2 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)')};
`;

export const TextSpan = styled.td`
  padding: 7px 0px;
  font-size: 12px;
  color: #7bcc3a;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 10px;
  text-align: center;
  min-width: 75px;
`;
