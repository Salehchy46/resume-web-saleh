// src/services/projectService.js
import { get, post, put, del } from './api';

export const fetchProjects = async () => {
  const res = await get('/projects');
  return res; // { success, data }
};

export const fetchProject = async (id) => {
  const res = await get(`/projects/${id}`);
  return res;
};

export const createProject = async (projectData) => {
  const res = await post('/projects', projectData);
  return res;
};

export const updateProject = async (id, projectData) => {
  const res = await put(`/projects/${id}`, projectData);
  return res;
};

export const deleteProject = async (id) => {
  const res = await del(`/projects/${id}`);
  return res;
};

export const reorderProjects = async (ids) => {
  const res = await post('/projects/reorder', { ids });
  return res;
};