import { useEffect, useState } from "react";
import { IMovementForm, IRegisterForm } from "../../commons/interface";
import AuthService from "../../service/AuthService";
import MovementService from "../../service/MovementService";
import RegisterService from "../../service/RegisterService";

export function HomePage() {

    const user = localStorage.getItem('user');

    const [apiError, setApiError] = useState("");

    const [dataMovement, setDataMovement] = useState([]);

    const [dataRegister, setDataRegister] = useState([]);

    useEffect(() => {
        loadDataMovement();
        loadDataRegister();
         AuthService.checkToken()
             .then((response) => {
                 console.log(response);
             })
             .catch((errorResponse) => {
                 AuthService.logout();
                 AuthService.isAuthenticated();
                 window.location.reload();
                 console.log(errorResponse);
             });
    });

    const loadDataMovement = () => {
        MovementService.findAllByUser()
            .then((response) => {
                setDataMovement(response.data);
                setApiError("");
            })
            .catch((responseError) => {
                setApiError("Falha ao carregar lista de registros.");
            });
    }

    const loadDataRegister = () => {
        RegisterService.findAllByUser()
            .then((response) => {
                setDataRegister(response.data);
                setApiError("");
            })
            .catch((responseError) => {
                setApiError("Falha ao carregar lista de registros.");
            });
    }

    return (
        <div className="container">
            <h1 className="text-center">Home Page</h1>
            <h3 className="mt-2">Movimentações Pendentes</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Data</td>
                        <td>Descrição</td>
                        <td>Tipo</td>
                        <td>Valor</td>
                        <td>Conta Banco</td>
                        <td>Conta Destino</td>
                        <td>Tipo Transação</td>
                    </tr>
                </thead>
                <tbody>
                    {dataMovement.map((movement: IMovementForm) => (
                        <tr key={movement.id}>
                            <td>{movement.id}</td>
                            <td>{movement.date}</td>
                            <td>{movement.description}</td>
                            <td>{movement.type}</td>
                            <td>{movement.value}</td>
                            <td>{movement.register!.bank}</td>
                            <td>{movement.registerDestination?.bank}</td>
                            <td>{movement.typeEnumMovimentation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError &&
                <div className="alert alert-danger">{apiError}</div>
            }

            <h3 className="mt-5">Contas Registradas</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Agência</td>
                        <td>Banco</td>
                        <td>Conta</td>
                        <td>Saldo</td>
                        <td>Tipo Conta</td>
                    </tr>
                </thead>
                <tbody>
                    {dataRegister.map((register: IRegisterForm) => (
                        <tr key={register.id}>
                            <td>{register.id}</td>
                            <td>{register.agency}</td>
                            <td>{register.bank}</td>
                            <td>{register.account}</td>
                            <td>{register.bank_balance}</td>
                            <td>{register.accountType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError &&
                <div className="alert alert-danger">{apiError}</div>
            }

        </div>
    )

}