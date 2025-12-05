
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInboxMessages } from '../services/inboxService';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Button,
  Box,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Define a type for the message object
interface Message {
  id: number;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

const InboxPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userId = '1'; // Replace with dynamic user ID
        const response = await getInboxMessages(userId);
        setMessages(response.data);
      } catch (err) {
        setError('Failed to fetch inbox messages.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)} // Go back to the previous page
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1">
            Caixa de Entrada
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <List>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <React.Fragment key={message.id}>
                  <ListItem alignItems="flex-start" sx={{ fontWeight: message.isRead ? 'normal' : 'bold' }}>
                    <ListItemText
                      primary={message.subject}
                      secondary={`- ${message.body}`}
                      primaryTypographyProps={{ fontWeight: message.isRead ? 'normal' : 'bold' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </Typography>
                  </ListItem>
                  {index < messages.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography color="text.secondary">Nenhuma mensagem encontrada.</Typography>
              </Box>
            )}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default InboxPage;
