import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Signup from "./pages/signup"
import News from "./pages/News"
import Saved from "./pages/saved"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/news" element={<News />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App