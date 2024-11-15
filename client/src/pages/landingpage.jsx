import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#181413',
  color: '#ffffff',
});

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#1db954',
});

const Title = styled(Typography)({
  flexGrow: 1,
  fontWeight: 700,
});

const Hero = styled(Container)({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '64px 0 48px',
});

const HeroText = styled(Typography)({
  color: '#1db954',
  fontWeight: 700,
});

const CustomButton = styled(Button)({
  marginTop: '32px',
  backgroundColor: '#1db954',
  color: '#181413',
  '&:hover': {
    backgroundColor: '#1ed760',
  },
});

const Footer = styled(Box)({
  flexShrink: 0,
  padding: '16px',
  backgroundColor: '#121212',
  textAlign: 'center',
});

function LandingPage() {
  return (
    <Root>
      <CustomAppBar position="static">
        <Toolbar>
          <Title variant="h6">
            Artstr
          </Title>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/register">Register</Button>
        </Toolbar>
      </CustomAppBar>
      <Hero>
        <HeroText variant="h2">
          Welcome to Artstr
        </HeroText>
        <Typography variant="h5" color="textSecondary" paragraph>
          Discover and share your favorite art pieces with the world.
        </Typography>
        <CustomButton variant="contained" href="/register">
          Get Started
        </CustomButton>
      </Hero>
      <Footer>
        <Typography variant="body2" color="textSecondary">
          © 2023 Artstr. All rights reserved.
        </Typography>
      </Footer>
    </Root>
  );
}

export default LandingPage;