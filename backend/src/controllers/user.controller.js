import {
    getUsersService,
    loginService,
    logoutService,
    refreshService,
    registerService
} from "../services/user.service.js";

export const registration = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await registerService(email, password);

        res.status(200).json(user)
    }catch (e) {
        next(e);
    }
}

export const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const userData = await loginService(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
        return res.status(200).json({accessToken:userData.accessToken, user: userData.user});
    }catch (e) {
        next(e);
    }
}

export const logout = async (req, res, next) => {
    try{
        const {refreshToken} = req.cookies;
        if (!refreshToken) {return res.status(200)}
        const result = logoutService(refreshToken);
        res.clearCookie('refreshToken');
        return res.status(200).json({message: "success"});
    }catch (e) {
        next(e);
    }
}

export const refresh = async (req, res, next) => {
    try{
        const {refreshToken} = req.cookies;
        const userData = await refreshService(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
        return res.status(200).json({accessToken:userData.accessToken, user: userData.user});
    }catch (e) {
        next(e);
    }
}

export const getUsers = async (req, res, next) => {
    try{
        const users = await getUsersService();
        return res.status(200).json(users);

    }catch (e) {
        next(e);
    }
}
