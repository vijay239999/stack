let cachedNgrokUrl = null;

export const getNgrokUrl = async () => {
    if (cachedNgrokUrl) return cachedNgrokUrl;  // Use cached URL if available

    try {
        const response = await fetch('http://localhost:8080/ngrok-url');
        const data = await response.json();
        cachedNgrokUrl = data.url;
        return cachedNgrokUrl;
    } catch (error) {
        console.error('Failed to fetch Ngrok URL:', error);
        return null;
    }
};
