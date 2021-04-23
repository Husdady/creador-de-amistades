import Swal from 'sweetalert2';

const message = (showWarning, color, id, text) =>{
  Swal.fire({
    icon: showWarning ? 'warning' : null,
    iconColor: showWarning ? color : null,
    html: `<h3 id="${id}">${text}</h3>`,
    background: 'rgba(0,0,0,0.85)',
    showConfirmButton: false
  })
}

export default message;