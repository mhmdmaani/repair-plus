import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { ReactNode } from 'react';

const EnhancedTable = ({
  data,
  columns,
  sortBy,
  setSortBy,
  isASC,
  setIsASC,
  search,
  setSearch,
  page,
  setPage,
  perPage,
  setPerPage,
}: {
  data: any[];
  columns: {
    id: string;
    label: string;
    renderCell?: (row: any, cell: any) => ReactNode;
  }[];
  sortBy: string;
  setSortBy: (value: string) => void;
  isASC: boolean;
  setIsASC: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  perPage: number;
  setPerPage: (value: number) => void;
}) => {
  const handleRequestSort = (event: any, property: any) => {
    setIsASC(isASC ? false : true);
    setSortBy(property);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((headCell) => (
                <TableCell
                  sortDirection={
                    sortBy === headCell.id && isASC ? 'asc' : 'desc'
                  }
                  onClick={(event) => handleRequestSort(event, headCell.id)}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={index}>
                {columns.map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.renderCell
                      ? cell.renderCell(row, cell)
                      : row[cell.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 75, 100, 200]}
        component='div'
        count={-1}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EnhancedTable;
