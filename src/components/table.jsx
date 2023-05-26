import React, { useEffect, useState } from 'react';
import '../App.css'
import '../index.css'

const Table = () => {
    const [data, setData] = useState([]);
    const [updatedPrices, setUpdatedPrices] = useState({});
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json');
            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.price - b.price);
            setData(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handlePriceChange = (id, e) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    price: parseFloat(e.target.value),
                };
            }
            return item;
        });
        setData(updatedData);
    };
    const handleSetPrices = () => {
        const updatedData = data.map((item) => {
            if (updatedPrices.hasOwnProperty(item.id)) {
                return {
                    ...item,
                    price: updatedPrices[item.id],
                };
            }
            return item;
        });

        setData(updatedData);
        setUpdatedPrices({});
    };
    const handleResetPrices = async () => {
        try {
            const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json');
            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.price - b.price);
            setData(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };
    return (
        <div>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catagory</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.label}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><input type="number"
                                value={item.price}
                                onChange={(e) => handlePriceChange(item.id, e)} /></td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className=' text-center'>
                <button className=" mr-40 bg-blue-500 uppercase hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={handleSetPrices}>
                    Set
                </button>
                <button className=" mr-40 bg-blue-500 uppercase hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center " onClick={handleResetPrices}>
                    Reset
                </button>
            </div>
        </div>
    );
};
export default Table;
