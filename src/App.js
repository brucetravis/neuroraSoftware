import { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { aiPlans, swPlans } from './data/Pricing';
import { usePricing } from './contexts/PricingProvider';
import LoadingPage from './components/loadingpage/LoadingPage';
import CustomQuoteModal from './components/modals/custom/CustomQuoteModal';
import StandardPricingModal from './components/modals/standard/StandardPricingModal';
import ChatWidget from './components/chatwidget/ChatWidget';

function App() {

  const { openStandardModal, openQuotationModal } = usePricing();

  // states to handle the loading page
  const [ showLoading, setShowLoading ] = useState(true)

  // useEffect to handle the animations
  useEffect(() => {
    // simulate the loading duration, later we can tie this to animation finish
    const timer = setTimeout(() => setShowLoading(false), 30000)

    // clear the timer
    return () => clearTimeout(timer)

  }, []) // empty dependency array
  

  // if loading is true, show the loading page first
  //if (showLoading) return <LoadingPage onFinish={() => setShowLoading(false)} />

  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

        <ChatWidget />
        
        {/* Overlay loading page */}
        {showLoading && <LoadingPage onFinish={() => setShowLoading(false)} />}
      </div>

      {openStandardModal && <StandardPricingModal aiPlans={aiPlans} swPlans={swPlans} />}
      {openQuotationModal && <CustomQuoteModal />}

      <ToastContainer 
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme=''
      />
    </>
  );
}

export default App;
