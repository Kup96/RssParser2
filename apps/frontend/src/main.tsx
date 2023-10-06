import { StrictMode } from 'react';
import { RootThemeProvider } from './RootThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Root from './root';
// import { GlobalStoreContextProvider } from './contexts';
// import { GlobalStore } from './stores';
import { QueryClientProvider, QueryClient } from 'react-query';
import ModalProvider from 'mui-modal-provider';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: (err) => {
        console.error('error');
        console.error('Error occurred when executing query', err);
      },
    },
  },
});

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/*<GlobalStoreContextProvider value={GlobalStore}>*/}
    <RootThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <CssBaseline />
            <Root />
            <ReactQueryDevtools initialIsOpen={false} />
          </ModalProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </RootThemeProvider>
    {/*</GlobalStoreContextProvider>*/}
  </StrictMode>
);
