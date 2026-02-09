import './App.css';
import Home from './pages/home/Home';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { aiPlans, swPlans } from './data/Pricing';
import { usePricing } from './contexts/PricingProvider';
import ChatWidget from './components/chatwidget/ChatWidget';
import CustomQuoteModal from './components/modals/custom/CustomQuoteModal';
import StandardPricingModal from './components/modals/standard/StandardPricingModal';

function App() {

  const { openStandardModal, openQuotationModal } = usePricing();

  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        
        
        <ChatWidget />
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
