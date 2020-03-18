const fetcher = path => axios.get(path).then(res => res.data)

export {
    fetcher,
}
