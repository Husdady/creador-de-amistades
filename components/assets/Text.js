const Text = props =>{
  const {placeholder, onChange, name, limit} = props;
  return(
    <input
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    name={name}
    maxLength={limit}
    />
  )
}

export default Text;