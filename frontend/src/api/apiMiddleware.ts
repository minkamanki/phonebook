import { Contact } from "../types/types";
const API_URL = "http://localhost:8080/api/contacts";

export async function fetchContacts(): Promise<Contact[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch contacts");
    }
    return response.json();
}

export async function addContact(
    contact: Omit<Contact, "id">
): Promise<Contact> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });
    if (!response.ok) {
        throw new Error("Failed to add contact");
    }
    return response.json();
}

export async function updateContact(contact: Contact): Promise<Contact> {
    const response = await fetch(`${API_URL}/${contact.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });
    if (!response.ok) {
        throw new Error("Failed to update contact");
    }
    return response.json();
}

export async function deleteContact(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete contact");
    }
}