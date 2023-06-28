import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { IUserLogin } from "../../commons/interface";
import { ButtonDisable } from "../../components/ButtonDisable";
import AuthService from "../../service/AuthService";

export function LoginPage() {

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [apiError, setApiError] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
    };

    const onClickLogin = () => {
        setPendingApiCall(true);

        const userLogin: IUserLogin = {
            username: form.username,
            password: form.password,
        };

        AuthService.login(userLogin)
            .then((response) => {
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", form.username);
                setPendingApiCall(false);
                window.location.reload();
                console.log(response);
            })
            .catch((errorResponse) => {
                setApiError(true);
                setPendingApiCall(false);
                console.log(errorResponse);
            });
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5">LOGIN</h2>

            {apiError &&
                <div className="alert alert-danger col-6 mb-3 mx-auto">
                    Falha ao efetuar login.
                </div>
            }

            <div className="mx-auto col-6 mb-4">
                <label>Insira seu usuário</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Informe seu usuário"
                    onChange={onChange}
                    value={form.username}
                    name="username"
                />
            </div>

            <div className="mx-auto col-6 mb-3">
                <label>Insira sua senha</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Informe sua senha"
                    onChange={onChange}
                    value={form.password}
                    name="password"
                />
            </div>

            <div className="text-center">
                <ButtonDisable
                    disabled={pendingApiCall}
                    className="btn btn-primary"
                    onClick={onClickLogin}
                    text="Entrar"
                />
            </div>

            <div className="text-center mt-2">
                Não possui uma conta? <Link to="/signup">Clique aqui.</Link>
            </div>
        </div>
    )

}