
import { styled } from "..";

export const ProductContainer = styled('main', {

  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto'
})

export const ImageContainer = styled('div', {
  background: '#fa8700',
  width: '100%',
  maxWidth: 576,
  height: 656,
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: 'linear-gradient(180deg, #ffd700 0%, #ff0000 100%)',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$red700',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: 'linear-gradient(180deg, #ffd700 0%, #ff0000 100%)',
    }
  },
})

export const Select = styled('select', {
  marginLeft: '15px',
  fontSize: '$md',
  border: '1px solid $gray300',
  borderRadius: 4,
  padding: '0.75rem',
  backgroundColor: '$gray900',
  color: '$gray300',
})