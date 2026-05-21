import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import LightweightBackground from './components/LightweightBackground';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import Home from './pages/Home';
import AIChatbot from './pages/AIChatbot';
import AIAutomation from './pages/AIAutomation';
import Website from './pages/Website';
import WebsitePortfolio from './pages/WebsitePortfolio';
import SumikaViewer from './pages/SumikaViewer';
import HotzillaViewer from './pages/HotzillaViewer';
import BenjyCafeViewer from './pages/BenjyCafeViewer';
import Marketing from './pages/Marketing';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminBlog from './pages/AdminBlog';
import NotFound from './pages/NotFound';

// The CMS has its own chrome — hide the public Navbar/Footer/widget there.
const Shell = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            {!isAdmin && <LightweightBackground />}
            {!isAdmin && <Navbar />}
            <main id="main-content" style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ai-automation" element={<AIAutomation />} />
                    <Route path="/ai-chatbot" element={<AIChatbot />} />
                    <Route path="/website" element={<Website />} />
                    <Route path="/website-portfolio" element={<WebsitePortfolio />} />
                    <Route path="/sumika" element={<SumikaViewer />} />
                    <Route path="/hotzilla" element={<HotzillaViewer />} />
                    <Route path="/benjy-cafe" element={<BenjyCafeViewer />} />
                    <Route path="/marketing" element={<Marketing />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/admin" element={<AdminBlog />} />
                    <Route path="/admin/blog" element={<AdminBlog />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {!isAdmin && <Footer />}
            {!isAdmin && <ChatbotWidget />}
        </div>
    );
};

function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <AdminProvider>
                    <Router>
                        <Shell />
                    </Router>
                </AdminProvider>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
