import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './components/Themeprovider'
import { TooltipProvider } from './components/ui/tooltip'
import { Toaster } from './components/ui/toaster'
import { Toaster as Sonner } from "./components/ui/sonner";

function App() {

  return (
   <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      Hey building something
    </TooltipProvider>
   </ThemeProvider>
  )
}

export default App
