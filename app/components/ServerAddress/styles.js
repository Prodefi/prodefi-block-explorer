import styled from 'styled-components';

export const TextLink = styled.a`
  display: inline-block;
  padding-right: 5px;
  text-decoration: none;
  color: ${({ dependOn, color }) => (dependOn == 'detailRow' ? '#aaaaaa' : color || '#7bcc3a')};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
