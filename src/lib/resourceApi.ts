import api from './api';

export interface Resource {
  _id: string;
  type: string;
  url: string;
  title: string;
  publishedAt: string;
  lang: string;
  summary?: string;
  content?: string;
  keyPoints?: string[];
  labels?: {
    cefr?: string;
    style?: string;
    domain?: string;
    topic?: string[];
    genre?: string;
    setting?: string;
    speechActs?: string[];
  };
  suitableForLearners?: boolean;
  moderationNotes?: string;
}

export interface UpdateResourceDto {
  title?: string;
  summary?: string;
  suitableForLearners?: boolean;
}

export const resourceApi = {
  // Search resources
  searchResources: async (filters?: Record<string, string>) => {
    const response = await api.get('/resources', { params: filters });
    return response.data;
  },

  // Get transcript
  getTranscript: async (url: string) => {
    const response = await api.post('/resources', { url });
    return response.data;
  },

  // Save transcript
  saveTranscript: async (url: string) => {
    const response = await api.post('/resources/save', { url });
    return response.data;
  },

  // Update resource
  updateResource: async (id: string, data: UpdateResourceDto) => {
    const response = await api.put(`/resources/${id}`, data);
    return response.data;
  },

  // Delete resource
  deleteResource: async (id: string) => {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  },

  // Trigger RSS crawl
  triggerRss: async () => {
    const response = await api.get('/resources/rss/trigger');
    return response.data;
  },
};
