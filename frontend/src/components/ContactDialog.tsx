import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@mui/material';
import { Contact } from '../types/types';

interface ContactDialogProps {
    open: boolean;
    initialContact?: Contact;
    onClose: () => void;
    onSave: (contactData: { name: string; phone: string }, contactId?: number) => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({
    open,
    initialContact,
    onClose,
    onSave,
}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({ name: '', phone: '' });

    useEffect(() => {
        if (initialContact) {
            setName(initialContact.name);
            setPhone(initialContact.phone);
        } else {
            setName('');
            setPhone('');
        }
    }, [initialContact]);

    const handleSave = () => {
        let valid = true;
        const newErrors = { name: '', phone: '' };
        if (name.trim() === '') {
            newErrors.name = 'Name is required';
            valid = false;
        }
        if (phone.trim() === '') {
            newErrors.phone = 'Phone is required';
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        onSave({ name, phone }, initialContact?.id);
        setName('');
        setPhone('');
        setErrors({ name: '', phone: '' });
    };

    const handleCancel = () => {
        setName('');
        setPhone('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { p: '5em' } } }}>
            <DialogTitle sx={{ fontSize: '2rem' }}>{initialContact ? 'Edit Contact' : 'New Contact'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                />
                <TextField
                    margin="dense"
                    label="Phone"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    {initialContact ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default ContactDialog;
