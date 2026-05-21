import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

interface FiltrosProps {
  preco: number
  cafe: boolean
  almoco: boolean
  jantar: boolean
  cancelamento: boolean
  restaurante: boolean
  quarto: boolean
  recepcao: boolean
  estacionamento: boolean
}

interface FiltersSectionProps {
  filtros: FiltrosProps
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosProps>>
}

function FiltersSection({ filtros, setFiltros }: FiltersSectionProps) {
  return (
    <div
      className="container mb-5 p-4"
      style={{
        backgroundColor: 'rgba(50, 50, 50, 0.5)', // cinza escuro semi-transparente
        borderRadius: '1rem',
        color: '#000000', // texto preto
        backdropFilter: 'blur(4px)', // efeito levemente embaçado
      }}
    >
      <h4 className="mb-4">Filtrar hospedagens</h4>

      <Row className="g-3">
        <Col md={6}>
          <Form.Label style={{ color: '#000' }}>Valor por noite (R$)</Form.Label>
          <Form.Control
            type="range"
            min={30}
            max={600}
            value={filtros.preco}
            onChange={(e) =>
              setFiltros({ ...filtros, preco: Number(e.target.value) })
            }
          />
          <span style={{ color: '#000' }}>{`Até R$ ${filtros.preco}`}</span>
        </Col>

        <Col md={6}>
          <Form.Label style={{ color: '#000' }}>Refeições incluídas</Form.Label>
          <div className="d-flex flex-wrap gap-3 text-dark">
            <Form.Check
              type="checkbox"
              label="Café da manhã"
              checked={filtros.cafe}
              onChange={(e) =>
                setFiltros({ ...filtros, cafe: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              label="Almoço"
              checked={filtros.almoco}
              onChange={(e) =>
                setFiltros({ ...filtros, almoco: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              label="Jantar"
              checked={filtros.jantar}
              onChange={(e) =>
                setFiltros({ ...filtros, jantar: e.target.checked })
              }
            />
          </div>
        </Col>

        <Col md={12}>
          <Form.Label style={{ color: '#000' }}>Comodidades</Form.Label>
          <div className="d-flex flex-wrap gap-3 text-dark">
            <Form.Check
              type="checkbox"
              label="Cancelamento gratuito"
              checked={filtros.cancelamento}
              onChange={(e) =>
                setFiltros({ ...filtros, cancelamento: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              label="Restaurante"
              checked={filtros.restaurante}
              onChange={(e) =>
                setFiltros({ ...filtros, restaurante: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              label="Serviço de quarto"
              checked={filtros.quarto}
              onChange={(e) =>
                setFiltros({ ...filtros, quarto: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              label="Recepção 24h"
              checked={filtros.recepcao}
              onChange={(e) =>
                setFiltros({ ...filtros, recepcao: e.target.checked })
              }
            />
            <Form.Check
              type="checkbox"
              label="Estacionamento"
              checked={filtros.estacionamento}
              onChange={(e) =>
                setFiltros({ ...filtros, estacionamento: e.target.checked })
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

function FiltrosWrapper() {
  const [filtros, setFiltros] = useState<FiltrosProps>({
    preco: 300,
    cafe: false,
    almoco: false,
    jantar: false,
    cancelamento: false,
    restaurante: false,
    quarto: false,
    recepcao: false,
    estacionamento: false,
  })

  return <FiltersSection filtros={filtros} setFiltros={setFiltros} />
}

export default FiltrosWrapper
