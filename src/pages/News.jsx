import { useState, useEffect } from "react"

const API = "https://govtprep-backend.onrender.com"

const CATEGORY_COLORS = {
  "Economy": { bg: "bg-emerald-600", text: "text-white", dot: "bg-white" },
  "Polity": { bg: "bg-violet-600", text: "text-white", dot: "bg-white" },
  "Science & Tech": { bg: "bg-blue-600", text: "text-white", dot: "bg-white" },
  "Environment": { bg: "bg-green-600", text: "text-white", dot: "bg-white" },
  "International Relations": { bg: "bg-rose-600", text: "text-white", dot: "bg-white" },
  "General": { bg: "bg-amber-600", text: "text-white", dot: "bg-white" },
}

const EXAM_COLORS = {
  "UPSC": { bg: "bg-purple-600", text: "text-white" },
  "SSC": { bg: "bg-green-600", text: "text-white" },
  "Banking": { bg: "bg-blue-600", text: "text-white" },
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"

function NewsCard({ article, isSaved, onSave, onBriefing, briefing, loadingBriefing, darkMode }) {
  const [imgError, setImgError] = useState(false)
  const catColor = CATEGORY_COLORS[article.category] || CATEGORY_COLORS["General"]
  const examColor = EXAM_COLORS[article.exam] || { bg: "bg-gray-600", text: "text-white" }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, text: article.title })
    } else {
      navigator.clipboard.writeText(article.title)
      alert("Title copied to clipboard!")
    }
  }

  return (
    <div className={`rounded-2xl overflow-hidden shadow-sm border transition-shadow duration-200 hover:shadow-md ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={imgError || !article.image_url ? FALLBACK_IMAGE : article.image_url}
          alt={article.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        {article.exam && (
  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${examColor.bg} ${examColor.text}`}>
    {article.exam}
  </span>
)}
        {/* Share button on image */}
        <button
          onClick={handleShare}
          className="absolute top-3 left-3 bg-black/40 hover:bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm transition-all"
        >
          Share
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${catColor.bg} ${catColor.text} mb-3`}>
          <span className={`w-1.5 h-1.5 rounded-full ${catColor.dot}`}></span>
          {article.category}
        </span>

        <p className={`font-semibold text-sm leading-snug mb-4 line-clamp-3 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          {article.title}
        </p>

        {briefing && (
          <div className={`border rounded-xl p-3 mb-4 ${darkMode ? "bg-blue-900/20 border-blue-800" : "bg-linear-to-br from-blue-50 to-indigo-50 border-blue-100"}`}>
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1.5">✦ AI Briefing</p>
            <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{briefing}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onBriefing(article.id)}
            className="flex-1 text-xs font-semibold px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {loadingBriefing === article.id ? "Loading..." : briefing ? "Hide" : "✦ AI Briefing"}
          </button>
          <button
            onClick={() => onSave(article.id)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              isSaved
                ? "bg-green-50 border-green-300 text-green-700"
                : darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-400"
                : "bg-white border-gray-200 text-gray-600 hover:border-blue-300"
            }`}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function News() {
  const [newsList, setNewsList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [category, setCategory] = useState("")
  const [briefings, setBriefings] = useState({})
  const [loadingBriefing, setLoadingBriefing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) window.location.href = "/login"
  }, [])

  useEffect(() => { fetchNews() }, [category])
  useEffect(() => { fetchSaved() }, [])

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredList(newsList)
    } else {
      setFilteredList(newsList.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase())
      ))
    }
  }, [search, newsList])

  const fetchNews = async () => {
    setLoading(true)
    setError("")
    try {
      const url = category ? `${API}/news?category=${category}` : `${API}/news`
      const res = await fetch(url)
      const data = await res.json()
      console.log("News fetched:", data.length) // ye add karo
      setNewsList(data)
      setFilteredList(data)
    } catch {
      setError("Failed to load news. Try again.")
    }
    setLoading(false)
  }

  const fetchSaved = async () => {
    if (!token) return
    try {
      const res = await fetch(`${API}/saved`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setSavedIds(data.map((a) => a.id))
    } catch {}
  }

  const handleSave = async (newsId) => {
    const isSaved = savedIds.includes(newsId)
    if (isSaved) {
      await fetch(`${API}/saved/${newsId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
      setSavedIds(savedIds.filter((id) => id !== newsId))
    } else {
      await fetch(`${API}/saved/${newsId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
      setSavedIds([...savedIds, newsId])
    }
  }

  const handleBriefing = async (newsId) => {
    if (briefings[newsId]) {
      setBriefings((prev) => { const u = { ...prev }; delete u[newsId]; return u })
      return
    }
    setLoadingBriefing(newsId)
    try {
      const res = await fetch(`${API}/news/${newsId}/briefing`)
      const data = await res.json()
      setBriefings((prev) => ({ ...prev, [newsId]: data.briefing }))
    } catch {}
    setLoadingBriefing(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const categories = ["", "Economy", "Polity", "Science & Tech", "Environment", "International Relations", "General"]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Navbar */}
      <nav className={`border-b px-6 py-4 sticky top-0 z-10 transition-colors duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-blue-600"}`}>GovtPrep</span>
            <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">AI</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl text-sm border outline-none transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-blue-500"
              }`}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`text-sm px-3 py-2 rounded-xl border transition-colors ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-yellow-400"
                  : "bg-gray-100 border-gray-200 text-gray-600"
              }`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <a href="/saved" className={`text-sm font-medium ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-blue-600"}`}>
              Saved
            </a>
            <button
              onClick={handleLogout}
              className={`text-sm px-4 py-2 rounded-xl font-medium ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>Today's News</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>AI-powered briefings tailored for your exam prep</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : darkMode
                  ? "bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {cat === "" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* Search result count */}
        {search && (
          <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {filteredList.length} result{filteredList.length !== 1 ? "s" : ""} for "{search}"
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-400"}`}>Loading news...</p>
            </div>
          </div>
        )}
        {error && <p className="text-center text-red-500 mt-16">{error}</p>}
        {!loading && filteredList.length === 0 && (
          <div className="text-center mt-16">
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-400"}`}>No news found</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredList.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                isSaved={savedIds.includes(article.id)}
                onSave={handleSave}
                onBriefing={handleBriefing}
                briefing={briefings[article.id]}
                loadingBriefing={loadingBriefing}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}