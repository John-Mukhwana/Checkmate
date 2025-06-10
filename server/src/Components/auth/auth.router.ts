// import { Hono } from 'hono';
// import { getNonce, walletLogin, emailLogin, linkWalletToAccount, linkEmailToAccount } from './auth.controller';
// import { verifyJWT } from '../../middleware/jwt';

// const authRouter = new Hono();

// authRouter.get('/nonce', getNonce);
// authRouter.post('/wallet', walletLogin);
// authRouter.post('/email', emailLogin);
// authRouter.post('/link-wallet', verifyJWT, linkWalletToAccount);
// authRouter.post('/link-email', verifyJWT, linkEmailToAccount);

// export { authRouter };

import { Hono } from 'hono';
import { getNonce, walletLogin, googleLogin, linkWalletToAccount, linkEmailToAccount, mergeLogin } from './auth.controller';
import { userOrAdminRoleAuth } from '../../middleware/jwt';

const authRouter = new Hono();

authRouter.get('/nonce', getNonce);
authRouter.post('/wallet', walletLogin);
authRouter.post('/google', googleLogin);
authRouter.post('/merge', mergeLogin);
authRouter.post('/link-wallet', userOrAdminRoleAuth, linkWalletToAccount);
authRouter.post('/link-email', userOrAdminRoleAuth, linkEmailToAccount);

export  {authRouter};