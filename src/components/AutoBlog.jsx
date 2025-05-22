import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
} from "@/components/ui";

export default function AutoBlog() {
  const [posts, setPosts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load saved posts from localStorage (simulate DB)
  useEffect(() => {
    const saved = localStorage.getItem("autoBlogPosts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // Save posts to localStorage on update
  useEffect(() => {
    localStorage.setItem("autoBlogPosts", JSON.stringify(posts));
  }, [posts]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingPost(null);
  };

  const openNewPostDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditPostDialog = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editingPost) {
      // Update existing post
      setPosts((prev) =>
        prev.map((p) => (p.id === editingPost.id ? { ...p, title, content } : p))
      );
    } else {
      // Add new post
      setPosts((prev) => [
        ...prev,
        { id: Date.now(), title, content, createdAt: new Date().toISOString() },
      ]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this scheduled post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Auto Blog</CardTitle>
        <Button onClick={openNewPostDialog} size="sm">
          + New Post
        </Button>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p>No scheduled posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.id} className="border p-3 rounded-md bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.content.slice(0, 100)}...</p>
                    <p className="text-xs text-gray-400">
                      Scheduled: {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => openEditPostDialog(post)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
              />
            </div>
            <div>
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write content here..."
                rows={6}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>{editingPost ? "Save Changes" : "Add Post"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
