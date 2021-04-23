import React, { useEffect, useState } from 'react';
import Icon from '../assets/Icon';
import LoadImage from '../assets/LoadImage';
import Swal from 'sweetalert2';
import ReactStars from "react-rating-stars-component";

const ListFriendships = props => {
  const {
    fondoImagen,
    imagenUsuario,
    nombreDeUsuario,
    apellidosDeUsuario,
    profesion,
    sobreElUsuario,
    edad,
    genero,
    signo,
    nacimiento,
    pais,
    ciudad,
    fobia,
    odioDelUsuario,
    gustoSobreElUsuario,
    odioSobreElUsuario,
    comidaFavorita,
    colorFavorito,
    serieFavorita,
    peliculaFavorita,
    cancionFavorita,
    tipoDeRelacion,
    belleza,
    sexy,
    importancia,
    valoracion,
    showModal,
    index,
    person,
    changeImg
  } = props,

    /* Mostrar camara */
    [showCamera, setShowCamera] = useState(false),

    /* Cambiar icono de editar y check */
    [edit, setEdit] = useState(false),

    /* Capturando la actual img de usuario */
    [actualUserImg, setActualUserImg] = useState(''),

    /* Capturando la actual img de fondo */
    [actualBackgroundImg, setActualBackgroundImg] = useState(''),

    [applyChanges, setApplyChanges] = useState(null),

    loadImage = e => {
      const { name } = e.target,
        file = e.target.parentElement.querySelector('input[type="file"]').files[0], reader = new FileReader();
      reader.addEventListener('load', () => {
        if (name === 'userImg') {
          setActualUserImg(reader.result);
        } else {
          setActualBackgroundImg(reader.result);
        }
      }, false)
      file && reader.readAsDataURL(file);
    },

    confirmLoadImage = () => {
      Swal.fire({
        html: `<h3 id="applyChanges">¿Desea aplicar los cambios?</h3>`,
        background: 'rgba(0,0,0,0.85)',
        showDenyButton: true,
        confirmButtonText: '<i class="fas fa-check" id="apply-changes-check"></i>',
        denyButtonText: '<i class="fas fa-times"></i>',
        confirmButtonColor: '#12A002',
        denyButtonColor: '#A80000',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setShowCamera(false);
          setEdit(false);
          if (!applyChanges) {
            return actualUserImg === '' ? setActualUserImg('') : !actualUserImg.includes('user-') ? changeUserImg(actualUserImg, index) : null;
          } else {
            return actualBackgroundImg === '' ? setActualBackgroundImg('') : !actualBackgroundImg.includes('background-') ? changeBackgroundImg(actualBackgroundImg, index) : null;
          }
        } else if (result.isDenied) {
          setShowCamera(false);
          setEdit(false);
          if (!applyChanges) {
            imagenUsuario.indexOf('user-') === -1 && changeUserImg(imagenUsuario, index);
            return imagenUsuario.indexOf('user-') !== -1 ? setActualUserImg('') : setActualUserImg(imagenUsuario);
          } else {
            fondoImagen.indexOf('background-') === -1 && changeBackgroundImg(fondoImagen, index);
            return fondoImagen.indexOf('background-') !== -1 ? setActualBackgroundImg('') : setActualBackgroundImg(fondoImagen);
          }
        }
      })
    }

  const changeUserImg = (img, index) => {
    let newArr = [...person];
    newArr[index].imagenUsuario = img;
    changeImg(newArr);
  }

  const changeBackgroundImg = (img, index) => {
    let newArr = [...person];
    newArr[index].fondoImagen = img;
    changeImg(newArr);
  }

  useEffect(() => {
    setActualUserImg(imagenUsuario.includes('user-') ? process.env.PUBLIC_URL + "/" + imagenUsuario : imagenUsuario);
    setActualBackgroundImg(fondoImagen.includes('background-') ? process.env.PUBLIC_URL + "/" + fondoImagen : fondoImagen);
  }, [imagenUsuario, fondoImagen]);

  return (
    <div className="person">

      <div className="content-person">

        <article className="image-person" style={{
          backgroundImage: `url(${!actualBackgroundImg ? `${process.env.PUBLIC_URL}/${fondoImagen}` : actualBackgroundImg})`
        }}>

          {showCamera
            ? <LoadImage
              onChange={e => {
                setApplyChanges(true);
                loadImage(e);
              }}
              name="backgroundImg"
              id={'background-file' + index}
            />
            : null}

        </article>

        <article className="name-person">
          {!edit
            ? <Icon title="Editar" className="fas fa-edit"
              onClick={() => {
                setShowCamera(true);
                setEdit(true);
              }} />
            : <Icon title="Aplicar cambios" className="fas fa-check" onClick={() => {
              confirmLoadImage();
            }} />
          }
          <Icon title="Eliminar" className="fas fa-trash" onClick={() => {
            Swal.fire({
              icon: 'warning',
              iconColor: '#BBB45B',
              html: `<h3 id="messageForDeleteFriend">¿Estás seguro(a) que deseas eliminar a ${nombreDeUsuario}?</h3>`,
              background: 'rgba(0,0,0,0.85)',
              showDenyButton: true,
              confirmButtonText: `Eliminar`,
              denyButtonText: `Descartar`,
              confirmButtonColor: '#A80000',
              denyButtonColor: 'rgba(255,255,255,0.15)',
            }).then((result) => {
              if (result.isConfirmed) {
                props.deleteFriendship();
                props.showFriendsDelete();
              } else if (result.isDenied) {
                return null;
              }
            })
          }} />
          <figure style={{
            backgroundImage: `url(${!actualUserImg ? `${process.env.PUBLIC_URL}/${imagenUsuario}` : actualUserImg})`
          }}
            onClick={() => !showCamera ? showModal() : null}
          >

            {showCamera
              ? <LoadImage
                onChange={e => {
                  setApplyChanges(false);
                  loadImage(e);
                }}
                name="userImg"
                id={'file' + index}
              />
              : null}

          </figure>
          <h4>{nombreDeUsuario} {apellidosDeUsuario}</h4>
          <span>{profesion}</span>
          <b>-</b>
          <p>“ {sobreElUsuario} ”
          <br />
            <br />
            <b>“ Para mí, {nombreDeUsuario}, {importancia}</b>
          &nbsp;&nbsp;
          {
              valoracion === '✮✮✮✮✮ Muy alta' ?
                <Icon className="fas fa-heart" style={{ padding: 0, color: 'darkred' }}
                />
                : valoracion === '✮✮✮✮ Alta' ?
                  <Icon className="fas fa-laugh" style={{ padding: 0, color: 'darkgoldenrod' }}
                  />
                  : valoracion === '✮✮✮ Normal' ?
                    <Icon className="fas fa-grin-wink" style={{ padding: 0, color: 'darkgoldenrod' }}
                    />
                    : valoracion === '✮✮ Baja' ?
                      <Icon className="fas fa-thumbs-down" style={{ padding: 0, color: 'darkcyan' }}
                      />
                      : <Icon className="fas fa-poo" style={{ padding: 0, color: 'saddlebrown' }}
                      />
            }
          ”
          </p>
          <br />
        </article>

        <article className="information-person">

          <div className="fact">
            <h4><Icon className="fab fa-pagelines" />&nbsp;Edad: <span>{edad} años</span></h4>
            <h4>{
              genero === "Masculino"
                ? <Icon className="fas fa-mars" />
                : genero === "Femenino"
                  ? <Icon className="fas fa-venus" />
                  : <Icon className="fas fa-neuter" />
            }&nbsp;Género: <span>{genero}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-khanda" />&nbsp;Signo Zodiacal: <span>{signo}</span></h4>
            <h4><Icon className="fas fa-calendar-alt" />&nbsp;Fecha de Nacimiento: <span>{nacimiento}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-flag" />&nbsp;País de origen: <span>{pais}</span></h4>
            <h4><Icon className="fas fa-home" />&nbsp;Ciudad o Provincia: <span>{ciudad}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-ghost" />&nbsp;Fobia: <span>{fobia}</span></h4>
            <h4><Icon className="fas fa-angry" />&nbsp;Lo que más odia: <span>{odioDelUsuario}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-hand-peace" />&nbsp;Lo que más te gusta de {nombreDeUsuario}: <span>{gustoSobreElUsuario}</span></h4>
            <h4><Icon className="fas fa-hand-middle-finger" />&nbsp;Lo que más odias de {nombreDeUsuario}: <span>{odioSobreElUsuario}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-utensils" />&nbsp;Comida favorita: <span>{comidaFavorita}</span></h4>
            <h4><Icon className="fas fa-tint" />&nbsp;Color favorito: <span>{colorFavorito}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-dragon" />&nbsp;Serie favorita: <span>{serieFavorita}</span></h4>
            <h4><Icon className="fas fa-video" />&nbsp;Película favorita: <span>{peliculaFavorita}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-music" />&nbsp;Canción favorita: <span>{cancionFavorita}</span></h4>
            <h4><Icon className="fas fa-heart" />&nbsp;Tipo de relación: <span>{tipoDeRelacion}</span></h4>
          </div>

          <div className="fact">
            <h4><Icon className="fas fa-grin-hearts" />&nbsp;Belleza: <span>{belleza}</span></h4>
            <h4><Icon className="fab fa-angellist" />&nbsp;Sexy: <span>{sexy}</span></h4>
          </div>
        </article>

      </div>

      <article className="assessment">
        <ReactStars
          value={
            valoracion === '✮✮✮✮✮ Muy alta' ? 5
              : valoracion === '✮✮✮✮ Alta' ? 4
                : valoracion === '✮✮✮ Normal' ? 3
                  : valoracion === '✮✮ Baja' ? 2
                    : 1
          }
          edit={false}
          char=""
          size={18}
          color="rgba(255,255,255, 0.7)"
          activeColor="#F89D07"
        />
      </article>
    </div>
  )
};

export default ListFriendships;