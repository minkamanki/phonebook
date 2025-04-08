package com.example.phonebook_backend.service;

import com.example.phonebook_backend.model.Contact;
import com.example.phonebook_backend.service.ContactService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class ContactServiceTests {

    @Autowired
    private ContactService contactService;

    @Test
    void testCreateUpdateDeleteContact() {
        Contact contact = new Contact("Service User", "111111111");
        Contact created = contactService.createContact(contact);
        Assertions.assertNotNull(created.getId(), "Contact ID should not be null after create");
        Assertions.assertEquals("Service User", created.getName());
        Assertions.assertEquals("111111111", created.getPhone());

        created.setName("Updated Service User");
        created.setPhone("222222222");
        Contact updated = contactService.updateContact(created.getId(), created);
        Assertions.assertEquals("Updated Service User", updated.getName());
        Assertions.assertEquals("222222222", updated.getPhone());

        contactService.deleteContact(updated.getId());
        Assertions.assertThrows(RuntimeException.class, () -> {
            contactService.updateContact(updated.getId(), updated);
        }, "Expected exception when updating a deleted contact");
    }
}
