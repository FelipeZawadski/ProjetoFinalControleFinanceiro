import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRegisterForm } from "../../commons/interface";
import { ButtonDisable } from "../../components/ButtonDisable";
import { Input } from "../../components/Input";
import RegisterService from "../../service/RegisterService";

export function RegisterFormPage() {

    const [form, setForm] = useState({
        id: undefined,
        agency: '',
        bank: '',
        account: '',
        bank_balance: 0,
        accountType: '',
    });

    const [errorForm, setErrorForm] = useState({
        defaultMessage: ''
    });

    const { id } = useParams();

    const [agencyError, setAgencyError] = useState(false);

    const [bankError, setBankError] = useState(false);

    const [accountError, setAccountError] = useState(false);

    const [bank_balanceError, setBank_BalanceError] = useState(false);

    const [accountTypeError, setAccountTypeError] = useState(false);

    const [typeError, setTypeError] = useState(false);

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [apiError, setApiError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            RegisterService.findOneById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            agency: response.data.agency,
                            bank: response.data.bank,
                            account: response.data.account,
                            bank_balance: response.data.bank_balance,
                            accountType: response.data.accountType,
                        });
                    }
                })
                .catch((responseError) => {
                    setApiError(true);
                });
        }
    }, []);

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
    };

    function capitalizeFirstLetter(message: string) {
        return message.charAt(0).toUpperCase() + message.slice(1);
    }

    const isError = (agency: string, bank: string, account: string, bank_balance: string, accountType: string) => {

        if (agency == '') {
            setAgencyError(true);
        }
        else if (bank == '') {
            setAgencyError(false);
            setBankError(true);
        }
        else if (account == '') {
            setBankError(false);
            setAccountError(true);
        }
        else if (bank_balance == ''){
            setAccountError(false);
            setBank_BalanceError(true);
        }
        else if (accountType == '') {
            setAccountError(false);
            setAccountTypeError(true);
        }
        else {
            setAccountTypeError(false);
        }

    }

    const onClickInsert = () => {
        setPendingApiCall(true);

        const registerForm: IRegisterForm = {
            id: form.id,
            agency: form.agency,
            bank: form.bank,
            account: form.account,
            bank_balance: form.bank_balance!,
            accountType: form.accountType,
        };

        RegisterService.insertRegister(registerForm)
            .then((response) => {
                setPendingApiCall(false);
                console.log(response);
                navigate('/registers');
            })
            .catch((errorResponse) => {
                setApiError(true);
                setPendingApiCall(false);
                console.log(errorResponse);

                if (errorResponse.response.data) {
                    setErrorForm(errorResponse.response.data.errors[0]);
                    isError(form.agency, form.bank, form.account, form.bank_balance.toString(),form.accountType);
                }

            });
    }

    return (
        <div className="container">
            <h2 className="text-center mt-3">REGISTRO DE CONTAS</h2>

            {apiError &&
                <div className="alert alert-danger col-6 mb-3 mx-auto">
                    Erro ao efetuar o registro. <b>ERRO:</b> {capitalizeFirstLetter(errorForm.defaultMessage)}
                </div>
            }

            <div className="mx-auto col-6 mb-4">
                <label>Informe a agência</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Informe a agência"
                    onChange={onChange}
                    value={form.agency}
                    hasError={agencyError}
                    name="agency"
                />
            </div>

            <div className="mx-auto col-6 mb-4 ">
                <label>Informe o banco</label>
                <Input
                    type="text"
                    className="form-control pe-5"
                    placeholder="Informe o banco"
                    onChange={onChange}
                    value={form.bank}
                    hasError={bankError}
                    name="bank"
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Informe o numero conta</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Informe a conta"
                    onChange={onChange}
                    value={form.account}
                    hasError={accountError}
                    name="account"
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Informe o saldo da conta</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Informe o saldo da conta"
                    onChange={onChange}
                    value={form.bank_balance.toString()}
                    hasError={bank_balanceError}
                    name="bank_balance"
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Informe o tipo da conta</label>
                <select
                    className="form-control"
                    name="accountType"
                    value={form.accountType}
                    onChange={onChange}>
                    <option selected value={""}></option>
                    <option value={"ContaPoupanca"}>Conta Poupança</option>
                    <option value={"ContaCorrento"}>Conta Corrente</option>
                    <option value={"ContaInvestimento"}>Conta Investimento</option>
                    <option value={"Casa"}>Casa</option>
                </select>
            </div>

            <div className="text-center">
                <ButtonDisable
                    disabled={pendingApiCall}
                    className="btn btn-primary"
                    onClick={onClickInsert}
                    text="Cadastrar"
                />
            </div>

        </div>
    )

}