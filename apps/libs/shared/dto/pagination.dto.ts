export class PaginationDto {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface SortDto {
  direction: string;
  name: string;
}

export interface FilterDto {
  page: string;
  pageSize: string;
  sort: SortDto;
  search: string;
}
