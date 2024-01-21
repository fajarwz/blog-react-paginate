import Pagination from "./Pagination"
import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";

export default function Content() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const initialPage = pageParam ? parseInt(pageParam, 10) - 1 : 0;
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        setLoading(true);
        try {
            const data = await getPosts(page + 1);
            setData(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    const handlePageChange = ({ selected }) => {
        const nextPage = selected;

        // Update the URL with the new page value
        const params = new URLSearchParams(window.location.search);
        params.set('page', nextPage + 1);

        // Replace the current URL without reloading the page
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

        setCurrentPage(nextPage);
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (data.posts?.length > 0) {
        const limit = 10;
        const pageCount = Math.ceil(data.total / limit)
        return <>
            {data.posts.map((post) => (
                <div key={post.id}>{`${post.id} : ${post.title}`}</div>
            ))}

            <Pagination initialPage={initialPage} pageCount={pageCount} onPageChange={handlePageChange} />
        </>
    }

    return <div>No posts found.</div>
}
