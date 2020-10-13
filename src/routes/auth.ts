import { Router as route } from 'express';
import { AuthService } from '../services/AuthService';
import { nest } from '../utils';
const router = route();
import logger from '../shared/logger';


// path /auth/login
router.post('/login', async (req, res) => {
    const authService = new AuthService();
    const { email, password }= req.body;
    if(!email || !password){
        return res.json({
            data: null,
            error: 'invalid payload',
        });
    }

    let err : Error;
    let token : string;
    [err, token] = await nest(authService.logInAndGenerateToken({
        email,
        password,
    }));
    if(err){
        logger.error('Error while logging in the user', {Error : err});
        return res.json({ error: err.message, data: null });
    }
    return res.json({
        data: {
            jwtToken: token,
        },
        error: null,
    });
});

router.post('/signup', async (req, res) => {
    const authService = new AuthService();
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
        return res.json({
            data: null,
            error: 'Invalid payload',
        });
    }
    let err: Error;
    let token : string;
    [err, token] = await nest(
        authService.signUpAndGenerateToken({
            username,
            name,
            email,
            password,
        })
    );
    if (err) {
        logger.error('Error while signing up the user', {Error : err});
        return res.json({ error: err.message, data: null });
    }
    return res.json({
        data: {
            jwtToken: token,
        },
        error: null,
    });
});



export default router;