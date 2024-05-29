const axios = require('axios');

const lineNotify = async(message) => {
    try {
        const response = await axios({
            method: "POST",
            url: "https://notify-api.line.me/api/notify",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${process.env.PROD_LINE_TOKEN}`
            },
            data: `message=${message}`
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = lineNotify;