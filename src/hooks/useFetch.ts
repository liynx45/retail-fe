import React, { useEffect, useState } from 'react';
import useLoading from './useLoading';
import { AxiosResponse } from 'axios';
import { ResultFetch } from '../services/api';

function useFetch<T>(fetchPromise: Promise<ResultFetch<T>>) {

    const [toggle, setToggle] = useState<boolean>(false)
    const [fetching, setFething] = useState<boolean>(false)
    const [error, setError] = useState<unknown>("")
    const [data, setData] = useState<T>();
    const { isLoading, setLoading } = useLoading();

    const fetchData = async () => {
        setLoading("loading")
        setFething(true)
        try {
            const response = await fetchPromise as ResultFetch<T>
            setLoading('success');
            setData(response.result);
        } catch (err: any) {
            setLoading('error');
            setError(err.response.data.erros)
            console.error('Error fetching data:', error);
        } finally {
            setFething(false)
        }
    };

    const reload = () => {
        setToggle(prev => !prev)
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData()
    }, [toggle])

    return {
        status: isLoading,
        data: data,
        reload: reload,
        fetching: fetching
    };
}

export {
    useFetch
}