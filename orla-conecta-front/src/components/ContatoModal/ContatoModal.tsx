import { useEffect, useState } from 'react'
import { FaTimes, FaCheckCircle } from 'react-icons/fa'
import { sendContactMessage } from '../../services/contactService'
import './ContatoModal.css'

interface Props {
  open: boolean
  onClose: () => void
  prefillSubject?: string
  prefillMessage?: string
}

const ASSUNTOS = [
  'Informações sobre serviços',
  'Cadastrar meu negócio',
  'Reclamação ou sugestão',
  'Parceria',
  'Outro',
]

function ContatoModal({ open, onClose, prefillSubject, prefillMessage }: Props) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: prefillSubject ?? '',
    mensagem: prefillMessage ?? '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!open) return
    setSuccess(false)
    setError(null)
    setForm(prev => ({
      ...prev,
      assunto: prefillSubject ?? prev.assunto,
      mensagem: prefillMessage ?? prev.mensagem,
    }))
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose, prefillSubject, prefillMessage])

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await sendContactMessage({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone || undefined,
        assunto: form.assunto,
        mensagem: form.mensagem,
      })
      setSuccess(true)
      setForm({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
    } catch {
      setError('Não foi possível enviar a mensagem. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ct-backdrop" onClick={onClose}>
      <div className="ct-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Entre em Contato">
        <div className="ct-header">
          <div>
            <h2 className="ct-title">Entre em Contato</h2>
            <p className="ct-subtitle">Estamos aqui para ajudar você</p>
          </div>
          <button className="ct-close" onClick={onClose} aria-label="Fechar">
            <FaTimes size={16} />
          </button>
        </div>

        {success ? (
          <div className="ct-success">
            <FaCheckCircle size={48} className="ct-success-icon" />
            <h3>Mensagem enviada!</h3>
            <p>Entraremos em contato em breve.</p>
            <button className="ct-btn-submit" onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <form className="ct-form" onSubmit={handleSubmit} noValidate>
          <div className="ct-field">
            <label className="ct-label" htmlFor="ct-nome">Nome Completo *</label>
            <input
              id="ct-nome"
              className="ct-input"
              name="nome"
              type="text"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ct-row">
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-email">Email *</label>
              <input
                id="ct-email"
                className="ct-input"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-telefone">Telefone (opcional)</label>
              <input
                id="ct-telefone"
                className="ct-input"
                name="telefone"
                type="tel"
                placeholder="(81) 99999-9999"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="ct-field">
            <label className="ct-label" htmlFor="ct-assunto">Assunto *</label>
            <select id="ct-assunto" className="ct-select" name="assunto" value={form.assunto} onChange={handleChange} required>
              <option value="">Selecione um assunto</option>
              {ASSUNTOS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="ct-field">
            <label className="ct-label" htmlFor="ct-mensagem">Mensagem *</label>
            <textarea
              id="ct-mensagem"
              className="ct-textarea"
              name="mensagem"
              placeholder="Digite sua mensagem aqui..."
              value={form.mensagem}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="ct-actions">
            <button type="submit" className="ct-btn-submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
            <button type="button" className="ct-btn-cancel" onClick={onClose} disabled={loading}>Cancelar</button>
          </div>

          {error && <p className="ct-error">{error}</p>}
        </form>
        )}
      </div>
    </div>
  )
}

export default ContatoModal
