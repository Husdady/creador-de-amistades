const Select = props =>{
  const {content, onChange, name} = props;
  return(
    <select onChange={onChange} name={name}>
      {content}
    </select>
  )
}

export default Select;