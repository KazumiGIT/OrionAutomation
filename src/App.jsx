import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LightweightBackground from './components/LightweightBackground';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import Home from './pages/Home';
import AIChatbot from './pages/AIChatbot';
import Website from './pages/Website';
import WebsitePortfolio from './pages/WebsitePortfolio';
import SumikaViewer from './pages/SumikaViewer';
import HotzillaViewer from './pages/HotzillaViewer';
import BenjyCafeViewer from './pages/BenjyCafeViewer';
import Marketing from './pages/Marketing';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <Router>
                    <div style={{
                        position: 'relative',
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <LightweightBackground />
                        <Navbar />
                        <main style={{ flex: 1 }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/ai-chatbot" element={<AIChatbot />} />
                                <Route path="/website" element={<Website />} />
                                <Route path="/website-portfolio" element={<WebsitePortfolio />} />
                                <Route path="/sumika" element={<SumikaViewer />} />
                                <Route path="/hotzilla" element={<HotzillaViewer />} />
                                <Route path="/benjy-cafe" element={<BenjyCafeViewer />} />
                                <Route path="/marketing" element={<Marketing />} />
                                <Route path="/auth" element={<Auth />} />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </main>
                        <Footer />
                        <ChatbotWidget />
                    </div>
                </Router>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
