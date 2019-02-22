import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styled from 'styled-components';
import { Link } from 'root/routes';

const Container = styled.div`
  padding: 30px;
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.rowBackground};
  margin-bottom: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  opacity: 1;
  transition: opacity 0.4s ease;
`;

const Content = styled.div`
  background-color: ${props => props.theme.rowBackground};
  color: ${props => props.theme.navLink};
  padding: 0 10px;
  cursor: pointer;
  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.7;
    }
  }
`;

const settings = {
  dots: true,
  infinite: false,
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
            <Link
              href={`/watch?slug=${item.url}`}
              as={`/watch/${item.url}`}
              passHref
              prefetch
              key={item.title}
            >
              <Content>
                <Image src={item.thumbnail.medium} />
                {item.title}
              </Content>
            </Link>
          );
        })}
      </Slider>
    </Container>
  );
};

export default BrowseRow;

BrowseRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};
