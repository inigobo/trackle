import { styled } from '@stitches/react'
import { Carousel } from 'react-bootstrap'
import {
  CarouselCardLayoutStyles,
  CarouselContainerStyles,
} from './WelcomeCarousel.styles'

type WelcomeCarouselProps = {}

// WIP
export const WelcomeCarousel = ({ gifs }: WelcomeCarouselProps) => {
  return (
    <CarouselCardLayout>
      <h4>Need a hint for today's puzzle?</h4>
      <CarouselContainer interval={5000}>
        {gifs.map((gif, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block mx-auto"
              src={gif.images.fixed_height.url}
              alt={gif.title}
              style={{ width: 400, height: 270, objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </CarouselContainer>
    </CarouselCardLayout>
  )
}

const CarouselCardLayout = styled('div', CarouselCardLayoutStyles)
const CarouselContainer = styled(Carousel, CarouselContainerStyles)
