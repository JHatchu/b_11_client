import React, { useState } from 'react';
import './AssetForm.css'; // Import the CSS file

const AssetForm = ({ category, subCategory }) => {
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = `http://localhost:4250/api/${category}`;

        const dataToSend = {
            type: subCategory,
            details: { ...formData }
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            const result = await response.json();
            console.log(`${subCategory} Asset Added:`, result);
            if (response.ok) {
                setSuccessMessage(`${subCategory.charAt(0).toUpperCase() + subCategory.slice(1)} Asset Added Successfully!`);
                setErrorMessage('');
            } else {
                setErrorMessage(result.error || 'An error occurred while adding the asset.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error(`Error adding ${subCategory} asset:`, error);
        }
    };

    const renderFormFields = () => {
        switch (subCategory) {
            case 'jewels':
                return (
                    <>
                        <input type="text" name="name" placeholder="Name/Type" onChange={handleChange} />
                        <textarea name="description" placeholder="Description" onChange={handleChange} />
                        <input type="text" name="weight" placeholder="Weight" onChange={handleChange} />
                        <input type="number" name="boughtPrice" placeholder="Bought Price" onChange={handleChange} />
                        <label htmlFor="PurchasedDate">Purchased Date:</label>
                        <input type="date" name="purchaseDate" placeholder="Purchase Date" onChange={handleChange} />
                        <input type="text" name="billNo" placeholder="Bill No" onChange={handleChange} />
                        <input type="text" name="materialType" placeholder="Material Type" onChange={handleChange} />
                    </>
                );
            case 'commercialSpaces':
                return (
                    <>
                        <input type="text" name="type" placeholder="Type" onChange={handleChange} />
                        <input type="text" name="size" placeholder="Size" onChange={handleChange} />
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                        <input type="text" name="location" placeholder="Location" onChange={handleChange} />
                        <input type="number" name="purchasePrice" placeholder="Purchase Price" onChange={handleChange} />
                        <label htmlFor="PurchaseDate">Purchased Date:</label>
                        <input type="date" name="purchaseDate" placeholder="Purchase Date" onChange={handleChange} />
                    </>
                );
            case 'land':
                return (
                    <>
                        <input type="text" name="type" placeholder="Type" onChange={handleChange} />
                        <input type="text" name="location" placeholder="Location" onChange={handleChange} />
                        <input type="number" name="purchasePrice" placeholder="Purchased Price" onChange={handleChange} />
                        <label htmlFor="PurchaseDate">Purchased Date:</label>
                        <input type="date" name="purchaseDate" placeholder="Purchased Date" onChange={handleChange} />
                    </>
                );
            case 'stocks':
                return (
                    <>
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
                        <input type="number" name="boughtPrice" placeholder="Bought Price Per Stock" onChange={handleChange} />
                    </>
                );
            case 'bonds':
                return (
                    <>
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                        <input type="text" name="issuer" placeholder="Issuer" onChange={handleChange} />
                        <input type="text" name="type" placeholder="Type" onChange={handleChange} />
                        <input type="number" name="boughtPrice" placeholder="Price Bought" onChange={handleChange} />
                        <input type="text" name="idNo" placeholder="ID No" onChange={handleChange} />
                        <label htmlFor="IssuedDate">Issued Date:</label>
                        <input type="date" name="issuedDate" placeholder="Issued Date" onChange={handleChange} />
                        <label htmlFor="maturityDate">Maturity Date:</label>
                        <input type="date" name="maturityDate" placeholder="Maturity Date" onChange={handleChange} />
                    </>
                );
            case 'mutualFunds':
                return (
                    <>
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                        <input type="text" name="type" placeholder="Type" onChange={handleChange} />
                        <input type="text" name="managementCompany" placeholder="Management Company" onChange={handleChange} />
                        <input type="number" name="amountInvested" placeholder="Amount Invested" onChange={handleChange} />
                    </>
                );
            case 'cryptocurrencies':
                return (
                    <>
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                        <input type="text" name="ticker" placeholder="Ticker" onChange={handleChange} />
                        <input type="text" name="type" placeholder="Type" onChange={handleChange} />
                        <input type="text" name="contract" placeholder="Contract" onChange={handleChange} />
                        <textarea name="details" placeholder="Details" onChange={handleChange} />
                        <input type="number" name="boughtPrice" placeholder="Price Bought" onChange={handleChange} />
                        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
                    </>
                );
            case 'cash':
                return (
                    <>
                        <input type="number" name="amountInHand" placeholder="Amount in Hand as Cash" onChange={handleChange} />
                        <label htmlFor="PurchasedDate">Date:</label>
                        <input type="date" name="date" placeholder="Date" onChange={handleChange} />
                    </>
                );
            case 'bankDeposits':
                return (
                    <>
                        <input type="text" name="accountNo" placeholder="Account No" onChange={handleChange} />
                        <input type="text" name="bankName" placeholder="Bank Name" onChange={handleChange} />
                        <input type="text" name="accountType" placeholder="Account Type" onChange={handleChange} />
                        <input type="number" name="depositAmount" placeholder="Deposit Amount" onChange={handleChange} />
                        <input type="number" name="interestRate" placeholder="Interest Rate" onChange={handleChange} />
                        <input type="text" name="compoundingFrequency" placeholder="Compounding Frequency" onChange={handleChange} />
                    </>
                );
            default:
                return <p>Please select a valid asset type.</p>;
        }
    };

    return (
        <form className="asset-form" onSubmit={handleSubmit}>
        <h2>{subCategory ? `Add ${subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}` : 'Select a Subcategory'}</h2>
        {renderFormFields()}
        <button type="submit" className="submit-button">Add Asset</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
    );
};

export default AssetForm;
