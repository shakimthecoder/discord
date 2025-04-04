import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom' // Import useNavigate for routing
import './index.css'
import '@mantine/core/styles.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, RedirectToSignUp } from '@clerk/clerk-react' // Ensure you have the correct import path
import { MantineProvider } from '@mantine/core'
import RootLayout from './layout/RootLayout.tsx'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return(
  <>
   <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const RouterComponent = () => {
  const navigate = useNavigate();
  return (
      <Routes>
       <Route path="" element={<RootLayout />}>
        <Route 
        index
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
        />
        </Route>
      </Routes>
  );

}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
     <MantineProvider>
      <BrowserRouter>
      <RouterComponent />
      </BrowserRouter>
      <App />
    </MantineProvider>
    </ClerkProvider>
  </StrictMode>,
)

export default RouterComponent;