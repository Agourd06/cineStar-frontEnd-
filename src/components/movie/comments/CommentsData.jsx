import React, { useContext, useState } from 'react';
import { fetchData } from '../../fetchers/Fetch';
import Loader from '../../loading/Loader';
import AuthContext from '../../../context/AuthContext';
import Spinner from '../../shared/Spinner';
import { userId as getUserId } from '../../../utils/userId';

export default function CommentsData({ comments, loading, hasMoreComments, handleShowMore, alert, setComments }) {
    const { token } = useContext(AuthContext);
    const [deletingId, setDeletingId] = useState(null);
    const userId = getUserId();

    const deleteComment = async (id) => {
        setDeletingId(id);

        try {
            await fetchData(`client/comment/delete/${id}`, 'PUT', token);
            const updatedComments = comments.filter(comment => comment._id !== id);
            setComments(updatedComments);
            alert('success', 'Comment deleted successfully');
        } catch (err) {
            alert('error', err.message);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && comments.length === 0) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col gap-y-5 py-6 text-white xl:max-w-7xl lg:max-w-5xl max-w-lg md:max-w-3xl mx-auto">
            {comments.map((comment) => (

                <div className="bg-darker rounded-lg pt-2" key={comment._id}>
                    <div className="text-[#EEBB07] px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <i className="bx bxs-user-circle text-5xl"></i>
                            <h2 className="text-xl font-bold">{comment.client.name || 'new Comment'}</h2>
                        </div>
                        <div className="flex px-4">
                            <p>{new Date(comment.createdAt).toLocaleDateString()} - {new Date(comment.createdAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <div className="px-4 flex justify-between">
                        <div className="lg:pl-16 pl-1 pr-5 pb-4 w-[80%]">
                            <p>{comment.content}</p>
                        </div>
                        {userId == comment.client._id && <div className='py-3 px-3'>
                            <button
                                onClick={() => deleteComment(comment._id)}
                                className='px-4 py-2 border-border border rounded-lg bg-red-500/10 hover:bg-red-500 duration-700 text-red-400 hover:text-red-800 font-bold'
                                disabled={deletingId === comment._id}
                            >
                                {deletingId === comment._id ? (
                                    <>
                                        <Spinner className="mr-2" size={4} color='fill-red-500/50' /> Deleting...
                                    </>
                                ) : 'Delete'}
                            </button>
                        </div>}
                    </div>
                </div>
            ))}
            {hasMoreComments && !loading && (
                <button onClick={handleShowMore} className="mt-4 bg-[#EEBB07] text-white rounded-lg px-4 py-2">
                    Load More Comments
                </button>
            )}
        </div>
    );
}
