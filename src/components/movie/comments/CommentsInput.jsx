import React, { useContext, useEffect, useState } from 'react';
import CommentsData from './CommentsData';
import { AlertContext } from '../../../App';
import AuthContext from '../../../context/AuthContext';
import { fetchData } from '../../fetchers/Fetch';
import { userId } from '../../../utils/userId';
import Spinner from '../../shared/Spinner';
import Loader from '../../loading/Loader';

export default function CommentsInput({ MovieId }) {
    const [loading, setLoading] = useState(false);
    const id = userId();
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMoreComments, setHasMoreComments] = useState(true);
    const alert = useContext(AlertContext);
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        content: '',
        client: id,
        movie: MovieId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleComment = async () => {
        setLoading(true);
        try {
            const response = await fetchData('client/comment/create', 'POST', token, formData);
            setComments((prevComments) => [...prevComments, response.comment]);
            setFormData({ ...formData, content: '' });
        } catch (err) {
            alert('info', 'Login for more access');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`public/comments/${MovieId}?page=${page}`, 'GET');
                if (response.comments.length === 0) {
                    setHasMoreComments(false);
                } else {
                    setComments((prevComments) => [...prevComments, ...response.comments]);
                }
            } catch (err) {
                alert('Error fetching comments: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [MovieId, page]);
    const handleShowMore = () => {
        if (hasMoreComments) {
            setPage((prevPage) => prevPage + 1);
        }
    };


    return (
        <section className="min-h-[40vh] relative py-4 px-4 lg:px-0">
            <div className="xl:max-w-7xl lg:max-w-5xl max-w-lg md:max-w-3xl mx-auto text-white">
                <div className="max-w-3xl lg:max-w-full mx-auto ">
                    <h1 className='xl:max-w-7xl lg:max-w-5xl max-w-lg md:max-w-3xl mx-auto text-text md:text-5xl text-2xl font-extrabold py-1'>Comments({comments.length})</h1>
                </div>
                <div className="lg:ml-10 flex md:flex-row flex-col gap-5 justify-center mt-9 items-center">
                    <p className='flex items-center gap-2'><i className='bx bxs-error text-[#df2144]'></i> Dear user, you must be logged to publish your opinion.</p>
                    <div className="flex gap-4">
                        <a href="/login" className="lg:px-6 px-4 py-2 rounded-md text-[#EEBB07] duration-500 hover:text-black text-sm border-black border tracking-wider font-semibold outline-none bg-[#303030] hover:bg-[#EEBB07]">
                            <i className='bx bx-log-in text-white'></i> Log in
                        </a>
                        <a href="/login" className="lg:px-6 px-4 py-2 rounded-md flex items-center gap-2 text-[#EEBB07] duration-500 hover:text-black text-sm border-black border tracking-wider font-semibold outline-none bg-[#303030] hover:bg-[#EEBB07]">
                            <i className='bx bx-user-plus'></i> Register
                        </a>
                    </div>
                </div>
                <div className="relative w-full mt-7 min-w-[200px] rounded-full">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleComment();
                    }}>
                        <textarea
                            name="content"
                            id="newComment"
                            onChange={handleChange}
                            value={formData.content}
                            className="peer h-full pl-15 min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent/5 rounded-xl pt-10 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#EEBB07] focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=""
                        ></textarea>
                        <label
                            className="after:content[''] pt-4 px-4 pointer-events-none text-white absolute left-0 -top-1.5 flex h-full w-full select-none text-sm md:text-[20px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#EEBB07] after:rounded-full after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 md:peer-focus:text-[15px] peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-[#EEBB07] peer-focus:after:scale-x-100 peer-focus:after:border-[#EEBB07] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Add Your Comment Here ...
                        </label>

                        <button
                            type='submit'
                            className="!absolute right-1 top-1 select-none rounded-xl bg-[#EEBB07] md:py-3 md:px-8 py-1 px-4 text-center align-middle font-sans md:text-sm text-xs font-bold uppercase text-white shadow-md shadow-[#EEBB07]/20 transition-all hover:shadow-lg hover:shadow-[#EEBB07]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none">
                            {loading ? <><Spinner className="mr-2" size={4} /> Sending...</> : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
            <CommentsData comments={comments} loading={loading} hasMoreComments={hasMoreComments} handleShowMore={handleShowMore}/>
        
        </section>
    );
}
