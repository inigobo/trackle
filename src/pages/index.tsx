import { WelcomeCard } from '@/src/ui/components/WelcomeCard'
import { WelcomeCarousel } from '@/src/ui/components/WelcomeCarousel'
import { styled } from '@stitches/react'
import { HomeLayoutStyles } from './Home.styles'

export default function Home({}) {
  return (
    <HomeLayout>
      <WelcomeCard />
      {/* <WelcomeCarousel gifs={} /> */}
    </HomeLayout>
  )
}

const HomeLayout = styled('div', HomeLayoutStyles)
