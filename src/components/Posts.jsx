import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi'
import Form from './Form'

const Posts = () => {

    const [data, setData] = useState([])

    //function to get posts 
    const getPostData = async () => {
        const res = await getPost()
        console.log(res.data)
        setData(res.data)
    }

    useEffect(() => {
        getPostData()
    }, [])

    // function to delete post 
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            if (res.status === 200) {
                alert("Post deleted Successfully")
                const newUpdatedPosts = data.filter((item) => {
                    return item.id != id
                })
                setData(newUpdatedPosts)
            }
            else {
                alert("Failed to delete the post")
                console.log("Failed to delete the post ", res.status)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleUpdatePost = ()=>{
        
    }

    return (
        <>
            <section>
                <Form onAdd={(newPost) => setData([newPost, ...data])} />
            </section>


            <section>
                <ol>
                    {
                        data.map((item) => {
                            const { id, title, body } = item
                            return (
                                <li key={id}>
                                    {/* <p>{id}</p> */}
                                    <p>Title: {title}</p>
                                    <p>Body: {body}</p>
                                    <button className='edit-button' onClick={handleUpdatePost(item)}>Edit</button>
                                    <button className='delete-button' onClick={() => { handleDeletePost(id) }}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ol>
            </section>
        </>
    )
}

export default Posts
