import React, { useState } from 'react';
import AssetSelection from './assetSelection';
import AssetForm from './AssetForm';
import './Main.css'; // Import the CSS file

const Main = () => {
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setSubCategory('');
    };

    const handleSubCategoryChange = (selectedSubCategory) => {
        setSubCategory(selectedSubCategory);
    };

    return (
        <div className="container">
            <h1>Asset Management</h1>
            <div>
                <div>
                    <AssetSelection 
                        category={category} 
                        onCategoryChange={handleCategoryChange} 
                        onSubCategoryChange={handleSubCategoryChange} 
                    />
                </div>
                {subCategory && (
                    <div className="asset-form">
                        <AssetForm category={category} subCategory={subCategory} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
