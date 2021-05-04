const httpSuccess = (statusCode, message, input) => {
    return {
        statusCode,
        body: JSON.stringify({
            message,
            input
        })
    };
}