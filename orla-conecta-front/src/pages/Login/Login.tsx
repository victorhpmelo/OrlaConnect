import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';

function Login() {

  return (
    <div>
      <header className="header-login">
        <div className="logo-area">
          <h1 className="name-header">Orla Conecta</h1>
          <i className="fas fa-plane icon-plane"></i>
        </div>
        <i className="fas fa-user icon-user"></i>
      </header>

      <div className='login-container'>
        <div className="card-login">
          <div className="login-content">
            <form className="form-card" >
              <p>Faça seu login</p>
              <div className="input-email">
                <input type="email" id="email" name="email" placeholder="Email" required />
              </div>
              <div className="input-password">
                <input type="password" id="password" name="password" placeholder="Password" required />
              </div>
              <button type="submit">Login</button>
              <a href="#" className="link-login">Esqueci a senha</a>
              <span>Ainda não tem conta? <a href="#" className="link-login">Cadastre-se</a></span>
              <span>ou use uma das seguintes opções</span>
              <div className="img-link-login">
                <a href="https://google.com">
                  <img src="https://th.bing.com/th/id/R.9083a08e5078931279f9c07bd361b4f2?rik=wR6IQoBKiuF9Ww&pid=ImgRaw&r=0" alt="Imagem 1" />
                </a>
                <a href="https://google.com">
                  <img src="https://th.bing.com/th/id/R.9083a08e5078931279f9c07bd361b4f2?rik=wR6IQoBKiuF9Ww&pid=ImgRaw&r=0" alt="Imagem 2" />
                </a>
                <a href="https://google.com">
                  <img src="https://th.bing.com/th/id/R.9083a08e5078931279f9c07bd361b4f2?rik=wR6IQoBKiuF9Ww&pid=ImgRaw&r=0" alt="Imagem 3" />
                </a>
              </div>
            </form>



          </div>
        </div>
        <div className='img-login'>
          <img src="https://i.pinimg.com/736x/99/de/98/99de98eb4e7bd078d39db104da78444e.jpg" alt="imagem-login" />
        </div>
      </div>

    </div>
  );
}

export default Login;
