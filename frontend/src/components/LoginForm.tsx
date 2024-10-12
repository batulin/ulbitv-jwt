import {useState} from "react";
import {useUserStore} from "../store/userStore.ts";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useUserStore(state => state.login);
    const register = useUserStore(state => state.register);

    const loginHandler = () => {
        login(email,password);
    }

    const registerHandler = () => {
        register(email,password);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={loginHandler}>Login</button>
            <button onClick={registerHandler}>Registration</button>
        </div>
    );
};

export default LoginForm;