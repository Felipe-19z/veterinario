import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const showBackButton = location.pathname !== '/client';

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4, // Adiciona margem no topo para não sobrepor a navbar
            textAlign: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {title}
            </Typography>

            {children}

            {showBackButton && (
              <Box sx={{ mt: 2 }}>
                <Link to="/client" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">Voltar para o Painel</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
