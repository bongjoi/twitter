import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5000;
`;

export const Header = styled.header`
  padding: 0;
  position: relative;
  height: 44px;
  text-align: center;
  background: white;

  & h1 {
    margin: 0;
    font-size: 17px;
    line-height: 44px;
    color: #333333;
  }
`;

export const CloseButton = styled(CloseOutlined)`
  padding: 15px;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 14px;
  cursor: pointer;
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

export const Indicator = styled.div`
  text-align: center;

  & > div {
    display: inline-block;
    width: 75px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    color: white;
    text-align: center;
    background: #313131;
    border-radius: 15px;
  }
`;

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
`;
