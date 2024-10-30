import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Message from './Components/NotLoggedIn/Message'; 
import AppContent from './AppContent';

function App() {
   const [message, setMessage] = useState('');
   return (
      <Router>
         {message && <Message message={message} />} 
         <AppContent setMessage={setMessage} />
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </Router>
   );
}

export default App;
