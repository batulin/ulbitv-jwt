import client from "../config/db.js";
import bcrypt from "bcrypt";
import ApiError from "../exceptions/api-error.js";
import {findRefreshToken, generateTokens, removeToken, saveToken, validateRefreshToken} from "./token.service.js";

export const registerService = async (email, password) => {
    const candidate = await client.user.findUnique({
        where: {
            email: email
        }
    });
    if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }
    const passwordHash = await bcrypt.hash(password, 5);

    const user = await client.user.create({
        data: {email, password: passwordHash}
    });

    return user;
}

export const loginService = async (email, password) => {
    const user = await client.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не существует`)
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw ApiError.BadRequest(`Неверный пароль`)
    }
    const tokens = generateTokens({id: user.id, email: user.email});
    await saveToken(user.id, tokens.refreshToken);

    return {...tokens, user: {email: user.email, id: user.id}};
}

export const logoutService = async (refreshToken) => {
    return await removeToken(refreshToken);
}

export const refreshService = async (refreshToken) => {
    console.log(refreshToken)
    if (!refreshToken) {throw ApiError.UnauthorizedError()}
    const userData = validateRefreshToken(refreshToken);
    console.log(userData)
    const tokenFromDb = await findRefreshToken(refreshToken);
    console.log(tokenFromDb)
    if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }
    const user = await client.user.findUnique({
        where: {
            id: userData.id
        }
    })
    const tokens = generateTokens({id: user.id, email: user.email});
    await saveToken(user.id, tokens.refreshToken);

    return {...tokens, user: {email: user.email, id: user.id}};
}

export const getUsersService = async () => {
    const users = await client.user.findMany();
    return users;
}