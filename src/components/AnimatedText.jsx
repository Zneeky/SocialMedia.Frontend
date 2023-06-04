import { styled, keyframes } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const blueLogo="57B3D8";
const blueLightLogo="A2D6EB";
const animate = keyframes`
  0%, 100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
`;

const StyledTypography1 = styled(Typography)(({ theme }) => ({
  color: 'transparent',
  WebkitTextStroke: `0.5px ${theme.palette.primary.main}`,
  position: 'absolute',
  transform: 'translate(10%, -50%)',
  fontWeight: 'bold',
  fontSize: 'clamp(1rem, 2.5rem, 3rem)',
  zIndex:2,
  '&:hover': {
    WebkitTextStroke: `1px ${theme.palette.primary.main}`,
  },
}));

const StyledTypography2 = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  position: 'absolute',
  transform: 'translate(10%, -50%)',
  animation: `${animate} 4s ease-in-out infinite`,
  fontWeight: 'bold',
  fontSize: 'clamp(1rem, 2.5rem, 3rem)',
  cursor: 'pointer',
  
}));

const AnimatedText = ({text}) => {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <StyledTypography1 variant="h1">{text}</StyledTypography1>
        <StyledTypography2 variant="h1" onClick={() => navigate('/home')}>
        {text}
        </StyledTypography2>
      </div>
    </div>
  );
};

export default AnimatedText;