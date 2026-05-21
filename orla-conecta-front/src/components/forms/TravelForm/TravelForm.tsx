export default function TravelForm() {
    return (
         <form className="row g-3 d-flex justify-content-center">
          {/* Destino */}
          <div className="col-md-2">
            <label className="form-label">Destino</label>
            <input type="text" className="form-control" placeholder="Digite o destino" />
          </div>

          {/* Data de Check-in */}
          <div className="col-md-2">
            <label className="form-label">Check-in</label>
            <input type="date" className="form-control" />
          </div>

          {/* Data de Check-out */}
          <div className="col-md-2">
            <label className="form-label">Check-out</label>
            <input type="date" className="form-control" />
          </div>

          {/* Adultos */}
          <div className="col-md-1">
            <label className="form-label">Adultos</label>
            <input type="number" className="form-control" min="1" defaultValue={1} />
          </div>

          {/* Crianças */}
          <div className="col-md-1">
            <label className="form-label">Crianças</label>
            <input type="number" className="form-control" min="0" defaultValue={0} />
          </div>

          {/* Quartos */}
          <div className="col-md-1">
            <label className="form-label">Quartos</label>
            <input type="number" className="form-control" min="1" defaultValue={1} />
          </div>

          {/* Botão de busca */}
          <div className="col-md-1 d-flex align-items-end">
          <button type="submit" className="btn btn-info botao-buscar-grande px-4">Buscar</button>
          </div>
        </form>
    )
}