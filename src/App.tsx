import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { UserHeader } from "./components/user-header";
import JournalsPage from "./pages/JournalsPage";
import CanvasPage from "./pages/CanvasPage";
import CoursesPage from "./pages/CoursesPage";
import TasksPage from "./pages/TasksPage";
import ProfilePage from "./pages/ProfilePage";
import ChatwithPdf from "./pages/ChatwithPdf";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./components/authui/SingIn";
import SignUp from "./components/authui/SignUp";
import BlogPage from "./pages/BlogPage";
import UploadPDFsPage from "./pages/UploadPDFsPage";


const queryClient = new QueryClient();

// 🔒 Route Guard Component
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* 🔐 Show header only when authenticated */}
            {isAuthenticated && <UserHeader />}

            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/upload-pdfs" element={<UploadPDFsPage />} />
              <Route path="/chat" element={<ChatwithPdf />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                }
              />
              <Route
                path="/journals"
                element={
                  <PrivateRoute>
                    <JournalsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/canvas"
                element={
                  <PrivateRoute>
                    <CanvasPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chatwithpdf/*"
                element={
                  <PrivateRoute>
                    <ChatwithPdf />
                  </PrivateRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;



// import React, { useEffect, useState } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider } from "./components/theme-provider";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import { UserHeader } from "./components/user-header";
// import JournalsPage from "./pages/JournalsPage";
// import CanvasPage from "./pages/CanvasPage";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import SignIn from "../src/components/authui/SingIn";
// import SignUp from "../src/components/authui/SignUp";

// const queryClient = new QueryClient();

// const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsAuthenticated(!!user); // Set true if user exists, else false
//     });

//     return () => unsubscribe(); // Clean up listener on unmount
//   }, []);

//   if (isAuthenticated === null) {
//     // Optional: Show a loading indicator while checking auth state
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? children : <Navigate to="/signin" />;
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider defaultTheme="light">
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <UserHeader />
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/journals" element={<JournalsPage />} />
//             <Route path="/canvas" element={<CanvasPage />} />
//             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;
