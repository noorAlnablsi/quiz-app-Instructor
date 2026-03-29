import { Navigate, Route, Routes } from 'react-router-dom'
import { StudentExperienceProvider } from './context/StudentExperienceContext'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import StudentLayout from './student/components/StudentLayout'
import StudentAnalyticsPage from './student/pages/StudentAnalyticsPage'
import StudentDashboardPage from './student/pages/StudentDashboardPage'
import StudentExamPage from './student/pages/StudentExamPage'
import StudentHistoryPage from './student/pages/StudentHistoryPage'
import StudentJoinExamPage from './student/pages/StudentJoinExamPage'
import StudentQuestionBanksPage from './student/pages/StudentQuestionBanksPage'
import StudentResultPage from './student/pages/StudentResultPage'
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
import OrgLayout from './organization/components/OrgLayout'
import OrgAccessPage from './organization/pages/OrgAccessPage'
import OrgDashboardPage from './organization/pages/OrgDashboardPage'
import OrgExamsPage from './organization/pages/OrgExamsPage'
import OrgNotificationsPage from './organization/pages/OrgNotificationsPage'
import OrgReportsPage from './organization/pages/OrgReportsPage'
import OrgStudentDetailPage from './organization/pages/OrgStudentDetailPage'
import OrgStudentsPage from './organization/pages/OrgStudentsPage'
import AdminLayout from './admin/layout/AdminLayout'
import AdminDashboardPage from './admin/pages/AdminDashboardPage'
import AdminMarketplacePage from './admin/pages/AdminMarketplacePage'
import AdminMonitoringPage from './admin/pages/AdminMonitoringPage'
import AdminStatisticsPage from './admin/pages/AdminStatisticsPage'
import AdminUsersPage from './admin/pages/AdminUsersPage'

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
      <Route
        path="student"
        element={
          <StudentExperienceProvider>
            <StudentLayout />
          </StudentExperienceProvider>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="join" element={<StudentJoinExamPage />} />
        <Route path="exam/:sessionId" element={<StudentExamPage />} />
        <Route path="result/:sessionId" element={<StudentResultPage />} />
        <Route path="history" element={<StudentHistoryPage />} />
        <Route path="analytics" element={<StudentAnalyticsPage />} />
        <Route path="banks" element={<StudentQuestionBanksPage />} />
      </Route>
      <Route path="org" element={<OrgLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<OrgDashboardPage />} />
        <Route path="students" element={<OrgStudentsPage />} />
        <Route path="students/:id" element={<OrgStudentDetailPage />} />
        <Route path="exams" element={<OrgExamsPage />} />
        <Route path="reports" element={<OrgReportsPage />} />
        <Route path="access" element={<OrgAccessPage />} />
        <Route path="notifications" element={<OrgNotificationsPage />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="monitoring" element={<AdminMonitoringPage />} />
        <Route path="marketplace" element={<AdminMarketplacePage />} />
        <Route path="statistics" element={<AdminStatisticsPage />} />
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
