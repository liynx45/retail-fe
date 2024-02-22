import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useLoading from './useLoading';
import { ResultFetch } from '../services/api';
import { useLocation } from 'react-router-dom';

interface useFetchProps<T> {
    fetch: Promise<ResultFetch<T>>,
    query?: string
}
function useFetch<T>({ fetch, query }: useFetchProps<T>) {

    const [fetching, setFething] = useState<boolean>(false)
    const [error, setError] = useState<unknown>("")
    const [data, setData] = useState<any>();
    const { isLoading, setLoading } = useLoading();
    const { pathname } = useLocation()
    let isFetch 
    
    const fetchData = async () => {
        setLoading("loading")
        setFething(true)
        try {
            isFetch = true
            if (isFetch) {
                const response = await fetch
                // console.log("fetch fase")
                setLoading('success');
                setData(response.result);
                isFetch = false
            }
        } catch (err: any) {
            setLoading('error');
            setError(err.response.data.erros)
        } finally {
            setFething(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        status: isLoading,
        data: data,
        reload: fetchData,
        fetching: fetching,
        error: error
    }
}

export {
    useFetch
}