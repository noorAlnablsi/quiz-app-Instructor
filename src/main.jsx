import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ExamsProvider } from './context/ExamsContext.jsx'
import { QuestionBanksProvider } from './context/QuestionBanksContext.jsx'
import App from './App.jsx'

document.documentElement.lang = 'ar'
document.documentElement.dir = 'rtl'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QuestionBanksProvider>
        <ExamsProvider>
          <App />
        </ExamsProvider>
      </QuestionBanksProvider>
    </BrowserRouter>
  </StrictMode>,
)
