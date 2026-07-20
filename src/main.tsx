import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/modules/sonner'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found')
}
const queryClient = new QueryClient()

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
