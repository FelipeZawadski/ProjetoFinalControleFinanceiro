import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IRegisterForm } from "../../commons/interface";
import RegisterService from "../../service/RegisterService";

export function RegisterListPage() {

    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate('/registers/new');
    }

    const [apiError, setApiError] = useState("");

    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        RegisterService.findAllByUser()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch((responseError) => {
                setApiError("Falha ao carregar lista de registros.");
            });
    }

    const onClickRemove = (id?: number) => {
        if (id) {
            RegisterService.remove(id)
                .then((response) => {
                    loadData();
                    setApiError("");
                })
                .catch((responseError) => {
                    setApiError("Falha ao remover o registro.");
                });
        }
    }

    return (
        <div className="container">
            <h1 className="text-center">Lista de Registros</h1>
            <div className="d-flex mt-4">
                <button className="btn btn-success col-3 mx-auto" onClick={onClickNavigate}>
                    ADICIONAR
                </button>
            </div>

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Agência</td>
                        <td>Banco</td>
                        <td>Conta</td>
                        <td>Saldo</td>
                        <td>Tipo Conta</td>
                        <td>Editar</td>
                        <td>Remover</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((register: IRegisterForm) => (
                        <tr key={register.id}>
                            <td>{register.id}</td>
                            <td>{register.agency}</td>
                            <td>{register.bank}</td>
                            <td>{register.account}</td>
                            <td>{register.bank_balance}</td>
                            <td>{register.accountType}</td>
                            <td>
                                <Link className="btn btn-primary"
                                    to={`/registers/${register.id}`}>
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger"
                                    onClick={() => onClickRemove(register.id)}>
                                    Remover
                                </button>
                            </td>
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