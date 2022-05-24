import React, {useEffect, useState} from 'react';
import './style.css';
import Form from '../Form';
import Avatar from '../Avatar';
import DeleteComment from '../DeleteComment';

const Main = () => {

    const [posts, setPosts] = useState(null);
    const [comments, setComments] = useState(null);

    //lze použít i Axios místo fetch()
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data)) 
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => setComments(data)) 
    }, []);

    return (

    <div className="all-posts">


    {
        (posts === null || comments === null)
        ? <p>Načítám data z API...</p>
        :   <ul>

            {posts.map(post => {
                const postComments = comments.filter((comment) => comment.postId === post.id)
                
                return (

                <li key={post.id}>
                    <h2>
                        <span className="post-name">Název postu<br /></span>
                        {post.title}
                    </h2>
                    <br />
                    <p>
                        <span className="post-name">Popis<br /></span>
                        {post.body}
                    </p>
                    <br />
                        <span className="post-name">Komentáře<br /></span>

                    <div>
                        <div>{post.name}</div>
                        {postComments.map((comment) => 
                            
                            <div className="comment-table" key={comment.id}>
                                <ul>
                                    <Avatar name={comment.email} />

                                    <DeleteComment />

                                    <li>
                                        <div className="comment-name">{comment.name}</div>
                                    </li>
                                
                                    <li>
                                        <div className="comment-email">{comment.email}</div>
                                    </li>
                                    <br />
                                    <li>
                                        <div>{comment.body}</div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    


                    <Form />



                    <br />
                </li>
           )})}

            </ul>
    }
    </div>
    
    );
};


export default Main;