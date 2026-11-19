# cs333-lab8
Props and lists: a contacts app in React

You'll build a contacts page one step at a time: first one component that always says the same thing, then props so each contact is different, then your data in its own file, then `map` so React makes a contact for every item in your data.

Do each step below and answer the questions right here in this README as you go (type your answer under each question). Everything is on your laptop until Part 6.

You need:
- Node 20.19 or newer on your laptop (`node -v` to check), same as Lab 7
- your server, with Lab 7 on it

Stuck? Look at the Stuck table at the bottom first, then post in the Slack lab thread: the command you ran, the exact error (copy and paste it), and what you already tried.

Keep the browser's developer tools open the whole lab (F12, or right-click the page, Inspect, then the Console tab). Your `console.log`s show up there, and so do React's warnings.

---

# Part 1: Make the app

1. Click "Use this template" to make your own copy of this repo, clone it to your laptop, and open a terminal in the repo folder.

2. Make a new React app inside the repo:

```bash
npm create vite@latest contacts-app
```

Answer the questions the same way as Lab 7:
- Ok to proceed? y
- Select a framework: React
- Select a variant: JavaScript
- Which linter to use? keep the default
- Install with npm and start now? Yes

Open the link it prints (http://localhost:5173) in your browser.

This terminal is now busy running your app. Leave it running. Open a second terminal on your laptop for everything else.

Next time you want to start it yourself: `cd contacts-app` then `npm run dev`.

3. Open `contacts-app/src/App.jsx`, delete everything in it, and paste this:

```jsx
import "./App.css";

function App() {
  return (
    <div>
      <h1>My Contacts</h1>
    </div>
  );
}

export default App;
```

4. Open `src/App.css`, delete everything in it, and paste this:

```css
.contact {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin: 12px auto;
  max-width: 300px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
```

Save both. Your page should just say My Contacts.

Commit: `Part 1: contacts app`

---

# Part 2: Props

5. One contact. Make a new file `src/Contact.jsx` and paste this:

```jsx
function Contact() {
  return (
    <div className="contact">
      <h2>Ada Lovelace</h2>
      <p>Phone: 541-555-0101</p>
    </div>
  );
}

export default Contact;
```

In `App.jsx`, under the `import "./App.css";` line, add:

```jsx
import Contact from "./Contact.jsx";
```

and under the `<h1>` line, add three of them:

```jsx
      <Contact />
      <Contact />
      <Contact />
```

Question 1: what do you see? Why are all three the same?

6. Props. A prop is a value you hand to a component, written like an HTML attribute. Change `Contact.jsx` to this:

```jsx
function Contact(props) {
  console.log(props);

  return (
    <div className="contact">
      <h2>{props.name}</h2>
      <p>Phone: {props.phoneNumber}</p>
    </div>
  );
}

export default Contact;
```

and change the three `<Contact />` lines in `App.jsx` to this:

```jsx
      <Contact name="Ada Lovelace" phoneNumber="541-555-0101" />
      <Contact name="Alan Turing" phoneNumber="541-555-0102" />
      <Contact name="Grace Hopper" phoneNumber="541-555-0103" />
```

TODO: change the names and phone numbers to people you make up (or your favorite characters). Keep the phone numbers fake.

Look in the Console. (You might see each line twice. That's React double-checking your code while you develop, it's normal and it doesn't happen on your server.)

Question 2: what does `console.log(props)` print? What kind of thing is `props`?

7. Two more props. Add `email` and `avatar` to each `<Contact />` in `App.jsx`, for example:

```jsx
      <Contact
        name="Ada Lovelace"
        phoneNumber="541-555-0101"
        email="ada@example.com"
        avatar="https://i.pravatar.cc/150?img=5"
      />
```

(A long tag can go on more than one line like this. It's easier to read.)

TODO: do the same for your other two contacts. For the avatar, change the number at the end (`img=1` up to `img=70`) to get a different picture.

Then show them in `Contact.jsx`. Put this line above the `<h2>`:

```jsx
      <img className="avatar" src={props.avatar} alt={props.name} />
```

and this one under the phone line:

```jsx
      <p>Email: {props.email}</p>
```

Question 3: the `Contact` component is written once. How does it show three different people?

Commit: `Part 2: props`

---

# Part 3: Your data in its own file

Right now your data (names, phones) is mixed in with your layout in `App.jsx`. Let's move the data out.

8. Make a new file `src/contacts.js` (small c, and `.js` not `.jsx`, because it's just data, not a component) and paste this:

```js
const contacts = [
  {
    name: "Ada Lovelace",
    phoneNumber: "541-555-0101",
    email: "ada@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Alan Turing",
    phoneNumber: "541-555-0102",
    email: "alan@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Grace Hopper",
    phoneNumber: "541-555-0103",
    email: "grace@example.com",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

export default contacts;
```

TODO: put your own three contacts in it (the same ones from step 7).

9. Use it in `App.jsx`. Under the other imports, add:

```jsx
import contacts from "./contacts.js";
```

and inside `function App() {`, above the `return`, add:

```jsx
  console.log(contacts);
```

Question 4: what does the Console show? What is `contacts`, and what is each thing inside it?

10. Now replace your three `<Contact ... />` tags in `App.jsx` with these, which read from `contacts`:

```jsx
      <Contact
        name={contacts[0].name}
        phoneNumber={contacts[0].phoneNumber}
        email={contacts[0].email}
        avatar={contacts[0].avatar}
      />
      <Contact
        name={contacts[1].name}
        phoneNumber={contacts[1].phoneNumber}
        email={contacts[1].email}
        avatar={contacts[1].avatar}
      />
      <Contact
        name={contacts[2].name}
        phoneNumber={contacts[2].phoneNumber}
        email={contacts[2].email}
        avatar={contacts[2].avatar}
      />
```

The page should look the same. But now all your data lives in `contacts.js`.

Question 5: why `0`, `1` and `2`? What would you have to do if you had 100 contacts?

Commit: `Part 3: data in contacts.js`

---

# Part 4: map

11. `map` warm-up. `map` goes through an array, runs a function on each item, and gives you back a new array with whatever the function returned. Above the `return` in `App`, add:

```jsx
  const names = contacts.map(function (contact) {
    return contact.name;
  });
  console.log(names);
```

Question 6: what's in `names`? How many times did the function run?

12. Now use `map` to make the `<Contact />`s. In `App.jsx`, above `function App() {` (not inside it), add this function. It takes one contact and returns one `<Contact />`:

```jsx
function createContact(contact) {
  return (
    <Contact
      name={contact.name}
      phoneNumber={contact.phoneNumber}
      email={contact.email}
      avatar={contact.avatar}
    />
  );
}
```

Then delete the three `<Contact ... />` tags from step 10 and put this in their place:

```jsx
      {contacts.map(createContact)}
```

The page should look the same, but the three `<Contact />`s are made for you now. Look in the Console though. You should see a red message.

Question 7: what does the red message say?

13. Keys. When React makes a list with `map`, it wants a `key` on each one: a value that's different for every item, so React can tell them apart when the list changes. Add an `id` to each contact in `contacts.js`, like this:

```js
  {
    id: 1,
    name: "Ada Lovelace",
```

TODO: give your other two contacts `id: 2` and `id: 3`.

Then add a `key` line to the `<Contact` in `createContact`:

```jsx
    <Contact
      key={contact.id}
      name={contact.name}
```

Save, refresh, and the red message should be gone.

14. Add a fourth contact at the bottom of `contacts.js` (with `id: 4`). Don't touch `App.jsx`.

Question 8: did your fourth contact show up? Why didn't you have to change `App.jsx`?

Your whole `App.jsx` should look like this now (with your own console.logs if you added more):

```jsx
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
    <div>
      <h1>My Contacts</h1>
      {contacts.map(createContact)}
    </div>
  );
}

export default App;
```

Commit: `Part 4: map`

---

# Part 5: A component inside a component, and a missing email

15. An `Avatar` component. Pictures of people show up all over a real site (contacts, comments, the top bar), so the picture gets its own component. Make a new file `src/Avatar.jsx` and paste this:

```jsx
function Avatar(props) {
  return <img className="avatar" src={props.src} alt={props.name} />;
}

export default Avatar;
```

In `Contact.jsx`, add this at the very top:

```jsx
import Avatar from "./Avatar.jsx";
```

and replace the `<img ... />` line with:

```jsx
      <Avatar src={props.avatar} name={props.name} />
```

The page should look the same. `App` uses `Contact`, and now `Contact` uses `Avatar`.

16. A contact with no email. In `contacts.js`, delete the whole `email: ...` line from one of your contacts. Save and look at that contact.

Question 9: what does that contact show for Email? Why?

Fix it in `Contact.jsx` by changing the email line to this:

```jsx
      {props.email && <p>Email: {props.email}</p>}
```

Now the Email line only shows up when there is an email. (Slides: `&&` only does the right side if the left side is true. A missing email is `undefined`, which counts as false.)

Your whole `Contact.jsx` should look like this now:

```jsx
import Avatar from "./Avatar.jsx";

function Contact(props) {
  console.log(props);

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
```

17. Comments and console.logs. Add a comment above each function in `App.jsx`, `Contact.jsx` and `Avatar.jsx`, and above the array in `contacts.js`, saying what it does, in your own words. Add at least one `console.log` of your own somewhere that helped you see what your code was doing. You can leave your console.logs in, or comment them out with `//`. Either way is fine.

18. Optional: favorites with `filter`. `filter` is like `map`, but instead of changing each item, it keeps only the items where your function returns true. Add `favorite: true` or `favorite: false` to each contact in `contacts.js`. Then in `App`, above the `return`:

```jsx
  const favorites = contacts.filter(function (contact) {
    return contact.favorite;
  });
  console.log(favorites);
```

and under `{contacts.map(createContact)}`:

```jsx
      <h1>Favorites</h1>
      {favorites.map(createContact)}
```

19. Optional styling. Paste this at the bottom of `App.css`, then change the colors and sizes to make it yours:

```css
body {
  background-color: #f4f1ea;
  font-family: Arial, sans-serif;
}

h1 {
  color: darkslateblue;
}

.contact {
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.contact:hover {
  transform: scale(1.03);
}

.contact h2 {
  margin: 8px 0 4px;
}
```

Commit: `Part 5: Avatar and missing email`

---

# Part 6: Build it and put it on your server

20. Build. In your first terminal (the one running the app) press Ctrl+C to stop it.

Same two ways as Lab 7. Way B keeps your Lab 7 app where it is, so it's the one I'd pick.

## Way A: straight into /var/www/html

Heads up: this replaces whatever is in `/var/www/html` now (your Lab 7 app, if you did Way A there).

On your laptop, inside `contacts-app`:

```bash
npm run build
scp -r dist/* yourfirstname@your-server-address:/var/www/html/
```

Your site: `http://your-server-address`

## Way B: in a folder called contacts

On your laptop, inside `contacts-app`, build with the folder name:

```bash
npm run build -- --base=/contacts/
```

In your second terminal, log in to your server, make the folder, and log out again:

```bash
ssh yourfirstname@your-server-address
mkdir /var/www/html/contacts
exit
```

Back on your laptop, inside `contacts-app`, copy what's inside `dist` into it:

```bash
scp -r dist/* yourfirstname@your-server-address:/var/www/html/contacts/
```

Using WinSCP instead? Make a new folder called `contacts` inside `/var/www/html` on the right, open it, and drag everything inside your `dist` folder (not the `dist` folder itself) over.

Your site: `http://your-server-address/contacts/`

21. Open your site in your browser. You should see your contacts.

Commit: `Part 6: build and deploy`

---

# Hand it in

22. Push this repo to your own GitHub repo (your `contacts-app` code and this README with your answers). `node_modules` and `dist` are left out on purpose, Vite's `.gitignore` takes care of that.

23. Submit in Moodle: your GitHub repo link and your site link (`http://your-server-address` or `http://your-server-address/contacts/`). Leave it up so I can look at it.

---

## Stuck?

| You see | What's going on | Fix |
| --- | --- | --- |
| `npm run dev` says `Missing script: "dev"` | You're not in `contacts-app` | `cd contacts-app` first |
| The page is blank | There's an error in your code | Console tab in the developer tools, read the red error |
| `Failed to resolve import "./Contact.jsx"` | The file name, folder or capital letter is different | It has to be `src/Contact.jsx`, capital C, and the import has to match exactly |
| `Failed to resolve import "./contacts.js"` | Same thing for the data file | `src/contacts.js`, small c, `.js` |
| `contacts is not defined` | `App.jsx` is missing the import | `import contacts from "./contacts.js";` at the top of `App.jsx` |
| `Cannot read properties of undefined (reading 'name')` | You asked for a contact that isn't there, like `contacts[3]` when you only have 3 | Remember the first one is `contacts[0]` |
| `Each child in a list should have a unique "key" prop` | The `<Contact` in `createContact` has no `key` | Step 13: `key={contact.id}`, and every contact needs a different `id` |
| A name or phone doesn't show up | The prop name in `App.jsx` and in `Contact.jsx` don't match | `phoneNumber="..."` in App has to be `props.phoneNumber` in Contact, same spelling |
| The pictures don't show | No internet, or a typo in the avatar link | Paste the link into your browser to check it |
| `Adjacent JSX elements must be wrapped in an enclosing tag` | `return` has more than one tag at the top | Wrap everything in one `<div>` ... `</div>` |
| Way B: `/contacts/` shows a blank page | You built without `--base=/contacts/` | `npm run build -- --base=/contacts/` and copy `dist/*` into `/var/www/html/contacts/` again |
| `scp: ... Permission denied` or `mkdir: ... Permission denied` | `/var/www/html` doesn't belong to you yet | On the server: `sudo chown -R $USER:$USER /var/www/html` (week 6) |
