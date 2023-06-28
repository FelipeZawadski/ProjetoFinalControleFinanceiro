import { ChangeEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { IMovementForm, IRegisterList } from "../../commons/interface";
import { ButtonDisable } from "../../components/ButtonDisable";
import { Input } from "../../components/Input";
import MovementService from "../../service/MovementService";
import RegisterService from "../../service/RegisterService";

export function MoveFormPage() {
    const [form, setForm] = useState<IMovementForm>({
        id: undefined,
        value: 0,
        register: { id: undefined, bank: "" },
        registerDestination: undefined,
        typeEnumMovimentation: '',
        description: '',
        date: '',
        type: '',
    });

    const [errors, setErrors] = useState({
        id: "",
        value: "",
        register: "",
        registerDestination:"",
        typeEnumMovimentation:"",
        description: "",
        date: "",
        type: "",
      });

    const [valueError, setValueError] = useState(false);

    const [descriptionError, setDescriptionError] = useState(false);

    const [registers, setRegisters] = useState<IRegisterList[]>([]);

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [apiError, setApiError] = useState(false);

    const [typeEnumMovimentation, setTypeEnumMovimentation] = useState("TRANSFERENCIA_ENTRE_CONTAS");

    const [errorForm, setErrorForm] = useState({
        defaultMessage: ''
    });

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        
        RegisterService.findAllByUser()
            .then((response) => {
                setRegisters(response.data);
                
                if (id) {
                    MovementService.findOneById(parseInt(id))
                        .then((response) => {
                            if (response.data) {
                                
                                setForm({
                                    
                                    id: response.data.id,
                                    value: response.data.value,
                                    register: { id: response.data.register.id, bank: "" },
                                    registerDestination: response.data.registerDestination ? { id: response.data.registerDestination?.id, bank: ""} : undefined,
                                    typeEnumMovimentation: response.data.typeEnumMovimentation,
                                    description: response.data.description,
                                    date: response.data.date,
                                    type: response.data.type
                                });
                                setApiError(false);
                            } else {
                                setApiError(true);
                            }
                        })
                        .catch((erro) => {
                            setApiError(true);
                        });
                } else {
                    setForm((previousForm) => {
                        return {
                            ...previousForm,
                            register: { id: response.data[0].id, bank: '' }
                        };
                    });
                }
                setApiError(false);
            })
            .catch((erro) => {
                setApiError(true);
            });
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

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: { id: value },
            };
        });
    };

    function capitalizeFirstLetter(message: string) {
        return message.charAt(0).toUpperCase() + message.slice(1);
    }

    const isError = (value: string, description: string) => {

        if (value == '') {
            setValueError(true);
        }
        else {
            setDescriptionError(false);
        }

    }

    const onClickInsert = () => {
        setPendingApiCall(true);

        const movementForm: IMovementForm = {
            id: form.id,
            value: form.value!,
            register: form.register,
            registerDestination: form.registerDestination ? form.registerDestination : undefined,
            typeEnumMovimentation: form.typeEnumMovimentation,
            description: form.description,
            date: form.date,
            type: form.type
        }

        MovementService.insertMovement(movementForm)
            .then((response) => {
                setPendingApiCall(false);
                console.log(response);
                navigate('/movements');
            })
            .catch((errorResponse) => {
                setApiError(true);
                setPendingApiCall(false);
                console.log(errorResponse);

                if (errorResponse.response.data) {
                    setErrorForm(errorResponse.response.data.errors[0]);
                    isError(form.value.toString(), form.description);
                }
            });
    }

    return (
        <div className="container">
            <h2 className="text-center mt-3">MOVIMENTAÇÕES</h2>

            {apiError &&
                <div className="alert alert-danger col-6 mb-3 mx-auto">
                    Erro ao inserir movimentação. <b>ERRO:</b> {capitalizeFirstLetter(errorForm.defaultMessage)}
                </div>
            }

            <div className="mx-auto col-6 mb-4">
                <label>Valor</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Valor da transação"
                    onChange={onChange}
                    value={form.value.toString()}
                    name="value"
                    hasError={valueError}
                />
            </div>

            <div className="mx-auto col-6">
                <label>Data</label>
                <Input
                    className="form-control mx-auto col-12 mb-4"
                    type="date"
                    placeholder="Selecione o dia da movimentação"
                    onChange={onChange}
                    value={form.date}
                    name="date" 
                    hasError={false}                
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Descrição da movimentação</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Descrição da movimentação..."
                    onChange={onChange}
                    value={form.description}
                    name="description"
                    hasError={descriptionError}
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Operação</label>
                <select
                    className="form-control"
                    name="type"
                    value={form.type}
                    onChange={onChange}>
                    <option value={""}></option>
                    <option value={"Pago"}>Pago</option>
                    <option value={"Pendente"}>Pendente</option>
                    <option value={"Recebido"}>Recebido</option>
                </select>
            </div>
            
            <div className="mx-auto col-6 mb-4">
                <label>Tipo Transação</label>
                <select
                    className="form-control"
                    name="typeEnumMovimentation"
                    value={form.typeEnumMovimentation}
                    onChange={onChange}>
                    <option value=""></option>
                    <option value="RECEITA">Receita</option>
                    <option value="DESPESA">Despesas</option>
                    <option value="TRANSFERENCIA_ENTRE_CONTAS">Transferencia Entre Contas</option>
                </select>
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Conta de Origem</label>
                <select
                    className="form-control"
                    name="register"
                    value={form.register.id}
                    onChange={onChangeSelect}
                >
                    {registers.map((register: IRegisterList) => (
                        <option key={register.id} value={register.id}>
                            {register.bank}
                        </option>
                    ))}
                </select>
            </div>

            {typeEnumMovimentation == form.typeEnumMovimentation && 
                <div className="mx-auto col-6 mb-4">
                <label>Conta de Destino</label>
                <select
                    className="form-control"
                    name="registerDestination"
                    value={form.registerDestination?.id}
                    onChange={onChangeSelect}
                >
                    {registers.map((registerDestination: IRegisterList) => (
                        <option key={registerDestination.id} value={registerDestination.id}>
                            {registerDestination.bank}
                        </option>
                    ))}
                </select>
            </div>
            }

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