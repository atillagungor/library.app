import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Sidebar.css';

const SideBar: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://localhost:44389/api/Categories/getall?PageIndex=0&PageSize=5')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched Data:', data);
                if (data.items && Array.isArray(data.items)) {
                    setCategories(data.items.map((category: any) => category.name));
                } else {
                    console.error('Data is not in expected format:', data);
                }
            })
            .catch(error => {
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
                        backgroundColor: '##f25f4c',
                        color: '#000',
                    }
                });
            });
    }, []);

    return (
        <div className="sidebar">
            <h2>Kategoriler</h2>
            <ul>
                {categories.map(category => (
                    <li key={category}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
