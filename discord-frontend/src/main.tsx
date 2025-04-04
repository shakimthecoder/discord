import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, RedirectToSignUp } from '@clerk/clerk-react' // Ensure you have the correct import path
import { MantineProvider } from '@mantine/core'
import App from './App.tsx'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  <>
  <SignedIn>{children}</SignedIn>
  <SignedOut>
    <RedirectToSignIn />
      </SignedOut></>
}

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
     <MantineProvider>
      <App />
    </MantineProvider>
    </ClerkProvider>
  </StrictMode>,
)
