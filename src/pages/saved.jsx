import { useState, useEffect } from "react"

const API = "https://govtprep-backend.onrender.com"

const CAT = {
  "Economy": { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Polity": { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  "Science & Tech": { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  "Environment": { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  "International Relations": { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
  "General": { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
}

const EXAM = {
  "UPSC": { bg: "bg-purple-600", text: "text-white" },
  "SSC": { bg: "bg-green-600", text: "text-white" },
  "Banking": { bg: "bg-blue-600", text: "text-white" },
}

const FALLBACK = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"

function SavedCard({ article, onUnsave, onBriefing, briefing, loadingBriefing }) {
  const [imgError, setImgError] = useState(false)
  const cat = CAT[article.category] || CAT["General"]
  const exam = EXAM[article.exam] || { bg: "bg-gray-600", text: "text-white" }
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={imgError || !article.image_url ? FALLBACK : article.image_url}
          alt={article.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${exam.bg} ${exam.text}`}>
          {article.exam}
        </span>
      </div>
      <div className="p-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cat.bg} ${cat.text} mb-3`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`}></span>
          {article.category}
        </span>
        <p className="text-gray-900 font-semibold text-sm leading-snug mb-4 line-clamp-3">{article.title}</p>
        {briefing && (
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 mb-4">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1.5">✦ AI Briefing</p>
            <p className="text-xs text-gray-700 leading-relaxed">{briefing}</p>
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => onBriefing(article.id)} className="flex-1 text-xs font-semibold px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            {loadingBriefing === article.id ? "Loading..." : briefing ? "Hide" : "✦ AI Briefing"}
          </button>
          <button onClick={() => onUnsave(article.id)} className="px-3 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Saved() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [briefings, setBriefings] = useState({})
  const [loadingBriefing, setLoadingBriefing] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) { window.location.href = "/login"; return }
    fetchSaved()
  }, [])

  const fetchSaved = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/saved`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setArticles(data)
    } catch {}
    setLoading(false)
  }

  const handleUnsave = async (id) => {
    await fetch(`${API}/saved/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    setArticles(articles.filter((a) => a.id !== id))
  }

  const handleBriefing = async (id) => {
    if (briefings[id]) {
      setBriefings((prev) => { const u = { ...prev }; delete u[id]; return u })
      return
    }
    setLoadingBriefing(id)
    try {
      const res = await fetch(`${API}/news/${id}/briefing`)
      const data = await res.json()
      setBriefings((prev) => ({ ...prev, [id]: data.briefing }))
    } catch {}
    setLoadingBriefing(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <a href="/news" className="text-xl font-bold text-blue-600">GovtPrep</a>
            <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">AI</span>
          </div>
          <a href="/news" className="text-sm text-gray-500 hover:text-blue-600 font-medium">← Back to News</a>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Saved Articles</h2>
          <p className="text-gray-500">{articles.length > 0 ? `${articles.length} article${articles.length > 1 ? "s" : ""} saved` : "Your saved articles will appear here"}</p>
        </div>
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-400 text-sm">Loading...</p>
            </div>
          </div>
        )}
        {!loading && articles.length === 0 && (
          <div className="text-center mt-24">
            <p className="text-5xl mb-4">📑</p>
            <p className="text-gray-500 text-lg font-medium mb-2">Nothing saved yet</p>
            <p className="text-gray-400 text-sm mb-6">Go to news and save articles for later</p>
            <a href="/news" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Browse News</a>
          </div>
        )}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {articles.map((article) => (
              <SavedCard
                key={article.id}
                article={article}
                onUnsave={handleUnsave}
                onBriefing={handleBriefing}
                briefing={briefings[article.id]}
                loadingBriefing={loadingBriefing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}