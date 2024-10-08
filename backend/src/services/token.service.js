import jwt from "jsonwebtoken";
import client from "../config/db.js";
export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'});

    return {
        accessToken,
        refreshToken
    }
}

export const saveToken = async (userId, refreshToken) => {
    const tokenData = await client.refreshToken.findFirst({
        where: {
            userId: userId
        }
    })
    if (tokenData) {
        return await client.refreshToken.update({
            where: {
                id: tokenData.id
            },
            data: {
                token: refreshToken
            }
        })
    }
    const token = await client.refreshToken.create({
        data: {
            userId: userId,
            token: refreshToken
        }
    })
    return token
}

export const removeToken = async (refreshToken) => {
    const refresh = await client.refreshToken.findFirst({
        where: {token: refreshToken}
    })
    return await client.refreshToken.delete({
        where: {
            id: refresh.id
        }
    })
}

export const validateAccessToken = (token) => {
    try{
        const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return tokenData;
    } catch (e) {
        return null
    }
}

export const validateRefreshToken = (token) => {
    try{
        const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return tokenData;
    } catch (e) {
        return null
    }
}

export const findRefreshToken = async (token) => {
        const tokenData = await client.refreshToken.findFirst({where: {token: token}})
        return tokenData;
}