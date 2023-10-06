import { Button, Modal, Select, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { articleService } from '../../data-services';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '80%',
  maxWidth: '600px',
}));

const ModalContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalFormCreateArticle: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [rssDate, setRssDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      link: link,
      title: title,
      rssDate: rssDate,
    };
    await articleService.createArticle(data);
    onClose();
  };

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <ModalContainer>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Rss Date"
            value={rssDate}
            onChange={(e) => setRssDate(e.target.value)}
          />

          <Button type="submit" variant="contained">
            Create new article
          </Button>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Form>
      </ModalContainer>
    </StyledModal>
  );
};

export default ModalFormCreateArticle;
