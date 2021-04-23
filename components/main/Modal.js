import './css/modal.css';
import Icon from '../assets/Icon';

const Modal = props =>{
  const {onClick, objectJson, i} = props;
  return(
    <div id="wrap">
      <Icon className="fas fa-times" id="cancel" onClick={onClick} />
      <img src={objectJson[i].imagenUsuario.includes('user-') ? process.env.PUBLIC_URL+"/"+objectJson[i].imagenUsuario : objectJson[i].imagenUsuario} alt={objectJson[i].nombreDeUsuario} title={objectJson[i].nombreDeUsuario} />
    </div>
  )
}

export default Modal;