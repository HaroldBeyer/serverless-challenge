const httpSuccess = (statusCode, message, input) => {
    return {
        statusCode,
        headers: {
            
        },
        body: JSON.stringify({
            message,
            input
        })
    };
}