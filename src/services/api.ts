import axios from 'axios';
import { AuthResponse, Post, Comment, UsersResponse } from '../types';

// Use environment variable for API URL
const API_URL = '';
console.log('[API] Using API_URL:', API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const signup = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('[API] Signup request:', { username, password });
    const response = await api.post('/auth/signup', { username, password });
    console.log('[API] Signup response:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('[API] Signup error:', err?.response || err);
    throw err;
  }
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

// Post APIs
export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get('/api/posts');
  return response.data;
};

export const createPost = async (title: string, content: string): Promise<Post> => {
  const response = await api.post('/api/posts', { title, content });
  return response.data;
};

// Comment APIs
export const createComment = async (content: string, postId: number, userName?: string): Promise<Comment> => {
  const response = await api.post('/api/comments', { content, postId, userName });
  return response.data;
};

// Admin APIs
export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  const response = await api.get(`/api/users?page=${page}&limit=${limit}`);
  return response.data;
};

// TODO: Students - Add API functions for the following:
// 1. Updating a post (PUT /api/posts/:id)
// 2. Deleting a post (DELETE /api/posts/:id)
// 3. Deleting a comment (DELETE /api/comments/:id)
// 4. Getting a specific user by ID (GET /api/users/:id)
// 5. Admin: Creating a user (POST /api/users)
// 6. Admin: Updating a user (PUT /api/users/:id)
// 7. Admin: Changing user role (PATCH /api/users/:id/role)
// 8. Admin: Deleting a user (DELETE /api/users/:id)
// Ensure proper error handling and type safety
