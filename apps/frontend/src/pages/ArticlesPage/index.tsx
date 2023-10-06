import * as React from 'react';
import { observer } from 'mobx-react-lite';
import useMobxStoreHook from '../../hooks/use-mobx-store.hook';
import { FC } from 'react';
import Box from '@mui/material/Box';
import ArticlesComponent from '../../components/articlesComponent';

const ArticlesPage: FC = () => {
  const {
    session: { isAuthenticated },
  } = useMobxStoreHook();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <ArticlesComponent admin={isAuthenticated} />
    </Box>
  );
};

export default observer(ArticlesPage);
