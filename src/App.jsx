import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import DashboardPage from './pages/DashboardPage'
import CreateExamPage from './pages/CreateExamPage'
import ExamsPage from './pages/ExamsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import LoginPage from './pages/LoginPage'
import MarketplacePage from './pages/MarketplacePage'
import PermissionsPage from './pages/PermissionsPage'
import QuestionBankFormPage from './pages/QuestionBankFormPage'
import QuestionBanksPage from './pages/QuestionBanksPage'
import RegisterPage from './pages/RegisterPage'
import RolePendingPage from './pages/RolePendingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="role/:role" element={<RolePendingPage />} />
      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="question-banks" element={<QuestionBanksPage />} />
        <Route path="question-banks/new" element={<QuestionBankFormPage mode="create" />} />
        <Route path="question-banks/:id/edit" element={<QuestionBankFormPage mode="edit" />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="exams/new" element={<CreateExamPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
