import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import TopbarTabs from "@/components/TopbarTabs";
import ArticleTable from "@/components/ArticleTable";
import { articles } from "@/data/articles";
import AutoBlog from "@/components/AutoBlog";
import InternalLinks from "@/components/InternalLinks";
import FreeBacklinks from "@/components/FreeBacklinks";
import AffiliateProgram from "@/components/AffiliateProgram";
import HelpCenter from "@/components/HelpCenter";
import Updates from "@/components/Updates";
import LiveChatSupport from "@/components/LiveChatSupport";
import Profile from "@/components/Profile";

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("Generated Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const articleTabs = [
    "Generated Articles",
    "Published Articles",
    "Scheduled Articles",
    "Archived Articles",
  ];

  useEffect(() => {
    if (articleTabs.includes(selectedItem)) {
      const filtered = articles.filter(
        (a) =>
          a.category === selectedItem &&
          (a.title ?? "")
            .toLowerCase()
            .includes((searchQuery ?? "").toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles([]);
    }
  }, [selectedItem, searchQuery]);

  const renderMainContent = () => {
    if (articleTabs.includes(selectedItem)) {
      return filteredArticles.length > 0 ? (
        <ArticleTable tab={selectedItem} articles={filteredArticles} />
      ) : (
        <div className="text-gray-500 mt-6">No articles found.</div>
      );
    }

    switch (selectedItem) {
      case "Auto Blog":
        return <AutoBlog />;
      case "Internal Links":
        return <InternalLinks />;
      case "Free Backlinks":
        return <FreeBacklinks />;
      case "Affiliate Program":
        return <AffiliateProgram />;
      case "Help Center":
        return <HelpCenter />;
      case "Updates":
        return <Updates />;
      case "Live Chat Support":
        return <LiveChatSupport />;
      case "Profile":
        return <Profile />;
      default:
        return <div className="text-gray-500">Select a menu item</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <CustomSidebar
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out bg-gray-50 ${
          sidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <div className="p-4 md:p-6">
          <TopbarTabs
            selected={selectedItem}
            onChange={setSelectedItem}
            onSearch={setSearchQuery}
          />
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}
