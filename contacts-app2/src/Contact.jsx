function Contact(props) {
  console.log(props);

  return (
    <div className="contact">
    <img className="avatar" src={props.avatar} alt={props.name} />
      <h2>{props.name}</h2>
      <p>Phone: {props.phoneNumber}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

export default Contact;