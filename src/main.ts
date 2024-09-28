class Contact {
  public id: number;
  public name: string;
  public phone: number;
  public isAbroad: boolean;

  constructor(id: number, name: string, phone: number) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.isAbroad = false;
  }
}

// Create an empty Contact array or load from localStorage
let contacts: Contact[] = JSON.parse(localStorage.getItem("contacts") || "[]");
let contactId: number = contacts.length
  ? contacts[contacts.length - 1].id + 1
  : 0;

// Function to save contacts to localStorage
function saveContactsToLocalStorage(): void {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Function to add a new contact
function addContact(): void {
  const nameInput: HTMLInputElement = document.getElementById(
    "name-input"
  ) as HTMLInputElement;
  const phoneInput: HTMLInputElement = document.getElementById(
    "phone-input"
  ) as HTMLInputElement;

  const name: string = nameInput.value;
  const phone: number = parseInt(phoneInput.value);
  if (name && phone) {
    contacts.push(new Contact(contactId++, name, phone));
    saveContactsToLocalStorage(); // Save the updated contacts list to localStorage
    renderContacts();
    nameInput.value = "";
    phoneInput.value = "";
  }
}

// Function to delete a contact
function deleteContact(id: number): void {
  if (window.confirm("Are you sure you want to delete this contact?")) {
    const index: number = contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
      // Save the updated contacts list to localStorage
      saveContactsToLocalStorage();
      renderContacts();
    }
  }
}
// Function to update the contact counter
function updateContactCounter(): void {
  const contactCounter: HTMLSpanElement = document.getElementById(
    "contact-counter"
  ) as HTMLSpanElement;
  contactCounter.textContent = `${contacts.length} `;
}

// Function to render the contacts list
function renderContacts(): void {
  const contactList: HTMLUListElement = document.getElementById(
    "contact-list"
  ) as HTMLUListElement;
  contactList.innerHTML = "";

  contacts.forEach((contact) => {
    const listItem: HTMLLIElement = document.createElement("li");
    const divItem: HTMLDivElement = document.createElement("div");
    divItem.className = "item";
    divItem.textContent = `${contact.name}: ${contact.phone}`;

    const deleteButton: HTMLButtonElement = document.createElement(
      "button"
    ) as HTMLButtonElement;
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
      deleteContact(contact.id);
    };

    listItem.appendChild(divItem);
    contactList.appendChild(listItem);
    listItem.appendChild(deleteButton);
  });
  // Update the contact counter
  updateContactCounter();
}

// Load contacts from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderContacts();
});
