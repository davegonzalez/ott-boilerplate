import React from 'react';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const FeaturedCarousel = props => {
  return (
    <Slider {...settings}>
      {props._embedded.items.map(item => {
        return (
          <div>
            <div>{item.name}</div>
            <img src={item.thumbnail.medium} />
          </div>
        );
      })}
    </Slider>
  );
};

export default FeaturedCarousel;
