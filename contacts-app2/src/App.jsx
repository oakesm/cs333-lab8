import "./App.css";
import Contact from "./Contact.jsx";
import contacts from "./contacts.js";

function createContact(contact) {
  return (
    <Contact
      key={contact.id}
      name={contact.name}
      phoneNumber={contact.phoneNumber}
      email={contact.email}
      avatar={contact.avatar}
    />
  );
}
function App() {
  console.log(contacts);

  const names = contacts.map(function (contact) {
    return contact.name;
  });
  console.log(names);

  return (
    <div> {/* Each contact is shown because of the function in contact.jsx */}
      <h1>My Contacts</h1>
      {contacts.map(createContact)}
    </div>
  );
}

export default App;