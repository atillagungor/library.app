import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const SideBar: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://localhost:44389/api/Categories/getall?PageIndex=0&PageSize=5')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Data:', data);
                if (data.items && Array.isArray(data.items)) {
                    setCategories(data.items.map((category: any) => category.name));
                } else {
                    console.error('Data is not in expected format:', data);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
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