import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContactsTable from '../components/ContactsTable';
import ContactDialog from '../components/ContactDialog';
import { Contact } from '../types/types';
import { fetchContacts, addContact, updateContact, deleteContact } from '../api/apiMiddleware';

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);

    useEffect(() => {
        fetchContacts()
            .then((data) => setContacts(data))
            .catch((error) => console.error("Error fetching contacts:", error));
    }, []);

    const handleOpenDialogForNew = () => {
        setEditingContact(undefined);
        setDialogOpen(true);
    };

    const handleEditContact = (contact: Contact) => {
        setEditingContact(contact);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingContact(undefined);
    };

    const handleSaveContact = async (
        contactData: { name: string; phone: string },
        contactId?: number
    ) => {
        try {
            if (contactId) {
                const updatedContact = await updateContact({ id: contactId, ...contactData });
                setContacts((prev) =>
                    prev.map((c) => (c.id === contactId ? updatedContact : c))
                );
            } else {
                const newContact = await addContact(contactData);
                setContacts((prev) => [...prev, newContact]);
            }
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    const handleDeleteContact = async (contactId: number) => {
        try {
            await deleteContact(contactId);
            setContacts((prev) => prev.filter((c) => c.id !== contactId));
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Contacts
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialogForNew}
                sx={{ m: 4 }}
            >
                Add Contact
            </Button>
            <ContactsTable
                contacts={contacts}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
            />
            <ContactDialog
                open={dialogOpen}
                initialContact={editingContact}
                onClose={handleCloseDialog}
                onSave={handleSaveContact}
            />
        </Container>
    );
};

export default ContactsPage;
