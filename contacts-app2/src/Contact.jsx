import Avatar from "./Avatar.jsx";
function Contact(props) {
  console.log(props);
// function to create divs with each contact's information in
  return (
    <div className="contact">
    <Avatar src={props.avatar} name={props.name} />
      <h2>{props.name}</h2>
      <p>Phone: {props.phoneNumber}</p>
      {props.email && <p>Email: {props.email}</p>}
    </div>
  );
}

export default Contact;