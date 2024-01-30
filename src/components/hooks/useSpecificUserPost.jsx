// useAllPlaces.js
import { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../routes/axiosInstance';
import { AuthContext } from '../../provider/AuthProvider';

const useSpecificUserPost = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostData = async () => {
        const id = user?.id;
        try {
            const response = await axiosInstance.get(`/user-post/${id}`);
            if (response.data?.posts) {
                setUserPosts(response.data.posts);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostData();
    }, []);

    return { userPosts, loading, error };
};

export default useSpecificUserPost;
