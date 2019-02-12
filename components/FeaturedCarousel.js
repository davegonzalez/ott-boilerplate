import React from 'react';
import Slider from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';

const SliderStyles = createGlobalStyle`
  .slick-next {
    right: 15px;
  }

  .slick-slide {
    > div {
      height: 500px;
    }
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
};

const Slide = styled.div`
  background-color: #000;
  height: 100%;
  width: 100%;
  display: flex !important;
  align-items: center;
  position: absolute;
  transform: translateZ(0);
`;

const Content = styled.div`
  padding-left: 80px;
  position: absolute;
  width: 480px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  color: white;
  z-index: 1;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 40px;
  text-shadow: 0 1px 10px #000;
`;

const ImageBg = styled.div`
  background-color: #000;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  top: 0;
  right: 0;
  z-index: 0;
  position: fixed;

  > img {
    height: 500px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    height: 100%;
    z-index: 1000;
    background: linear-gradient(90deg, #000 0, transparent);
  }
`;

const FeaturedCarousel = props => {
  return (
    <Slider {...settings}>
      {props._embedded.items.map(item => {
        return (
          <Slide>
            <Content>
              <Title>{item.name}</Title>
            </Content>
            <ImageBg>
              <ImageContainer>
                <img src={item.thumbnail.medium} />
              </ImageContainer>
            </ImageBg>
          </Slide>
        );
      })}
      <SliderStyles />
    </Slider>
  );
};

export default FeaturedCarousel;
