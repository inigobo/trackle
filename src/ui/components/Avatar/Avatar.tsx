import { getSGV } from '@/src/services/apiCalls'
import { styled } from '@stitches/react'
import { Image } from 'react-bootstrap'
import { AvatarStyles } from './Avatar.styles'

type AvatarProps = {
  variant: 'big' | 'medium' | 'small'
  seed: string
}

export const Avatar = ({ variant, seed }: AvatarProps) => {
  return (
    <AvatarContainer size={variant}>
      <Image
        src={getSGV(seed)}
        alt={'Avatar'}
        rounded
        className="border border-secondary"
      />
    </AvatarContainer>
  )
}

const AvatarContainer = styled('div', AvatarStyles)
