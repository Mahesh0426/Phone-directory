"use strict";
class Contact {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.isAbroad = false;
    }
}
// Create an empty Contact array or load from localStorage
let contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
let contactId = contacts.length
    ? contacts[contacts.length - 1].id + 1
    : 0;
// Function to save contacts to localStorage
function saveContactsToLocalStorage() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
// Function to add a new contact
function addContact() {
    const nameInput = document.getElementById("name-input");
    const phoneInput = document.getElementById("phone-input");
    const name = nameInput.value;
    const phone = parseInt(phoneInput.value);
    if (name && phone) {
        contacts.push(new Contact(contactId++, name, phone));
        saveContactsToLocalStorage(); // Save the updated contacts list to localStorage
        renderContacts();
        nameInput.value = "";
        phoneInput.value = "";
    }
}
// Function to delete a contact
function deleteContact(id) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
        const index = contacts.findIndex((contact) => contact.id === id);
        if (index !== -1) {
            contacts.splice(index, 1);
            // Save the updated contacts list to localStorage
            saveContactsToLocalStorage();
            renderContacts();
        }
    }
}
// Function to update the contact counter
function updateContactCounter() {
    const contactCounter = document.getElementById("contact-counter");
    contactCounter.textContent = `${contacts.length} `;
}
// Function to render the contacts list
function renderContacts() {
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
    contacts.forEach((contact) => {
        const listItem = document.createElement("li");
        const divItem = document.createElement("div");
        divItem.className = "item";
        divItem.textContent = `${contact.name}: ${contact.phone}`;
        const deleteButton = document.createElement("button");
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
