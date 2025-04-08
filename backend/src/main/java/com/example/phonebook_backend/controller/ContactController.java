package com.example.phonebook_backend.controller;

import com.example.phonebook_backend.model.Contact;
import com.example.phonebook_backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public List<Contact> getContacts() {
        return contactService.getAllContacts();
    }

    @PostMapping
    public Contact createContact(@Valid @RequestBody Contact contact) {
        return contactService.createContact(contact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable Long id, 
            @Valid @RequestBody Contact updatedContact) {
        Contact updated = contactService.updateContact(id, updatedContact);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
}
