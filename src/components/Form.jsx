import React, { useState } from 'react'
import { postData } from '../api/PostApi'

const Form = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    })

    // Function to handle input changes
    const handleInputChange = (key, value) => {
        formData[key] = value
        setFormData({ ...formData })
    }

    // Function to handle form submission and posting data in api
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        try {
            const res = await postData(formData)
            console.log(res.data)
            if (res.status === 201) {
                alert('Post added successfully!')
                onAdd(res.data)                      // Pass the new post to the parent component
                setFormData({ title: '', body: '' }) // Reset the form
            } else {
                alert('Failed to add post.')
                console.log('Error adding post:', res)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <div className='form-body'>
                <form>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => { handleInputChange("title", e.target.value) }}
                            placeholder="Enter title"
                            required
                        />
                    </div>
                    <div>
                        <label>Body:</label>
                        <input
                            type="text"
                            name="body"
                            value={formData.body}
                            onChange={(e) => { handleInputChange("body", e.target.value) }}
                            placeholder="Enter body"
                            required
                        />
                    </div>
                    <button type="submit" className="edit-button" onClick={handleSubmit}>
                        Add Post
                    </button>
                </form>
            </div>
        </>
    )
}

export default Form