// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()); // CORS 미들웨어 추가

app.get('/api/contest', async (req, res) => {
    const numOfRows = req.query.numOfRows || 10;
    const pageNo = req.query.pageNo || 1;
    const apiUrl = `https://www.chungnam.go.kr/cnbbs/openApiMainFxList.do?numOfRows=${numOfRows}&pageNo=${pageNo}`;

    try {
        const response = await fetch(apiUrl);
        let textData = await response.text();

        // 날짜 필드에 따옴표 추가
        textData = textData.replace(/"sdate":([^,}]+)/g, '"sdate":"$1"');
        textData = textData.replace(/"edate":([^,}]+)/g, '"edate":"$1"');

        const data = JSON.parse(textData);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});



app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
