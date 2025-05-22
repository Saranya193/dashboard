import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  FileText,
  Link,
  Network,
  Users,
  LifeBuoy,
  RefreshCcw,
  MessageSquare,
  User,
  Menu,
  X,
} from "lucide-react";

import AutoBlog from "@/components/AutoBlog";
import InternalLinks from "@/components/InternalLinks";
import FreeBacklinks from "@/components/FreeBacklinks";
import AffiliateProgram from "@/components/AffiliateProgram";
import HelpCenter from "@/components/HelpCenter";
import Updates from "@/components/Updates";
import LiveChatSupport from "@/components/LiveChatSupport";
import Profile from "@/components/Profile";
import ArticleTable from "@/components/ArticleTable";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
} from "@/components/ui";

const iconMap = {
  "Create Article": FileText,
  "Generated Articles": FileText,
  "Published Articles": FileText,
  "Scheduled Articles": FileText,
  "Archived Articles": FileText,
  "Article Settings": FileText,
  "Auto Blog": LayoutDashboard,
  "Internal Links": Link,
  "Free Backlinks": Network,
  "Affiliate Program": Users,
  "Help Center": LifeBuoy,
  "Updates": RefreshCcw,
  "Live Chat Support": MessageSquare,
  "Profile": User,
};

const menuItems = [
  {
    label: "Articles",
    items: [
      "Create Article",
      "Generated Articles",
      "Published Articles",
      "Scheduled Articles",
      "Archived Articles",
      "Article Settings",
    ],
  },
  "Auto Blog",
  "Internal Links",
  "Free Backlinks",
  "Affiliate Program",
  "Help Center",
  "Updates",
  "Live Chat Support",
  "Profile",
];

// Create Article form component
function CreateArticle({ onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please fill in all fields");
    onSave({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Article Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required rows={6} />
      </div>
      <Button type="submit">Save Article</Button>
    </form>
  );
}

// Article Settings component
function ArticleSettings({ settings, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="visibility">Visibility</Label>
        <Select value={settings.visibility} onValueChange={(v) => onChange({ ...settings, visibility: v })}>
          <SelectTrigger id="visibility"><SelectValue placeholder="Select visibility" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={settings.category} onValueChange={(v) => onChange({ ...settings, category: v })}>
          <SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function CustomSidebar({ selectedItem, setSelectedItem }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isArticlesOpen, setIsArticlesOpen] = useState(true);
  const [articleSettings, setArticleSettings] = useState({
    visibility: "public",
    category: "General",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Toggle button for both desktop & mobile */}
      <button
        aria-label="Toggle sidebar"
        className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded hover:bg-gray-200 md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white border-r p-4 transition-transform duration-300 ease-in-out overflow-auto
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xl font-semibold">DashBoard</div>
            <div className="text-sm text-gray-500">amazon.com</div>
          </div>
          {/* Collapse toggle for desktop */}
          <button
            aria-label="Toggle sidebar"
            className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded hover:bg-gray-200 md:hidden"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        <nav className="space-y-3">
          {menuItems.map((section, idx) =>
            typeof section === "string" ? (
              <MenuItem
                key={idx}
                label={section}
                icon={iconMap[section]}
                active={selectedItem === section}
                onClick={() => handleItemClick(section)}
              />
            ) : (
              <div key={idx}>
                <div
                  onClick={() => setIsArticlesOpen(!isArticlesOpen)}
                  className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase cursor-pointer hover:text-black py-1 px-2 rounded-md"
                >
                  <span>{section.label}</span>
                  {isArticlesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
                {isArticlesOpen &&
                  section.items.map((item, i) => (
                    <MenuItem
                      key={i}
                      label={item}
                      icon={iconMap[item]}
                      active={selectedItem === item}
                      onClick={() => handleItemClick(item)}
                      indent
                    />
                  ))}
              </div>
            )
          )}
        </nav>

        <Dialog open={selectedItem === "Create Article"} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Article</DialogTitle>
            </DialogHeader>
            <CreateArticle onSave={() => setSelectedItem(null)} />
          </DialogContent>
        </Dialog>

        <Dialog open={selectedItem === "Article Settings"} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Article Settings</DialogTitle>
            </DialogHeader>
            <ArticleSettings settings={articleSettings} onChange={setArticleSettings} />
          </DialogContent>
        </Dialog>
      </aside>
    </>
  );
}

// Extracted menu item component
function MenuItem({ label, icon: Icon, active, onClick, indent = false }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer py-1 px-2 rounded-md ${
        active ? "font-bold bg-gray-100" : ""
      } ${indent ? "ml-4" : ""}`}
    >
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      <span>{label}</span>
    </div>
  );
}
