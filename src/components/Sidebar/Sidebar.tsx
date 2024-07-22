import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Sidebar.css';

const SideBar: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:44389/api/Category/getall?PageIndex=0&PageSize=5');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched Categories:', data);

                if (data && Array.isArray(data.items)) {
                    setCategories(data.items.map((category: any) => category.name || 'Unnamed Category'));
                } else {
                    console.error('Data is not in expected format:', data);
                    toast.error('Data is not in expected format.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        style: {
                            backgroundColor: '#f25f4c',
                            color: '#000',
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to load categories. Please try again later.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        backgroundColor: '#f25f4c',
                        color: '#000',
                    }
                });
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="sidebar">
            <h2>Categories</h2>
            {loadingCategories ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <li key={category}>{category}</li>
                        ))
                    ) : (
                        <li>No categories available</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SideBar;