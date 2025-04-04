import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Phonebook from "../assets/phone-book.svg";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Box>
                <img
                    src={Phonebook}
                    alt="Phonebook"
                    style={{ width: '150px', height: '150px', marginBottom: '20px' }}
                />
                <Typography variant="h3" component="h1" gutterBottom>
                    Phone Book
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Welcome to your personal online phone book!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/contacts')}
                >
                    View Contacts
                </Button>
            </Box>
        </Container>
    );
};

export default MainPage;
