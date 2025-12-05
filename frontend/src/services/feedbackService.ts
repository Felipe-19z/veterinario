
import api from './api';

// TODO: Define the full types later
type Topic = any;
type Comment = any;

/**
 * Fetches all feedback topics from the API.
 */
export const getAllFeedbackTopics = async (): Promise<Topic[]> => {
    try {
        const response = await api.get('/feedback/topics');
        return response.data;
    } catch (error) {        
        console.error('Failed to fetch feedback topics:', error);
        // You might want to throw the error or return a default value
        throw error;
    }
};

/**
 * Fetches a single feedback topic by its ID.
 * @param id The ID of the topic to fetch.
 */
export const getFeedbackTopicById = async (id: string): Promise<Topic> => {
    try {
        const response = await api.get(`/feedback/topics/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch feedback topic ${id}:`, error);
        throw error;
    }
};

/**
 * Creates a new feedback topic.
 * @param topicData The data for the new topic (e.g., { title, description, authorId }).
 */
export const createFeedbackTopic = async (topicData: { title: string; description: string; authorId: number }): Promise<Topic> => {
    try {
        const response = await api.post('/feedback/topics', topicData);
        return response.data;
    } catch (error) {
        console.error('Failed to create feedback topic:', error);
        throw error;
    }
};

/**
 * Adds a comment to a specific feedback topic.
 * @param topicId The ID of the topic to comment on.
 * @param commentData The data for the new comment (e.g., { content, authorId }).
 */
export const addCommentToTopic = async (topicId: string, commentData: { content: string; authorId: number }): Promise<Comment> => {
    try {
        const response = await api.post(`/feedback/topics/${topicId}/comments`, commentData);
        return response.data;
    } catch (error) {
        console.error(`Failed to add comment to topic ${topicId}:`, error);
        throw error;
    }
};

/**
 * Updates a comment.
 * @param commentId The ID of the comment to update.
 * @param content The new content of the comment.
 */
export const updateComment = async (commentId: number, content: string): Promise<Comment> => {
    try {
        const response = await api.put(`/feedback/comments/${commentId}`, { content });
        return response.data;
    } catch (error) {
        console.error(`Failed to update comment ${commentId}:`, error);
        throw error;
    }
};

/**
 * Deletes a comment.
 * @param commentId The ID of the comment to delete.
 */
export const deleteComment = async (commentId: number): Promise<void> => {
    try {
        await api.delete(`/feedback/comments/${commentId}`);
    } catch (error) {
        console.error(`Failed to delete comment ${commentId}:`, error);
        throw error;
    }
};
