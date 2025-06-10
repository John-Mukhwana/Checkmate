

// // wallect conect works for this code

// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Alert, AlertDescription } from '../components/ui/alert';
// import { Brain, AlertCircle, Loader2 } from 'lucide-react';
// import { signInWithGoogle, signInWithWallet } from '../lib/auth';
// import { useAuthContext } from '../components/AuthProvider';
// import { motion } from 'framer-motion';
// import { EthereumProvider } from '@walletconnect/ethereum-provider';
// import { WalletConnectModal } from '@walletconnect/modal';

// // Extend Window interface
// declare global {
//   interface Window {
//     ethereum?: any;
//     google?: {
//       accounts: {
//         id: {
//           initialize: (config: {
//             client_id: string;
//             callback: (response: { credential: string; error?: any }) => void;
//             auto_select?: boolean;
//             cancel_on_tap_outside?: boolean;
//           }) => void;
//           renderButton: (element: HTMLElement, options: {
//             theme: string;
//             size: string;
//             type: string;
//             shape: string;
//             text: string;
//           }) => void;
//         };
//       };
//     };
//   }
// }

// interface AuthUser {
//   userId: string;
//   name: string;
//   email?: string;
//   wallet?: string;
//   role: 'user' | 'therapist' | 'admin';
//   authType: 'google' | 'wallet' | 'both';
//   preferences: Record<string, unknown>;
//   journalCount: number;
//   createdAt: Date;
// }

// export default function Login() {
//   const navigate = useNavigate();
//   const { updateUser } = useAuthContext();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [googleLoading, setGoogleLoading] = useState(true);
//   const googleButtonRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let retries = 5;
//     const retryDelay = 2000;

//     const initializeGoogleSignIn = async () => {
//       if (!window.google) {
//         if (retries) {
//           retries--;
//           setTimeout(initializeGoogleSignIn, retryDelay);
//           return;
//         }
//         setGoogleLoading(false);
//         setError('Google Sign-In unavailable. Check your connection or browser settings.');
//         return;
//       }

//       try {
//         const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//         if (!clientId) {
//           setGoogleLoading(false);
//           setError('Google Sign-In misconfigured.');
//           return;
//         }

//         window.google.accounts.id.initialize({
//           client_id: clientId,
//           callback: handleGoogleCallback,
//           auto_select: false,
//           cancel_on_tap_outside: true,
//         });

//         if (googleButtonRef.current) {
//           window.google.accounts.id.renderButton(googleButtonRef.current, {
//             theme: 'filled_blue',
//             size: 'large',
//             type: 'standard',
//             shape: 'rectangular',
//             text: 'signin_with',
//           });
//           setGoogleLoading(false);
//         } else {
//           setGoogleLoading(false);
//           setError('Google Sign-In button failed to load. Please refresh.');
//         }
//       } catch {
//         setGoogleLoading(false);
//         setError('Failed to initialize Google Sign-In.');
//       }
//     };

//     setTimeout(initializeGoogleSignIn, 500);
//     return () => {
//       retries = 0;
//     };
//   }, []);

//   const handleGoogleCallback = async (response: { credential: string; error?: any }) => {
//     if (response.error) {
//       setError('Google Sign-In failed. Try again.');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');
//       const user: AuthUser = await signInWithGoogle(response.credential);
//       updateUser(user);
//       navigate('/app');
//     } catch {
//       setError('Failed to sign in with Google.');
//       setLoading(false);
//     }
//   };

//   const handleWalletLogin = async (useWalletConnect: boolean = false) => {
//     try {
//       setLoading(true);
//       setError('');
//       let user: AuthUser;

//       if (useWalletConnect) {
//         const wcProvider = await EthereumProvider.init({
//           projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
//           chains: [1], // Ethereum mainnet
//           optionalChains: [137, 42161], // Polygon, Arbitrum
//           showQrModal: true,
//           metadata: {
//             name: 'Checkmate',
//             description: 'TelePsyche Web3 App',
//             url: 'http://localhost:5173',
//             icons: ['https://avatars.githubusercontent.com/u/37784886'],
//           },
//           mobileLinks: ['metamask', 'trust', 'rainbow'],
//           relayUrl: 'wss://relay.walletconnect.com',
//         });

//         const modal = new WalletConnectModal({
//           projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
//           themeMode: 'light',
//         });

//         // Handle connection errors
//         wcProvider.on('error', (err: Error) => {
//           setError(`WalletConnect error: ${err.message}`);
//           setLoading(false);
//         });

//         // Trigger modal and connect
//         await new Promise((resolve, reject) => {
//           wcProvider.on('display_uri', (uri: string) => {
//             modal.openModal({ uri });
//             resolve(uri);
//           });
//           wcProvider.connect().catch(reject);
//         });

