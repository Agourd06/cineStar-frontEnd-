import { config } from '../../config';

export async function fetchData(endPoint, method = 'GET', token, body = null) {
    try {
        
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const fetchOptions = {
            method: method,
            headers: headers,
        };

        if (method !== 'GET' && body) {
            fetchOptions.body = JSON.stringify(body);
        }
        const response = await fetch(`${config.API_URL}${endPoint}`, fetchOptions);
      
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Problem in response, please try again');
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}
