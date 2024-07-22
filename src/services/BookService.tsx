import axios from 'axios';
import { BASE_API_URL } from '../enviroment/enviroment';
import { toast } from 'react-toastify';

const BOOK_API_URL = `${BASE_API_URL}Books/getall?PageIndex=0&PageSize=5`;

export const fetchBooks = async () => {
    try {
        const response = await axios.get(BOOK_API_URL);
        console.log('API Response:', response.data);
        if (response.data && Array.isArray(response.data.items)) {
            return response.data.items;
        } else {
            toast.error('Unexpected response format from server.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#FFC107',
                    color: '#000',
                }
            });
            return [];
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error fetching books:', error.response.data);
            toast.error(`Failed to load books. Server responded with: ${error.response.statusText}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#FFC107',
                    color: '#000',
                }
            });
        } else {
            console.error('Error fetching books:', error);
            toast.error('Failed to load books. Please try again later.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#FFC107',
                    color: '#000',
                }
            });
        }
        return [];
    }
};