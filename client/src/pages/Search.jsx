import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (searchTerm && token) { // Ensure token exists before making the request
            // Add a delay to debounce the API call
            const delayDebounceFn = setTimeout(() => {
                setIsLoading(true);
                axios.get(`http://localhost:3000/blog/search/${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    setUserData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the user data!", error);
                    setIsLoading(false);
                });
            }, 500); // Delay of 500ms

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchTerm, token]); 

    return (
        <div>
            <Navbar />
            
            <div className='searchbar'>
                <input 
                    type="text" 
                    placeholder='Search for Blog or BlogTags'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            {isLoading ? (
                <div>Loading...</div> // Show loading state
            ) : (
                userData && (
                    <div className='blog-results'>
                        {/* Render the search results */}
                        {userData.map((blog) => (
                            <div key={blog.id}>
                                <h2>{blog.blogId}</h2>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    )
}

export default Search;