//         const provider = new ethers.BrowserProvider(wcProvider);
//         user = await signInWithWallet(provider);
//         modal.closeModal();
//         wcProvider.disconnect();
//       } else {
//         user = await signInWithWallet();
//       }

//       updateUser(user);
//       navigate('/app');
//     } catch (err: Error) {
//       setError(err.message || 'Failed to connect wallet. Ensure a wallet is installed or try WalletConnect.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//         className="w-full max-w-md"
//       >
//         <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
//           <CardHeader className="text-center py-8">
//             <motion.div
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="flex justify-center mb-4"
//             >
//               <Brain className="text-5xl text-[hsl(207,51%,65%)]" />
//             </motion.div>
//             <CardTitle className="text-3xl font-bold text-[hsl(210,11%,15%)]">
//               Welcome to Checkmate
//             </CardTitle>
//             <p className="text-[hsl(215,13.8%,44.1%)] mt-2 text-lg">
//               Sign in to continue
//             </p>
//           </CardHeader>
//           <CardContent className="space-y-6 px-8 pb-8">
//             <div className="relative w-full">
//               <div ref={googleButtonRef} className="w-full flex justify-center max-w-[300px] mx-auto" />
//               {googleLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
//                   <Loader2 className="h-8 w-8 animate-spin text-[hsl(207,51%,65%)]" />
//                 </div>
//               )}
//               {!googleLoading && !window.google && (
//                 <Button
//                   onClick={() => window.location.reload()}
//                   disabled={loading}
//                   className="w-full max-w-[300px] mx-auto bg-white border-2 border-[hsl(207,51%,65%)] text-[hsl(207,51%,65%)] hover:bg-gray-100 rounded-full transition-colors"
//                   size="lg"
//                 >
//                   Retry Google Sign-In
//                 </Button>
//               )}
//             </div>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-[hsl(215,13.8%,44.1%)] font-medium">
//                   or
//                 </span>
//               </div>
//             </div>

//             <Button
//               onClick={() => handleWalletLogin(false)}
//               disabled={loading}
//               className="w-full max-w-[300px] mx-auto bg-[hsl(45,100%,70%)] text-[hsl(215,25%,35%)] hover:bg-[hsl(45,100%,60%)] rounded-full transition-colors flex items-center justify-center shadow-md"
//               size="lg"
//             >
//               <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M2.04 12c0-5.50 4.48-10 10-10s10 4.50 10 10-4.48 10-10 10c-1.85 0-3.58-.51-5.07-1.38L2.04 12zM12 3.5c-4.69 0-8.5 3.81-8.5 8.5s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5S16.69 3.5 12 3.5zM9 16l1.5-1.5L12 16l1.5-1.5L15 16V8l-1.5 1.5L12 8l-1.5 1.5L9 8v8z" />
//               </svg>
//               Connect Wallet
//             </Button>

//             <Button
//               onClick={() => handleWalletLogin(true)}
//               disabled={loading}
//               className="w-full max-w-[300px] mx-auto bg-[hsl(200,80%,60%)] text-white hover:bg-[hsl(200,80%,50%)] rounded-full transition-colors flex items-center justify-center shadow-md"
//               size="lg"
//             >
//               <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
//               </svg>
//               Connect via WalletConnect
//             </Button>

//             <div className="text-center">
//               <Button
//                 variant="link"
//                 onClick={handleBackToHome}
//                 className="text-[hsl(215,13.8%,44.1%)] hover:text-[hsl(207,51%,65%)] text-base underline"
//               >
//                 Back to Homepage
//               </Button>
//             </div>

//             {error && (
//               <Alert className="border-[hsl(0,84%,60%)] bg-red-50">
//                 <AlertCircle className="h-5 w-5 text-[hsl(0,84%,60%)]" />
//                 <AlertDescription className="text-[hsl(0,84%,60%)] text-sm">
//                   {error}
//                 </AlertDescription>
//               </Alert>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }































import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Brain, AlertCircle, Loader2 } from 'lucide-react';
import { signInWithGoogle, signInWithWallet } from '../lib/auth';
import { useAuthContext } from '../components/AuthProvider';
import { motion } from 'framer-motion';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { WalletConnectModal } from '@walletconnect/modal';
import { ethers } from 'ethers';

// Extend Window interface
declare global {
  interface Window {
    ethereum?: any;
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string; error?: any }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (element: HTMLElement, options: {
            theme: string;
            size: string;
            type: string;
            shape: string;
            text: string;
          }) => void;
        };
      };
    };
  }
}

