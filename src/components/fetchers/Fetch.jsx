import React from 'react';

export async function makeApiRequest(endPoint, setLoading, setData, method = 'GET', token, alert, body = null, Adding, logout) {
    try {
        setLoading(true);

        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }

            ),
        };

        const fetchOptions = {
            method: method,
            headers: headers,
        };

        if (method !== 'GET' && body) {
            fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(`http://localhost:3000/api/${endPoint}`, fetchOptions);

        if (response.status === 401) {
            alert('warning', 'Your session expired. Please login again.');
            logout()
            return;
        }

        if (!response.ok) {
            const errorResponse = await response.json(); 
            alert('error', errorResponse.message || 'Problem in response please try again');
            return;
        }
        

        if (method === 'POST' || method === 'PUT') {
            alert('success', `Success`);
            window.location.reload();
        }
        
        if(method == 'GET'){

            const responseData = await response.json();
    
            setData(responseData);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('error', error.message || 'An error occurred while making the request')

    } finally {
        setLoading(false);
    }
}
