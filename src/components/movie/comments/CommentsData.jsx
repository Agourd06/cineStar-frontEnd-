import React, { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../fetchers/Fetch';
import { AlertContext } from '../../../App';
import Loader from '../../loading/Loader';

export default function CommentsData({ comments, loading, hasMoreComments, handleShowMore }) {



    if (loading && comments.length === 0) {
        return <Loader />
    }


    return (
        <div className="flex flex-col gap-y-5 py-6 text-white xl:max-w-7xl lg:max-w-5xl max-w-lg md:max-w-3xl mx-auto">
            {comments.map((comment) => (
                <div className="bg-darker rounded-lg pt-2" key={comment._id}>
                    <div className="text-[#EEBB07] px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <i className="bx bxs-user-circle text-5xl"></i>
                            <h2 className="text-xl font-bold">{comment.client.name}</h2>
                        </div>
                        <div className="flex px-4">
                            <p>{new Date(comment.createdAt).toLocaleDateString()} - {new Date(comment.createdAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="lg:pl-16 pl-1 pr-5 pb-4">
                            <p>{comment.content}</p>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <Loader />}
            {hasMoreComments && !loading && (

                <button onClick={handleShowMore} className="mt-4 bg-[#EEBB07] text-white rounded-lg px-4 py-2 ">
                    Load More Comments
                </button>
            )}

        </div>
    );
}
