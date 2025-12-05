
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Paper, List, ListItem, ListItemText, Divider, Typography, CircularProgress, Box, Alert } from '@mui/material';
import Layout from '../components/Layout';
import { getAllFeedbackTopics, createFeedbackTopic } from '../services/feedbackService';

// A basic user object, you might want to get this from a context or auth service
const mockUser = {
  id: 1, // In a real app, this would be the logged-in user's ID
  role: 'CLIENT'
};

const FeedbackPage: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const data = await getAllFeedbackTopics();
      setTopics(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar os tópicos. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleCreateTopic = async () => {
    if (!newTopicTitle || !newTopicDescription) {
        alert("Por favor, preencha o título e a descrição.");
        return;
    }
    try {
        await createFeedbackTopic({ 
            title: newTopicTitle, 
            description: newTopicDescription, 
            authorId: mockUser.id // Using mock user ID
        });
        setNewTopicTitle('');
        setNewTopicDescription('');
        fetchTopics(); // Refresh the list after creation
    } catch (err) {
        setError('Falha ao criar o tópico. Tente novamente.');
        console.error(err);
    }
  };

  return (
    <Layout title="Comunidade e Feedback">
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Criar Novo Tópico</Typography>
        <TextField
          label="Título do Tópico"
          fullWidth
          value={newTopicTitle}
          onChange={(e) => setNewTopicTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Descreva sua ideia ou problema"
          fullWidth
          multiline
          rows={4}
          value={newTopicDescription}
          onChange={(e) => setNewTopicDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleCreateTopic}>
          Publicar Tópico
        </Button>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Tópicos da Comunidade</Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <Paper elevation={3}> 
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        ) : (
            <List>
            {topics.length === 0 && !loading ? (
                <ListItem>
                    <ListItemText primary="Nenhum tópico encontrado. Seja o primeiro a criar um!" />
                </ListItem>
            ) : (
                topics.map((topic) => (
                    <React.Fragment key={topic.id}>
                        <ListItem 
                            component={Link} 
                            to={`/feedback/${topic.id}`}
                            alignItems="flex-start"
                        >
                            <ListItemText
                            primary={topic.title}
                            secondary={`Postado por: ${topic.author.email} - Comentários: ${topic._count.comments}`}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))
            )}
            </List>
        )}
      </Paper>
    </Layout>
  );
};

export default FeedbackPage;
