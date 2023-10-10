import { Box, Button, Modal, Select, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    _id: string;
    title: string;
    rssDate: string;
    link: string;
  };
  handleArticleUpdateMutate: any;
}

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ModalContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: white;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  & .MuiPaper-root {
    width: 50%;
    background-color: white;
  }
`;

const ModalFormUpdateArticle: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  article,
  handleArticleUpdateMutate,
}) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [rssDate, setRssDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleArticleUpdateMutate(title, link, rssDate, article._id);
    onClose();
  };

  useEffect(() => {
    setTitle(article.title);
    setLink(article.link);
    setRssDate(article.rssDate);
  }, [isOpen, onClose]);

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <ModalContainer>
        <Form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Title"
              value={title}
              sx={{ width: '90%' }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Link"
              value={link}
              sx={{ width: '90%' }}
              onChange={(e) => setLink(e.target.value)}
            />
            <TextField
              label="Date"
              value={rssDate}
              sx={{ width: '90%' }}
              onChange={(e) => setRssDate(e.target.value)}
            />
          </Box>
          <Button type="submit" variant="contained">
            Edit article
          </Button>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Form>
      </ModalContainer>
    </StyledModal>
  );
};

export default ModalFormUpdateArticle;
