interface ResultFetch<T> {
    result?: T;
    message?: string;
}

export interface SearchResult<T> extends ResultFetch {
    result: {
        pagging: {
            page: number;
            take: number;
            toal_page: number;
            total_item: number;
        }, 
        result: T
    }
}