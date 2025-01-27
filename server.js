import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.get('/prtg', async (req, res) => {
    const PRTG_API_URL = `http://malloco.mtt.cl/api/table.json?content=sensors&columns=objid,probe,group,device,sensor,lastvalue,status,message&filter_status=5&username=mduarte&passhash=1783449223`;

    try {
        const response = await fetch(PRTG_API_URL);
        const data = await response.json();

        res.json({ sensors: data.sensors || [] });
    } catch (error) {
        console.error('Error al obtener sensores:', error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});
