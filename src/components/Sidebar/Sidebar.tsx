import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const SideBar: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/Category')
            .then(response => response.json())
            .then(data => setCategories(data.map((category: any) => category.name)))
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