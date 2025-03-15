// After (React Router v6)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import RegistrationForm from './components/RegistrationForm'
import Newest from './components/Newest'
import Col from './components/Collections';

import Popular from './components/Popular'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Nav/>} />

                <Route path="/newest" element={<Newest/>} />
                <Route path="/popular" element={<Popular/>} />
                <Route path="/col" element={<Col/>} />
                <Route path="/RegistrationForm" element={<RegistrationForm />} />
            </Routes>
        </Router>
    );
}
export default App