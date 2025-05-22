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

export default function InternalLinks() {
  const [links, setLinks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  const [anchorText, setAnchorText] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("internalLinks");
    if (saved) setLinks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("internalLinks", JSON.stringify(links));
  }, [links]);

  const resetForm = () => {
    setAnchorText("");
    setUrl("");
    setEditingLink(null);
  };

  const openNewLinkDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditLinkDialog = (link) => {
    setAnchorText(link.anchorText);
    setUrl(link.url);
    setEditingLink(link);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!anchorText.trim() || !url.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editingLink) {
      setLinks((prev) =>
        prev.map((l) =>
          l.id === editingLink.id ? { ...l, anchorText, url } : l
        )
      );
    } else {
      setLinks((prev) => [
        ...prev,
        { id: Date.now(), anchorText, url },
      ]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this internal link?")) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Internal Links</CardTitle>
        <Button onClick={openNewLinkDialog} size="sm">
          + Add Link
        </Button>
      </CardHeader>
      <CardContent>
        {links.length === 0 ? (
          <p>No internal links added yet.</p>
        ) : (
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.id} className="flex justify-between items-center border p-2 rounded-md bg-gray-50">
                <div>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600">
                    {link.anchorText}
                  </a>
                  <p className="text-xs text-gray-600">{link.url}</p>
                </div>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditLinkDialog(link)}
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
            <DialogTitle>{editingLink ? "Edit Link" : "Add Link"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="anchor-text">Anchor Text</Label>
              <Input
                id="anchor-text"
                value={anchorText}
                onChange={(e) => setAnchorText(e.target.value)}
                placeholder="Enter anchor text"
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
