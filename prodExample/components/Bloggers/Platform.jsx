import React from 'react';
import {
  Zoom
} from 'react-reveal';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import Slider from 'react-slick';

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const fakeSlides = [
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
  {
    name: '...',
    img: require('../../../img/bork.png')
  },
];

const Platform = () => (
  <section className="platform">
    <Zoom fraction={0}>
      <Container>
        <div className="platform__heading">
          <h2>На нашей платформе работают</h2>
          <div className="underline underline-green"></div>   
        </div>
        <Slider {...sliderSettings} className="slider">
          {fakeSlides.map((slide, index) => (
            <div key={index}>
              <img
                className="m-auto img-fluid"
                src={slide.img}
                alt={slide.name}
              />
            </div>
          ))}
        </Slider>
      </Container>
    </Zoom>
  </section>
);

function NextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block'}}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block'}}
      onClick={onClick}
    />
  );
}

export {
  Platform
}