import React from 'react';
import './AssetSelection.css'; // Import the CSS file

const AssetSelection = ({ category, onCategoryChange, onSubCategoryChange }) => {
    const categories = [
        { value: 'liquid', label: 'Liquid Assets' },
        { value: 'nonLiquid', label: 'Non-Liquid Assets' }
    ];

    const liquidSubCategories = [
        { value: 'stocks', label: 'Stocks' },
        { value: 'bonds', label: 'Bonds' },
        { value: 'mutualFunds', label: 'Mutual Funds' },
        { value: 'cryptocurrencies', label: 'Cryptocurrencies' },
        { value: 'cash', label: 'Cash' },
        { value: 'bankDeposits', label: 'Bank Deposits' }
       
    ];

    const nonLiquidSubCategories = [
        
        { value: 'land', label: 'Land' },
        
        { value: 'commercialSpaces', label: 'Commercial Spaces' },
        { value: 'jewels', label: 'Jewels' }
    ];

    const handleCategoryChange = (event) => {
        onCategoryChange(event.target.value);
        onSubCategoryChange('');
    };

    const handleSubCategoryChange = (event) => {
        onSubCategoryChange(event.target.value);
    };

    return (
        <div className="asset-selection">
            <div className="form-group">
                <label className="form-label">Category:</label>
                <select className="form-select" value={category} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
            </div>

            {category && (
                <div className="form-group">
                    <label className="form-label">Subcategory:</label>
                    <select className="form-select" value={category} onChange={handleSubCategoryChange}>
                        <option value="">Select Subcategory</option>
                        {(category === 'liquid' ? liquidSubCategories : nonLiquidSubCategories).map(sub => (
                            <option key={sub.value} value={sub.value}>{sub.label}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default AssetSelection;
