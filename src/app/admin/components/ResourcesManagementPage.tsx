'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { resourceApi, type Resource } from '@/lib/resourceApi';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  Youtube,
  FileText,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ResourcesManagementPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    suitableForLearners: 'all',
    q: '',
  });
  const [videoUrl, setVideoUrl] = useState('');
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 1,
  });

  const fetchResources = async (page = 1) => {
    setIsLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== 'all')
      );
      const response = await resourceApi.searchResources({
        ...cleanFilters,
        page: page.toString(),
        limit: '6',
      });
      console.log('Resources response:', response);
      // response.data contains { data: Resource[], total, totalPages, page }
      setResources(response.data?.data || []);
      setPagination({
        page: response.data?.page || 1,
        total: response.data?.total || 0,
        totalPages: response.data?.totalPages || 1,
      });
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      toast.error('Failed to fetch resources');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchResources(page);
  };

  const handleFilterChange = () => {
    fetchResources(1);
  };

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      suitableForLearners: 'all',
      q: '',
    });
    fetchResources(1);
  };

  const handleTriggerRss = async () => {
    setIsCrawling(true);
    try {
      await resourceApi.triggerRss();
      toast.success('RSS crawl triggered successfully');
      fetchResources(pagination.page);
    } catch (error) {
      console.error('Failed to trigger RSS:', error);
      toast.error('Failed to trigger RSS crawl');
    } finally {
      setIsCrawling(false);
    }
  };

  const handleSaveVideo = async () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }

    setIsSaving(true);
    try {
      await resourceApi.saveTranscript(videoUrl);
      toast.success('Video saved successfully');
      setVideoUrl('');
      setShowAddVideo(false);
      fetchResources(pagination.page);
    } catch (error) {
      console.error('Failed to save video:', error);
      toast.error('Failed to save video');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApprove = async (resource: Resource) => {
    try {
      await resourceApi.updateResource(resource._id, {
        suitableForLearners: true,
      });
      toast.success('Resource approved');
      fetchResources(pagination.page);
    } catch (error) {
      console.error('Failed to approve resource:', error);
      toast.error('Failed to approve resource');
    }
  };

  const handleReject = async (resource: Resource) => {
    if (!confirm('Are you sure you want to reject this resource?')) return;

    try {
      await resourceApi.updateResource(resource._id, {
        suitableForLearners: false,
      });
      toast.success('Resource rejected');
      fetchResources(pagination.page);
    } catch (error) {
      console.error('Failed to reject resource:', error);
      toast.error('Failed to reject resource');
    }
  };

  const handleDelete = async (resource: Resource) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      await resourceApi.deleteResource(resource._id);
      toast.success('Resource deleted');
      fetchResources(pagination.page);
    } catch (error) {
      console.error('Failed to delete resource:', error);
      toast.error('Failed to delete resource');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resources Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage learning resources and content
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleTriggerRss} disabled={isCrawling}>
            {isCrawling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Crawling...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Trigger RSS Crawl
              </>
            )}
          </Button>
          <Dialog open={showAddVideo} onOpenChange={setShowAddVideo}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add YouTube Video
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add YouTube Video</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">YouTube URL</Label>
                  <Input
                    id="videoUrl"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSaveVideo}
                  disabled={isSaving}
                  className="w-full"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Video'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) =>
                  setFilters({ ...filters, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="web_rss">Web RSS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filters.suitableForLearners}
                onValueChange={(value) =>
                  setFilters({ ...filters, suitableForLearners: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Approved</SelectItem>
                  <SelectItem value="false">Not Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Search</Label>
              <Input
                placeholder="Search by title..."
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleFilterChange} variant="outline">
              Apply Filters
            </Button>
            <Button onClick={handleResetFilters} variant="ghost">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : resources.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center text-muted-foreground">
                No resources found
              </div>
            </CardContent>
          </Card>
        ) : (
          resources.map((resource) => (
            <Card key={resource._id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {resource.type === 'youtube' ? (
                        <Youtube className="h-5 w-5 text-red-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-blue-500" />
                      )}
                      <h3 className="font-semibold text-lg">
                        {resource.title}
                      </h3>
                    </div>

                    {resource.summary && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.summary}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{resource.type}</Badge>
                        {resource.suitableForLearners !== undefined && (
                          <Badge
                            variant={
                              resource.suitableForLearners
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {resource.suitableForLearners
                              ? 'Approved'
                              : 'Not Approved'}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Published{' '}
                      {formatDistanceToNow(new Date(resource.publishedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="h-8 w-8"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    {resource.suitableForLearners ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(resource)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        Reject
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(resource)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Approve
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(resource)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {resources.length} of {pagination.total} resources
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-3 text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
