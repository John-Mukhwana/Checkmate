import {Suspense,lazy} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { AuthProvider } from './components/AuthProvider'; 
import Journal from './Pages/Journal';
import Learning from './Pages/Learning';
import Dashboard from './Pages/Dashboard';

const Loading = lazy(() => import('./components/Loading'));
const Login = lazy(() => import('./Pages/Login'));
const AIChat = lazy(() => import('./Pages/AIChat'));
const Therapists = lazy(() => import('./Pages/Therapists'));
const Homepage = lazy(() => import('./Pages/Homepage'));
const Home = lazy(() => import('./Pages/Home'));


function App() {
  const router = createBrowserRouter([
    {
     path: '/',
     element: (
      <Suspense fallback={<Loading />}>
        <Homepage />
      </Suspense>
     ),
      errorElement: <div>Error loading page</div>,
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
      errorElement: <div>Error loading login page</div>,
    },

    {
      path:'/app',
      element: (
        <Suspense fallback={null}>
          <Home />
        </Suspense>
      ),
      errorElement: <div>Error loading app page</div>,

    children: [
         {
           
          index: true, //  This makes /app render AIChat by default
          element: (
            <Suspense fallback={<Loading />}>
              <AIChat />
            </Suspense>
          ),
        },
      {
        path: "chat",
        element: (
          <Suspense fallback={<Loading />}>
            <AIChat />
          </Suspense>
        ),
        errorElement: <div>Error loading chat page</div>,
      },
      {
        path: "therapists",
        element: (
          <Suspense fallback={<Loading />}>
            <Therapists />
          </Suspense>
        ),
        errorElement: <div>Error loading therapists page</div>,
      },
      {
        path: "journal",
        element: (
          <Suspense fallback={<Loading />}>
            <Journal />
          </Suspense>
        ),
        errorElement: <div>Error loading journal page</div>,
      },
      {
        path: "learning",
        element: (
          <Suspense fallback={<Loading />}>
            <Learning />
          </Suspense>
        ),
        errorElement: <div>Error loading learning page</div>,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
        errorElement: <div>Error loading dashboard page</div>,
      },
    ]
        
    },
    

  ]); 

  return(
    <>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;