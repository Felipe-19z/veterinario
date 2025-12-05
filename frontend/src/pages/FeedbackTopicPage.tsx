
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Paper, List, ListItem, ListItemText, Divider, Typography, CircularProgress, Box, Alert, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Layout from '../components/Layout';
import { getFeedbackTopicById, addCommentToTopic, updateComment, deleteComment } from '../services/feedbackService';

const FeedbackTopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<any | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const fetchTopic = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await getFeedbackTopicById(id);
      setTopic(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar o tópico. Verifique o URL ou tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [id]);

  const getLoggedInUserId = (): number | null => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  };

  const handleAddComment = async () => {
    const userId = getLoggedInUserId();
    if (!id || !newComment.trim()) {
      alert('Por favor, escreva um comentário.');
      return;
    }
    if (!userId) {
      alert('Por favor, faça login novamente.');
      return;
    }
    try {
      await addCommentToTopic(id, { content: newComment, authorId: userId });
      setNewComment('');
      fetchTopic();
    } catch (err) {
      setError('Falha ao adicionar o comentário. Tente novamente.');
      console.error(err);
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!editedContent.trim()) {
      alert('O comentário não pode estar vazio.');
      return;
    }
    try {
      await updateComment(commentId, editedContent);
      setEditingCommentId(null);
      setEditedContent('');
      fetchTopic();
    } catch (err) {
      setError('Falha ao atualizar o comentário.');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('Tem certeza de que deseja excluir este comentário?')) {
      try {
        await deleteComment(commentId);
        fetchTopic();
      } catch (err) {
        setError('Falha ao excluir o comentário.');
        console.error(err);
      }
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, commentId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCommentId(null);
  };

  const handleEditClick = () => {
    if (selectedCommentId) {
      const commentToEdit = topic.comments.find((c: any) => c.id === selectedCommentId);
      if (commentToEdit) {
        setEditingCommentId(selectedCommentId);
        setEditedContent(commentToEdit.content);
      }
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedCommentId) {
      handleDeleteComment(selectedCommentId);
    }
    handleMenuClose();
  };

  const getAvatarColor = (role: string) => {
    return role === 'VET' ? '#4caf50' : '#2196f3';
  };

  const loggedInUserId = getLoggedInUserId();

  if (loading) return <Layout title=""><CircularProgress /></Layout>;
  if (error) return <Layout title="Erro"><Alert severity="error">{error}</Alert></Layout>;
  if (!topic) return <Layout title="Tópico não encontrado"><Alert severity="warning">Tópico não encontrado.</Alert></Layout>;

  return (
    <Layout title={topic.title}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>{topic.title}</Typography>
        <Typography variant="body1" color="text.secondary">Postado por: {topic.author.email}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">{topic.description}</Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Comentários</Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <List>
          {topic.comments.map((comment: any) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <Avatar sx={{ mr: 2, bgcolor: getAvatarColor(comment.author.role) }}>
                  {comment.author.email.charAt(0).toUpperCase()}
                </Avatar>
                <ListItemText
                  primary={
                    editingCommentId === comment.id ? (
                      <TextField
                        fullWidth
                        multiline
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      comment.content
                    )
                  }
                  secondary={`- ${comment.author.email} em ${new Date(comment.createdAt).toLocaleDateString()}`}
                />
                {loggedInUserId === comment.authorId && (
                  <Box>
                    {editingCommentId === comment.id ? (
                      <Box>
                        <Button onClick={() => handleUpdateComment(comment.id)} sx={{ mr: 1 }}>Salvar</Button>
                        <Button onClick={() => setEditingCommentId(null)}>Cancelar</Button>
                      </Box>
                    ) : (
                      <>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(e) => handleMenuClick(e, comment.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl) && selectedCommentId === comment.id}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleEditClick}>Editar</MenuItem>
                          <MenuItem onClick={handleDeleteClick}>Excluir</MenuItem>
                        </Menu>
                      </>
                    )}
                  </Box>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
          {topic.comments.length === 0 && <ListItem><ListItemText primary="Nenhum comentário ainda." /></ListItem>}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Adicionar um Comentário</Typography>
        <TextField
          label="Escreva seu comentário..."
          fullWidth
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddComment}>Enviar Comentário</Button>
      </Paper>
    </Layout>
  );
};

export default FeedbackTopicPage;
