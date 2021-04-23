const Icon = props =>{
  const {
    onClick,
    className,
    title,
    id,
    style
  } = props;
  return(
    <i
    onClick={onClick}
    className={className}
    title={title}
    id={id}
    style={style}
    ></i>
  )
}

export default Icon;