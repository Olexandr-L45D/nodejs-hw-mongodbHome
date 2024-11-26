import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    loginUserSchema, registerUserSchema,
    requestResetEmailSchema, resetPasswordSchema, authOAuthGoogleSchema
} from '../validation/auth.js';
import {
    loginUserController, logoutUserController, registerUserController,
    refreshUserSessionController, requestResetEmailController,
    resetPasswordController,
    getGoogleOAuthUrlController,
    loginWithGoogleController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post('/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController)
);
authRouter.post('/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController)
);
// authRouter.get("/verify", ctrlWrapper(verifyController));
authRouter.post('/logout',
    ctrlWrapper(logoutUserController)
);
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post(
    '/send-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
);
authRouter.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);
authRouter.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post("/confirm-oauth", validateBody(authOAuthGoogleSchema), ctrlWrapper(loginWithGoogleController));
export default authRouter;
