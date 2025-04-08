package com.example.phonebook_backend.service;

import com.example.phonebook_backend.model.Contact;
import java.util.List;

public interface ContactService {
    List<Contact> getAllContacts();
    Contact createContact(Contact contact);
    Contact updateContact(Long id, Contact updatedContact);
    void deleteContact(Long id);
}
