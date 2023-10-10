import { Button, Modal, Select, TextField } from '@mui/material';
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
  }, [isOpen]);

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <ModalContainer>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            label="Date"
            value={rssDate}
            onChange={(e) => setRssDate(e.target.value)}
          />
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
