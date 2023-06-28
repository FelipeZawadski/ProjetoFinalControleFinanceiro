import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserSignUp } from "../../commons/interface";
import { ButtonDisable } from "../../components/ButtonDisable";
import { Input } from "../../components/Input";
import AuthService from "../../service/AuthService";

export function SignUpPage() {

    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    });

    const [errorForm, setErrorForm] = useState({
        defaultMessage: ''
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [apiError, setApiError] = useState(false);

    const [nameError, setNameError] = useState(false);

    const [passError, setPassError] = useState(false);

    const [mailError, setMailError] = useState(false);

    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        });

        setErrorForm((previousErrors) => {
            return {
                ...previousErrors,
                [name]: '',
            }
        });
    }

    const isError = (username: string, password: string, email: string) => {

        if(username == '') {
            setNameError(true);
        }
        else if(password == '') {
            setNameError(false);
            setPassError(true);
        }
        else if(email == '') {
            setPassError(false);
            setMailError(true);
        }
        else {
            setMailError(false);
        }

    }

    function capitalizeFirstLetter(message: string) {
        return message.charAt(0).toUpperCase() + message.slice(1);
    }

    const onClickSignUp = () => {
        setPendingApiCall(true);

        const userSignUp: IUserSignUp = {
            username: form.username,
            password: form.password,
            email: form.email,
            phone: form.phone
        };

        AuthService.signup(userSignUp).then((response) => {
            setPendingApiCall(false);
            console.log(response);
            navigate('/login');
        }).catch((errorResponse) => {
            setPendingApiCall(false);
            console.log(errorResponse);
            setApiError(true);
            if (errorResponse.response.data) {
                setErrorForm(errorResponse.response.data.errors[0]);
                isError(form.username, form.password, form.email);
            }
        });
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5">CADASTRO</h2>

            {apiError &&
                <div className="alert alert-danger col-6 mb-3 mx-auto">
                    Erro ao efetuar o cadastro. ERRO: {capitalizeFirstLetter(errorForm.defaultMessage)}
                </div>
            }

            <div className="mx-auto col-6 mb-4">
                <label>Informe seu usuário</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Informe seu usuário"
                    onChange={onChange}
                    value={form.username}
                    hasError={nameError}
                    name="username"
                />
            </div>

            <div className="mx-auto col-6 mb-3">
                <label>Informe sua senha</label>
                <Input
                    type="password"
                    className="form-control"
                    placeholder="Informe a sua senha"
                    onChange={onChange}
                    value={form.password}
                    hasError={passError}
                    name="password"
                />
            </div>

            <div className="mx-auto col-6 mb-3">
                <label>Informe seu email</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Informe a sua senha"
                    onChange={onChange}
                    value={form.email}
                    hasError={mailError}
                    name="email"
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Informe seu telefone</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Informe seu usuário"
                    onChange={onChange}
                    value={form.phone}
                    name="phone"
                />
            </div>

            <div className="text-center">
                <ButtonDisable
                    disabled={pendingApiCall}
                    className="btn btn-primary"
                    onClick={onClickSignUp}
                    text="Cadastrar"
                />
            </div>

            <div className="text-center mt-2">
                Já possui conta? <Link to="/login"> Login </Link>
            </div>
        </div>
    )

}