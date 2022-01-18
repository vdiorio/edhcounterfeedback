import { useRef } from 'react';
import './App.css';
import emailjs from '@emailjs/browser';
import { useState } from 'react/cjs/react.development';
import ReactLoading from 'react-loading';

function App() {
  const MIN_CHARACTERS = 50
  const form = useRef();
  const [disabled, setDisabled] = useState(true)
  const [minCharacter, setCount] = useState(MIN_CHARACTERS)
  const [isLoading, setLoad] = useState(false)
  const [concluded, setConcluded] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();
    setLoad(true)
    emailjs.sendForm('service_rdeu77j', 'template_s8swfzq', form.current, 'user_LJUQTgwuUTwDEmb9SSIDa')
      .then(() => {
        setConcluded(true);
    }, (error) => {
        alert(`Ocorreu um erro, tente novamente mais tarde.
${error}`);
    });
  }

  const handleMessageInput = (e) => {
    const length = e.target.value.length
    setCount(MIN_CHARACTERS - length)
    setDisabled(MIN_CHARACTERS - length > 0);
  }

  return (
    <>
    { concluded ? (
    <div className="form">
      <div className="title">Muito obrigado!</div>
      <div className="subtitle">Seu feedback é muito importante pra gente, queremos tornar o EdhCounter a melhor opção para sua jogatina, e sua participação é parte excencial do projeto.<br/>
      Nós lhe desejamos boas partidas, e que suas mágicas não sejam anuladas.<br/>
      Até mais planeswalker.
      </div>
    </div>): (
    <form className="form" ref={form}>
      <div className="title">Fale Conosco!</div>
      <div className="subtitle">Nos mande feedback usando esse formulario. Utilizaremos seu feedback para aprimorar e melhorar o EdhCounter, caso você esteja tendo algum problema tente detalha-lo ao máximo, para que possamos eleaborar uma solução .</div>
      <div className="input-container ic1">
        <input name="user_name" id="name" className="input" type="text" placeholder=" " />
        <div className="cut"></div>
        <label htmlFor="name" className="placeholder">Seu nome</label>
      </div>
      <div className="input-container ic2">
        <input name="user_email" id="email" className="input" type="text" placeholder=" " />
        <div className="cut cut-short"></div>
        <label htmlFor="email" className="placeholder">Email *</label>
      </div>
      <div className="input-container ic2">
        <select
          id="dispositivo"
          name="device"
          className="input"
          defaultValue="Android"
        >
          <option>iOS</option>
          <option>Android</option>
        </select>
        <div className="cut"></div>
        <label htmlFor="dispositivo" className="placeholder">Dispositivo *</label>
      </div>
      <div className="text-container ic2">
        <textarea name="message" id="message" className="input" placeholder=" " onChange={handleMessageInput} />
        <div className="cut cut-long"></div>
        <label htmlFor="message" className="placeholder">Sua mensagem *</label>
      </div>
      <span className="count">{disabled ? minCharacter : 0}</span>
      {isLoading
        ? <div className='submit'><ReactLoading /></div>
        : <button
          type="button"
          className={`submit ${disabled ? 'disabled' : ''}`}
          disabled={disabled}
          onClick={sendEmail}
        >
          Enviar
        </button>}
    </form>
    ) }
    </>
  );
}

export default App;
