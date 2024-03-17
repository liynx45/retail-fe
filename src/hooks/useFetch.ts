import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useLoading from './useLoading';
import { ResultFetch } from '../services/api';
import { useLocation } from 'react-router-dom';
import { axiosPrivate, axiosPublic } from '../libs/axios';

interface useFetchProps<T> {
    // fetch: Promise<ResultFetch<T>>,
    // query?: string
    type: "private" | "public";
    url: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    params?: object | string;
    body?: object;
}
function useFetch<T>({ type, url, method, params, body }: useFetchProps<T>) {

    const [fetching, setFething] = useState<boolean>(false)
    const [error, setError] = useState<unknown>("")
    const [data, setData] = useState<T>();
    const [toggle, setToggle] = useState<boolean>(false)
    const { isLoading, setLoading } = useLoading("loading");

    const fetchData = useCallback(async () => {
        setLoading("loading")
        setFething(true)
        try {
            const res = type === "public" ?
                await axiosPublic({
                    url: (url + (typeof params === "string" ? params : "")),
                    method: method,
                    params: typeof params === "object" ? params : {},
                    data: body
                }) : await axiosPrivate({
                    url: (url + (typeof params === "string" ? params : "")),
                    method: method,
                    params: typeof params === "object" ? params : {},
                    data: body
                })
            if (res.status === 200) {
                setData(res.data),
                setLoading("success")
            }
        } catch (err: any) {
            setLoading('error');
            setError(err.response.data.erros)
        } finally {
            setFething(false)
        }
    }, [url, type, method, params])

    useEffect(() => {
        fetchData();
    }, [url, toggle]);

    const refresh = () => {
        setToggle(!toggle)
    }

    return {
        status: isLoading,
        data: data,
        reload: refresh,
        fetching: fetching,
        error: error
    }
}

export {
    useFetch
}