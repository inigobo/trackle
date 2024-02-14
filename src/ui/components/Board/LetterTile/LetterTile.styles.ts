const PresentCardStyles = {
  backgroundColor: '#e4a81d',
}

const MissingCardStyles = {
  backgroundColor: '#757575',
}

const CorrectCardStyles = {
  backgroundColor: '#43a047',
}

const EmptyCardStyles = {
  backgroundColor: 'white',
  border: '2px solid rgb(224, 224, 224)',
}
export const LetterTileLayoutStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '62.5px',
  maxWidth: '62.5px',
  height: '62.5px',
  maxHeight: '62.5px',
  color: 'white',
  border: '2px solid rgb(224, 224, 224)',
  borderColor: 'rgb(224, 224, 224)',
  fontSize: '1.875rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  borderRadius: '5px',
  userSelect: 'none',
  cursor: 'default',
  variants: {
    paint: {
      e: {
        //not played, empty
        ...EmptyCardStyles,
      },
      c: {
        //correct, green
        ...CorrectCardStyles,
      },
      p: {
        //present, yellow
        ...PresentCardStyles,
      },
      m: {
        //missing, grey
        ...MissingCardStyles,
      },
    },
  },
}
