import styled from '@emotion/styled';

export default styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: #1d1d1d;
  z-index: ${({ cartOpen }) => cartOpen ? 100 : 100};
  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  opacity: ${({ open }) => open ? 0.9 : 0};
  transition: opacity 0.2s ease-in;
`;
