import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Container } from '@mui/material';

const AdminSupportPage: React.FC = () => {
  const supportMessages = [
    { id: 1, name: 'John Doe', description: 'I can\'t log in to my account.' },
    { id: 2, name: 'Jane Smith', description: 'I have a question about my appointment.' },
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mensagens de Suporte
        </Typography>
        <Paper elevation={3}>
          <List>
            {supportMessages.map((message) => (
              <ListItem key={message.id}>
                <ListItemText
                  primary={message.name}
                  secondary={message.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminSupportPage;
