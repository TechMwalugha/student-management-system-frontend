export type sideBarType = {
    id: number;
    title: string;
    link: string;
}

export type paginatorQuery = {
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    empty: boolean
}

export type studentsType = {
    paginatorQuery: paginatorQuery,
    content: any[]
}

export type filterType = {
    studentId?: number; 
    studentClass?: string; 
    startDate?:  any;
    endDate?:  any; 
}