import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
} from "@/components/ui";

export default function FreeBacklinks() {
  const [backlinks, setBacklinks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  const [siteName, setSiteName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("freeBacklinks");
    if (saved) setBacklinks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("freeBacklinks", JSON.stringify(backlinks));
  }, [backlinks]);

  const resetForm = () => {
    setSiteName("");
    setUrl("");
    setEditingLink(null);
  };

  const openNewDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (link) => {
    setSiteName(link.siteName);
    setUrl(link.url);
    setEditingLink(link);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!siteName.trim() || !url.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editingLink) {
      setBacklinks((prev) =>
        prev.map((l) =>
          l.id === editingLink.id ? { ...l, siteName, url } : l
        )
      );
    } else {
      setBacklinks((prev) => [
        ...prev,
        { id: Date.now(), siteName, url },
      ]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this backlink?")) {
      setBacklinks((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Free Backlinks</CardTitle>
        <Button onClick={openNewDialog} size="sm">
          + Add Backlink
        </Button>
      </CardHeader>
      <CardContent>
        {backlinks.length === 0 ? (
          <p>No backlinks tracked yet.</p>
        ) : (
          <ul className="space-y-2">
            {backlinks.map((link) => (
              <li key={link.id} className="flex justify-between items-center border p-2 rounded-md bg-gray-50">
                <div>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600">
                    {link.siteName}
                  </a>
                  <p className="text-xs text-gray-600">{link.url}</p>
                </div>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(link)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(link.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLink ? "Edit Backlink" : "Add Backlink"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Enter site name"
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                type="url"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>{editingLink ? "Save" : "Add"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
