import { styled } from "@stitches/react";

export const Button = styled('button', {
  marginTop: 'auto',
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