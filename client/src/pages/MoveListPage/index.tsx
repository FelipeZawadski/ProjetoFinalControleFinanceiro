import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { IMovementForm } from "../../commons/interface";
import MovementService from "../../service/MovementService";

export function MoveListPage() {

  const navigate = useNavigate();

  const [data, setData] = useState<IMovementForm[]>([]);
  const [apiError, setApiError] = useState("");
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    MovementService.findAllByUser()
        .then((response) => {
            setData(response.data);
            setApiError("");
        })
        .catch((responseError) => {
            setApiError("Falha ao carregar lista de registros.");
        });
}

  const onRemove = (id: number) => {
    MovementService.remove(id)
      .then((response) => {
        setShowDeleteMessage(true);
        loadData();
        setTimeout(() => { setShowDeleteMessage(false) }, 1500);
        setApiError("");
      })
      .catch((erro) => {
        setApiError("Falha ao remover a movimentação");
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Movimentações</h1>
      <div className="text-center">
        <Link className="btn btn-success" to="/movements/new">
          Adicionar Movimentação
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Conta Origem</th>
            <th>Conta Destino</th>
            <th>Tipo Transação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((movement: IMovementForm) => (
            <tr key={movement.id}>
            <td>{movement.id}</td>
            <td>{movement.date}</td>
            <td>{movement.description}</td>
            <td>{movement.type}</td>
            <td>{movement.value}</td>
            <td>{movement.register?.bank}</td>
            <td>{movement.registerDestination?.bank}</td>
            <td>{movement.typeEnumMovimentation}</td>
            <td>
                <Link
                  className="btn btn-primary"
                  to={`/movements/${movement.id}`}
                >
                  Editar
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => onRemove(movement.id!)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
      {showDeleteMessage && <div className="alert alert-success">Registro removido com sucesso!</div>}
    </div>
  );
}