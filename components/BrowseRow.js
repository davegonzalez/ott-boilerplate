import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
`;

const Content = styled.div`
  background-color: ${props => props.theme.rowBackground};
  color: ${props => props.theme.navLink};
  padding: 0 10px;
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.rowBackground};
  margin-bottom: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const BrowseRow = props => {
  return (
    <Container>
      <Slider {...settings}>
        {props.items.map(item => {
          return (
            <Content>
              <Image src={item.thumbnail.medium} />
              {item.title}
            </Content>
          );
        })}
      </Slider>
    </Container>
  );
};

export default BrowseRow;
