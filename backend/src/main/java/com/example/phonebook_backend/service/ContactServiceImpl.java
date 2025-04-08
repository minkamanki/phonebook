package com.example.phonebook_backend.service;

import com.example.phonebook_backend.model.Contact;
import com.example.phonebook_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    @Transactional
    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    @Transactional
    public Contact updateContact(Long id, Contact updatedContact) {
        return contactRepository.findById(id)
            .map(existingContact -> {
                existingContact.setName(updatedContact.getName());
                existingContact.setPhone(updatedContact.getPhone());
                return contactRepository.save(existingContact);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found"));
    }

    @Override
    @Transactional
    public void deleteContact(Long id) {
        Contact contact = contactRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found"));
        contactRepository.delete(contact);
    }
}
