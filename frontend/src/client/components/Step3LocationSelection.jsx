import React, { useEffect, useState } from "react";
import { fetchLocations } from '../../services/api';

const Step3LocationSelection = ({formData, handleInputChange}) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await fetchLocations();
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        getLocations();
    }, []);

    return (
        <div>
            <h2>Step 3: Location Selection</h2>
            <select
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
            >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                        {loc.name} - {loc.address}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Step3LocationSelection;
