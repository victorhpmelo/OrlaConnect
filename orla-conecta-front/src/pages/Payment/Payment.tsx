import '@fortawesome/fontawesome-free/css/all.min.css';
import './Payment.css';


function Payment() {
  return (
    <div className='payment-container'> 
      <div className='card-informacao'>
        <div className='infos'>
          <div className='infos-client'>
              <span className='text-clientid'>client id ou cpf</span>
            <h1>Nome Client</h1>
          </div>
          <div className='infos-hotel'>
              <span className='text-hotelid'>hotel id ou cnpj</span>
              <h1>Nome Hotel</h1>
          </div>
        </div>
        <div className='inputs'>
          <input type="text" id="nomeCompleto" name="nomeCompleto" placeholder="Nome Completo" required />
          <input type="text" id="cpforpassport" name="cpforpassport" placeholder="CPF ou PASSPORT" required />
        </div>

        <div className='forma-pagamento'>
          <div className='pagamento-radio'>
             <label>
                <input type="radio" name='formapagamento' value="boleto" />
              </label>
              <label>
                <input type="radio" name='formapagamento' value="pix"/>
              </label>
              <label>
                <input type="radio" name='formapagamento' value="cartao"/>
              </label>
          </div>
        </div>

      </div>

      <div className='pagamento-info'>
          <div className='total-pagar'>

          </div>
          <button className='ir-pagamento'>ir para o pagamento</button>
      </div>
    </div>


  );
}

export default Payment

 