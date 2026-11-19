{/* function to create avatar prop */}
function Avatar(props) {
  return <img className="avatar" src={props.src} alt={props.name} />;
}

export default Avatar;