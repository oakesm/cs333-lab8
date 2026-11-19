import "./App.css";
import Contact from "./Contact.jsx";
import contacts from "./contacts.js";

function App() {
  console.log(contacts);
  return (
    <div> {/* Each contact is shown because of the function in contact.jsx */}
      <h1>My Contacts</h1>
      <Contact 
      // shows the first contact 
        name={contacts[0].name}
        phoneNumber={contacts[0].phoneNumber}
        email={contacts[0].email}
        avatar={contacts[0].avatar}
      />
      <Contact
      // shows the second contact 
        name={contacts[1].name}
        phoneNumber={contacts[1].phoneNumber}
        email={contacts[1].email}
        avatar={contacts[1].avatar}
      />
      <Contact
      // shows the third contact 
        name={contacts[2].name}
        phoneNumber={contacts[2].phoneNumber}
        email={contacts[2].email}
        avatar={contacts[2].avatar}
      />
    </div>
  );
}

export default App;