interface AuthUser {
  userId: string;
  name: string;
  email?: string;
  wallet?: string;
  role: 'user' | 'therapist' | 'admin';
  authType: 'google' | 'wallet' | 'both';
  preferences: Record<string, unknown>;
  journalCount: number;
  createdAt: Date;
}

export default function Login() {
  const navigate = useNavigate();
  const { updateUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const wcProviderRef = useRef<any>(null);

  useEffect(() => {
    let retries = 5;
    const retryDelay = 2000;

    const initializeGoogleSignIn = async () => {
      console.debug('[Login] Initializing Google Sign-In');
      if (!window.google) {
        if (retries) {
          retries--;
          setTimeout(initializeGoogleSignIn, retryDelay);
          return;
        }
        setGoogleLoading(false);
        setError('Google Sign-In unavailable. Check your connection or browser settings.');
        console.error('[Login] Google Sign-In script not loaded');
        return;
      }

      try {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
          setGoogleLoading(false);
          setError('Google Sign-In misconfigured.');
          console.error('[Login] VITE_GOOGLE_CLIENT_ID not set');
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: 'filled_blue',
            size: 'large',
            type: 'standard',
            shape: 'rectangular',
            text: 'signin_with',
          });
          setGoogleLoading(false);
          console.debug('[Login] Google Sign-In button rendered');
        } else {
          setGoogleLoading(false);
          setError('Google Sign-In button failed to load. Please refresh.');
          console.error('[Login] Google button ref not found');
        }
      } catch (err) {
        setGoogleLoading(false);
        setError('Failed to initialize Google Sign-In.');
        console.error('[Login] Google Sign-In init error:', err);
      }
    };

    const checkWalletConnectSession = async () => {
      console.debug('[Login] Checking for WalletConnect session');
      try {
        const wcProvider = await EthereumProvider.init({
          projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
          chains: [1],
          optionalChains: [137, 42161],
          showQrModal: false,
          metadata: {
            name: 'Checkmate',
            description: 'TelePsyche Web3 App',
            url: window.location.origin,
            icons: ['https://avatars.githubusercontent.com/u/37784886'],
          },
        });

        wcProviderRef.current = wcProvider;

        if (wcProvider.session) {
          console.debug('[Login] Found WalletConnect session:', wcProvider.session);
          try {
            const accounts = await wcProvider.request({ method: 'eth_requestAccounts' });
            console.debug('[Login] Session accounts:', accounts);
            if (Array.isArray(accounts) && accounts.length) {
              setShowContinue(true);
            }
          } catch (err) {
            console.error('[Login] Session account retrieval failed:', err);
            setError('Wallet connected but no accounts found. Click Continue Login or reconnect.');
            setShowContinue(true);
          }
        }
      } catch (err) {
        console.error('[Login] Session check error:', err);
        setError('Failed to check wallet connection: ' + err.message);
      }
    };

    setTimeout(initializeGoogleSignIn, 500);
    checkWalletConnectSession();
    return () => {
      retries = 0;
      if (wcProviderRef.current) {
        wcProviderRef.current.disconnect().catch((err: Error) => {
          console.error('[Login] Cleanup disconnect error:', err);
        });
      }
    };
  }, []);

  const handleGoogleCallback = async (response: { credential: string; error?: any }) => {
    console.debug('[handleGoogleCallback] Received response');
    if (response.error) {
      setError('Google Sign-In failed. Try again.');
      setLoading(false);
      console.error('[handleGoogleCallback] Error:', response.error);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const user: AuthUser = await signInWithGoogle(response.credential);
      console.debug('[handleGoogleCallback] User signed in:', user.userId);
      updateUser(user);
      navigate('/app');
    } catch (err: any) {
      setError('Failed to sign in with Google: ' + err.message);
      console.error('[handleGoogleCallback] Sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletLogin = async (useWalletConnect: boolean = false, isContinue: boolean = false) => {
    console.debug('[handleWalletLogin] Starting, useWalletConnect:', useWalletConnect, 'isContinue:', isContinue);
    try {
      setLoading(true);
      setError('');
      let user: AuthUser;

      if (useWalletConnect) {
        let wcProvider = wcProviderRef.current;
        if (!wcProvider || !isContinue) {
          console.debug('[handleWalletLogin] Initializing new WalletConnect');
          wcProvider = await EthereumProvider.init({
            projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
            chains: [1],
            optionalChains: [137, 42161],
            showQrModal: true,
            metadata: {
              name: 'Checkmate',
              description: 'TelePsyche Web3 App',
              url: window.location.origin,
              icons: ['https://avatars.githubusercontent.com/u/37784886'],
            },
          });
          wcProviderRef.current = wcProvider;
        }

        const modal = new WalletConnectModal({
          projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
          themeMode: 'light',
        });

        if (!isContinue) {
          await new Promise((resolve, reject) => {
            wcProvider.on('display_uri', (uri: string) => {
              console.debug('[handleWalletLogin] WalletConnect URI:', uri);
              modal.openModal({ uri });
              setShowContinue(true);
              resolve(uri);
            });
            wcProvider.connect().catch(reject);
          });
        }

        try {
          const accounts = await wcProvider.request({ method: 'eth_requestAccounts' });
          console.debug('[handleWalletLogin] Accounts:', accounts);
          if (!accounts || !accounts.length) {
            throw new Error('No accounts returned by WalletConnect.');
          }
          const provider = new ethers.BrowserProvider(wcProvider);
          user = await signInWithWallet(provider);
          console.debug('[handleWalletLogin] User signed in:', user.userId);
          updateUser(user);
          navigate('/app');
          modal.closeModal();
          setShowContinue(false);
        } catch (err: any) {
          setError('Failed to connect wallet: ' + err.message);
          console.error('[handleWalletLogin] Account retrieval error:', err);
          setShowContinue(true);
        }
      } else {
        user = await signInWithWallet();
        console.debug('[handleWalletLogin] User signed in (non-WalletConnect):', user.userId);
        updateUser(user);
        navigate('/app');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet. Please ensure MetaMask is connected or try again.');
      console.error('[handleWalletLogin] Error:', err.message, err.stack);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    console.debug('[handleBackToHome] Navigating to /');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center py-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <Brain className="text-5xl text-[hsl(207,51%,65%)]" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-[hsl(210,11%,15%)]">
              Welcome to Checkmate
            </CardTitle>
            <p className="text-[hsl(215,13.8%,44.1%)] mt-2 text-lg">
              Sign in to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <div className="relative w-full">
              <div ref={googleButtonRef} className="w-full flex justify-center max-w-[300px] mx-auto" />
              {googleLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                  <Loader2 className="h-8 w-8 animate-spin text-[hsl(207,51%,65%)]" />
                </div>
              )}
              {!googleLoading && !window.google && (
                <Button
                  onClick={() => window.location.reload()}
                  disabled={loading}
                  className="w-full max-w-[300px] mx-auto bg-white border-2 border-[hsl(207,51%,65%)] text-[hsl(207,51%,65%)] hover:bg-gray-100 rounded-full transition-colors"
                  size="lg"
                >
                  Retry Google Sign-In
                </Button>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[hsl(215,13.8%,44.1%)] font-medium">
                  or
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleWalletLogin(false)}
              disabled={loading || showContinue}
              className="w-full max-w-[300px] mx-auto bg-[hsl(45,100%,70%)] text-[hsl(215,25%,35%)] hover:bg-[hsl(45,100%,60%)] rounded-full transition-colors flex items-center justify-center shadow-md"
              size="lg"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.04 12c0-5.50 4.48-10 10-10s10 4.50 10 10-4.48 10-10 10c-1.85 0-3.58-.51-5.07-1.38L2.04 12zM12 3.5c-4.69 0-8.5 3.81-8.5 8.5s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5S16.69 3.5 12 3.5zM9 16l1.5-1.5L12 16l1.5-1.5L15 16V8l-1.5 1.5L12 8l-1.5 1.5L9 8v8z" />
              </svg>
              Connect Wallet
            </Button>

            <Button
              onClick={() => handleWalletLogin(true)}
              disabled={loading || showContinue}
              className="w-full max-w-[300px] mx-auto bg-[hsl(200,80%,60%)] text-white hover:bg-[hsl(200,80%,50%)] rounded-full transition-colors flex items-center justify-center shadow-md"
              size="lg"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              Connect via WalletConnect
            </Button>

            {showContinue && (
              <Button
                onClick={() => handleWalletLogin(true, true)}
                disabled={loading}
                className="w-full max-w-[300px] mx-auto bg-[hsl(207,51%,65%)] text-white hover:bg-[hsl(207,51%,55%)] rounded-full transition-colors flex items-center justify-center shadow-md"
                size="lg"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
                Continue Login
              </Button>
            )}

            <div className="text-center">
              <Button
                variant="link"
                onClick={handleBackToHome}
                className="text-[hsl(215,13.8%,44.1%)] hover:text-[hsl(207,51%,65%)] text-base underline"
              >
                Back to Dashboard
              </Button>
            </div>

            {error && (
              <Alert className="border-[hsl(0,84%,60%)] bg-red-50">
                <AlertCircle className="h-5 w-5 text-[hsl(0,84%,60%)]" />
                <AlertDescription className="text-[hsl(0,84%,60%)] text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}





