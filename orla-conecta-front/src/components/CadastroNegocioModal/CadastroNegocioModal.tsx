import { useEffect, useState } from 'react'
import { FaTimes, FaCheckCircle } from 'react-icons/fa'
import { sendBusinessRegistration } from '../../services/contactService'
import './CadastroNegocioModal.css'

interface Props {
  open: boolean
  onClose: () => void
}

const CATEGORIAS = ['Hospedagem', 'Gastronomia', 'Passeios', 'Transporte']
const CIDADES = ['Porto de Galinhas', 'Recife', 'Olinda', 'Tamandaré', 'Carneiros', 'Outra']

function CadastroNegocioModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    cidade: '',
    endereco: '',
    telefone: '',
    email: '',
    website: '',
    descricao: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!open) return
    setSuccess(false)
    setError(null)
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await sendBusinessRegistration({
        nome: form.nome,
        categoria: form.categoria,
        cidade: form.cidade,
        endereco: form.endereco,
        telefone: form.telefone,
        email: form.email,
        website: form.website || undefined,
        descricao: form.descricao,
      })
      setSuccess(true)
      setForm({ nome: '', categoria: '', cidade: '', endereco: '', telefone: '', email: '', website: '', descricao: '' })
    } catch {
      setError('Não foi possível enviar o cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cn-backdrop" onClick={onClose}>
      <div className="cn-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Cadastrar Negócio">
        <div className="cn-header">
          <div>
            <h2 className="cn-title">Cadastrar Negócio</h2>
            <p className="cn-subtitle">Conecte seu negócio a milhares de turistas</p>
          </div>
          <button className="cn-close" onClick={onClose} aria-label="Fechar">
            <FaTimes size={16} />
          </button>
        </div>

        <form className="cn-form" onSubmit={handleSubmit} noValidate>
          <div className="cn-field">
            <label className="cn-label" htmlFor="cn-nome">Nome do Negócio *</label>
            <input
              id="cn-nome"
              className="cn-input"
              name="nome"
              type="text"
              placeholder="Ex: Pousada Brisa do Mar"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cn-row">
            <div className="cn-field">
              <label className="cn-label" htmlFor="cn-categoria">Categoria *</label>
              <select id="cn-categoria" className="cn-select" name="categoria" value={form.categoria} onChange={handleChange} required>
                <option value="">Selecione uma categoria</option>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="cn-field">
              <label className="cn-label" htmlFor="cn-cidade">Cidade *</label>
              <select id="cn-cidade" className="cn-select" name="cidade" value={form.cidade} onChange={handleChange} required>
                <option value="">Selecione uma cidade</option>
                {CIDADES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="cn-field">
            <label className="cn-label" htmlFor="cn-endereco">Endereço Completo *</label>
            <input
              id="cn-endereco"
              className="cn-input"
              name="endereco"
              type="text"
              placeholder="Rua, número, bairro"
              value={form.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cn-row">
            <div className="cn-field">
              <label className="cn-label" htmlFor="cn-telefone">Telefone *</label>
              <input
                id="cn-telefone"
                className="cn-input"
                name="telefone"
                type="tel"
                placeholder="(81) 99999-9999"
                value={form.telefone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cn-field">
              <label className="cn-label" htmlFor="cn-email">Email *</label>
              <input
                id="cn-email"
                className="cn-input"
                name="email"
                type="email"
                placeholder="contato@seunegocio.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="cn-field">
            <label className="cn-label" htmlFor="cn-website">Website (opcional)</label>
            <input
              id="cn-website"
              className="cn-input"
              name="website"
              type="url"
              placeholder="https://www.seunegocio.com"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="cn-field">
            <label className="cn-label" htmlFor="cn-descricao">Descrição *</label>
            <textarea
              id="cn-descricao"
              className="cn-textarea"
              name="descricao"
              placeholder="Descreva seu negócio, serviços e diferenciais..."
              value={form.descricao}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="cn-actions">
            <button type="submit" className="cn-btn-submit">Enviar Cadastro</button>
            <button type="button" className="cn-btn-cancel" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CadastroNegocioModal
