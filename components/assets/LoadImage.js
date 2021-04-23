const LoadImage = props => {
  const {onChange, id, name} = props;
  return (
    <div className="edit-image">
      <input onChange={onChange} name={name} type="file" id={id} accept="image/*" className="files" />
      <label htmlFor={id} className="load-image"></label>
    </div>
  )
}

export default LoadImage;