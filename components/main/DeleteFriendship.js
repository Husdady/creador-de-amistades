import './css/delete-friend.css';

const DeleteFriendship = props => {
  
  const friendsDelete = props.deletePerson.map( (x, index) => (
    <div className="friend-delete" key={index}>
      <figure style={{
        backgroundImage: `url(${x.imagen.includes('user-') ? process.env.PUBLIC_URL +"/" + x.imagen : x.imagen})`
      }}></figure>
      <h4>Eliminaste a {x.nombre} {x.apellidos} de tu lista de amistades. Se eliminó el {x.date} a las {x.hour} hrs</h4>
    </div>
    ))
  return (
    props.deletePerson.length > 0
      ? <div className="content-delete">
        { friendsDelete }
      </div>   
      : <h2>No se han registrado amistades eliminadas...</h2>
  )
}

export default DeleteFriendship;