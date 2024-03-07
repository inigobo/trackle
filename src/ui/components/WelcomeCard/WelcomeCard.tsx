import { styled } from '@stitches/react'
import { WelcomeCardLayoutStyles } from './WelcomeCard.styles'
import Link from 'next/link'

export const WelcomeCard = () => {
  return (
    <WelcomeCardLayout>
      <h3>Bienvenido a Trackle!</h3>
      <p>
        Aquí podrás añadir tus partidas diarias de juegos diarios.
      </p>
      <h5>¿Has completado los desafíos de hoy?</h5>
      <p>
        <Link target="_blank" href="https://lapalabradeldia.com/">
          La Palabra del Día
        </Link>
         {' en castellano'}
      </p>
      <p>
        <Link
          target="_blank"
          href="https://www.nytimes.com/games/wordle/index.html">
          NY Times Wordle
        </Link>
        {' en inglés'}
      </p>
    </WelcomeCardLayout>
  )
}

const WelcomeCardLayout = styled('div', WelcomeCardLayoutStyles)
