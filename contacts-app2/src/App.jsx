import "./App.css";
import Contact from "./Contact.jsx";

function App() {
  return (
    <div>
      <h1>My Contacts</h1>
      <Contact 
      name="Rosalind Franklin" 
      phoneNumber="208-543-7865"
      email="rosalind@fakemail.com"
      avatar="https://i.pravatar.cc/150?img=10" />

      <Contact 
      name="Katherine Johnson" 
      phoneNumber="801-365-6893"
      email="katherine@fakemail.com"
      avatar="https://i.pravatar.cc/150?img=41" />

      <Contact 
      name="Marie Curie" 
      phoneNumber="458-284-6749"
      email="marie@fakemail.com"
      avatar="https://i.pravatar.cc/150?img=28" />
    </div>
  );
}

export default App;