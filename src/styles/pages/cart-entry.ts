import { styled } from "@stitches/react";

export const CartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '2rem'
}
)

export const Button = styled('button', {
  marginTop: 'auto',
  backgroundColor: '$red500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '0.5rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$red300',
  }
})

export const BuyButton = styled('button', {
  marginTop: '1.5rem',
  backgroundColor: '$red700',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '0.5rem',
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
})