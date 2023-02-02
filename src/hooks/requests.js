import { useState, useEffect } from 'react'
import useSWRHook, {mutate} from 'swr'
import axios from 'axios'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useSWR(url, fetchFn = fetcher) {
    return useSWRHook(url, fetchFn)
}

/* Reusable POST hook that mutates the corresponding SWR GET requests
Useful if there's a same endpoint using SWR hook, and doesn't need re-fetch */
export function usePostSWR(initialUrl, initialData, reFetchSWR = true) {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState(initialUrl)
    const [data, setData] = useState(initialData)

    useEffect(() => {
        setData(initialData)
    }, [initialData])

    useEffect(() => {
        setUrl(initialUrl)
    }, [initialUrl])

    const handlePost = async (newData) => {
        setLoading(true)
        try {
            await axios.post(url, newData || data)
            if(reFetchSWR) {
              // re fetches url GET requests with same URL as the post method
              await mutate(url)
            }
        } catch(e) {
            console.log(e)
        }
        setLoading(false)
    }

    return [handlePost, loading]
}