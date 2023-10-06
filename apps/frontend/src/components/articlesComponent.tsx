import * as React from 'react';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import moment from 'moment';
import { articleService, userService } from '../data-services';
import MUIDataTable, { MUIDataTableMeta } from 'mui-datatables';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
} from '@mui/material';
import useDebounce from '../hooks/use-debounce.hook';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalFormCreateArticle from './modals/modalForCreateArticle';
import ModalFormUpdateArticle from './modals/modalForUpdateArticle';
import * as _ from 'lodash';

interface articlesProps {
  admin?: boolean;
}

const ArticlesComponent: FC<articlesProps> = ({ admin = false }) => {
  const [page, setPage] = useState(1);
  const [choosenArticle, setChoosenArticle] = useState({} as any);
  const [pageSize, setPageSize] = useState<number>(10);
  const [count, setCount] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('ASC');
  const [isModalOpenAddArticle, setIsModalOpenAddArticle] =
    useState<boolean>(false);
  const [isModalOpenUpdateArticle, setIsModalOpenUpdateArticle] =
    useState<boolean>(false);

  const { debounceFunc: searchDebouncer } = useDebounce(250);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearchInputChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      await searchDebouncer(() => {
        setSearch(e.target.value);
      });
    },
    [searchDebouncer, setSearch]
  );

  const handleSortOrder = (sortOrder: string) => {
    setSort(sortOrder);
  };

  const handleOpenModalAddArticle = () => {
    setIsModalOpenAddArticle(true);
  };

  const handleCloseModalAddArticle = () => {
    setIsModalOpenAddArticle(false);
  };

  const handleOpenModalUpdateArticle = (tableMeta: MUIDataTableMeta) => {
    setChoosenArticle(
      _.find(data?.data.articles, { _id: tableMeta.rowData[0] })
    );
    setIsModalOpenUpdateArticle(true);
  };

  const handleCloseModalUpdateArticle = () => {
    setIsModalOpenUpdateArticle(false);
    setChoosenArticle('');
  };

  const handleArticleUpdateMutate = (
    title: string,
    rssDate: string,
    link: string,
    id: string
  ) => {
    articleUpdateMutate({ title, rssDate, link, id });
  };

  const { mutate: deleteArticleMutate } = useMutation(
    'deleteArticleMutate',
    // @ts-ignore
    async (articleId: string) => await articleService.deleteArticle(articleId),
    {
      onSuccess: async (response, articleId) => {
        const queryKey = ['articlesList', page, search, sort, pageSize];
        // eslint-disable-next-line
        const dataForChangeStatus: any = await queryClient.getQueryData(
          queryKey
        );
        // eslint-disable-next-line no-return-assign
        const newData = { ...dataForChangeStatus };
        newData.data.articles = dataForChangeStatus.data.articles.filter(
          (article: any) => article._id !== articleId
        );

        await queryClient.setQueryData(queryKey, newData);
      },
    }
  );

  const { mutate: articleUpdateMutate } = useMutation(
    'articleUpdateMutate',
    // @ts-ignore
    async (article: any) => await articleService.updateArticle(article),
    {
      onSuccess: async () => {
        await refetch();
      },
    }
  );

  const handleDeleteSelected = async (data: any, data2: any) => {
    const selectedDataIndices = data.data.map((item: any) => item.dataIndex);
    const filteredData = data2.filter((item: any) =>
      selectedDataIndices.includes(item.dataIndex)
    );

    for (const rowFilter of filteredData) {
      try {
        const articleId = rowFilter?.data[0];
        deleteArticleMutate(articleId);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const queryClient = useQueryClient();

  const { data, isFetching, refetch, isPreviousData, isLoading } = useQuery(
    ['articlesList', page, search, sort, pageSize],
    async () =>
      articleService.findAll({
        page,
        search,
        sort,
        pageSize,
      })
  );

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: 'white',
            },
          },
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            root: {
              '& button': {
                background: 'gray',
                color: 'white',
              },
            },
          },
        },
      },
    });

  const adminColumnsTable: any = [
    { name: '_id', label: 'id', options: { filter: false, display: false } },
    { name: 'title', label: 'Title', filter: false },
    { name: 'link', label: 'Link', filter: false, order: false },
    { name: 'rssDate', label: 'Date' },
    {
      name: 'edit',
      label: 'Edit',
      options: {
        filter: false,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <button
              onClick={(e) => {
                handleOpenModalUpdateArticle(tableMeta);
              }}
              className="button muted-button"
            >
              <MoreHorizIcon />
            </button>
          );
        },
      },
    },
  ];

  const noAdminColumnsTable: any = [
    { name: '_id', label: 'id', options: { filter: false, display: false } },
    { name: 'title', label: 'Title', filter: false },
    { name: 'link', label: 'Link', filter: false, order: false },
    { name: 'rssDate', label: 'Date' },
  ];

  const noAdminOptions = {
    filter: false,
    serverSide: true,
    count: count,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [1, 10, 40],
    loading: isLoading,
    pageSizeOptions: false,
    searchOpen: false,
    search: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: true,
    disableToolbarSelect: false,
    pagination: false,
    onTableChange: (action: any, tableState: any) => {
      switch (action) {
        case 'sort':
          handleSortOrder(tableState.sortOrder);
          break;
        default:
          console.log('action not handled.');
      }
    },
  };

  const adminOptions = {
    filter: false,
    // filterType: 'dropdown',
    // responsive: 'vertical',
    serverSide: true,
    count: count,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [1, 10, 40],
    loading: isLoading,
    pageSizeOptions: false,
    viewColumns: false,
    search: false,
    pagination: false,
    onTableChange: (action: string, tableState: any) => {
      switch (action) {
        case 'sort':
          handleSortOrder(tableState.sortOrder);
          break;
        default:
          console.log('action not handled.');
      }
    },
    customToolbar: () => {
      return (
        <Button
          variant="contained"
          onClick={handleOpenModalAddArticle}
          sx={{ borderRadius: '20px' }}
        >
          <AddCircleIcon sx={{ size: 'small' }} />
        </Button>
      );
    },
    customToolbarSelect: (
      selectedRows: any,
      displayData: any,
      setSelectedRows: any
    ) => (
      <IconButton
        onClick={() => handleDeleteSelected(selectedRows, displayData)}
      >
        <DeleteForeverIcon />
      </IconButton>
    ),
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl
        size="small"
        fullWidth
        sx={{ flexGrow: 1, marginBottom: 3 }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-users-search">
          Search by title
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-users-search"
          type="text"
          sx={{ background: 'white' }}
          onChange={handleSearchInputChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon sx={{ color: 'secondary.main' }} />
            </InputAdornment>
          }
          label="Search by title"
        />
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            columns={admin ? adminColumnsTable : noAdminColumnsTable}
            options={admin ? adminOptions : noAdminOptions}
            data={data?.data.articles.map((article: any) => {
              return [
                article._id,
                article.title,
                <Link
                  to={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go on reddit
                </Link>,
                moment(article.rssDate).format('DD/MM/YY h:mm:ss'),
                admin ? <Button>Edit</Button> : null,
              ];
            })}
            title={'Articles'}
          />
          <ModalFormCreateArticle
            isOpen={isModalOpenAddArticle}
            onClose={handleCloseModalAddArticle}
          />
          <ModalFormUpdateArticle
            isOpen={isModalOpenUpdateArticle}
            onClose={handleCloseModalUpdateArticle}
            article={choosenArticle}
            handleArticleUpdateMutate={handleArticleUpdateMutate}
          />
        </ThemeProvider>
        <Pagination
          count={
            isLoading
              ? 0
              : Math.ceil(data?.data?.pagination?.totalItems / pageSize)
          }
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            handleChangePage(value);
          }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginY: 6,
            color: 'white',
            backgroundColor: 'white',
          }}
        />
      </Box>
    </Box>
  );
};

export default ArticlesComponent;
