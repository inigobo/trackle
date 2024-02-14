import { styled } from '@stitches/react'
import { Stack } from 'react-bootstrap'
import { DescriptionStyle, ValueStyle } from './InfoContainer.styles'
import { Icon } from '../../Icon'

type InfoContainerProps = {
  description: string
  value: number
}

export const InfoContainer = ({ description, value }: InfoContainerProps) => {
  return (
    <Stack direction="horizontal">
      <Icon iconName={'Snow'} />
      <ValueContainer>{value} </ValueContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
    </Stack>
  )
}

const ValueContainer = styled('div', ValueStyle)
const DescriptionContainer = styled('div', DescriptionStyle)
