const express = require('express');
const cors = require('cors');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/info', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).send('URL is required');

    try {
        console.log(`Fetching info for: ${url}`);
        const info = await youtubedl(url, {
            dumpSingleJson: true, // Tells yt-dlp to just return the data, not the video
            noCheckCertificates: true,
            noWarnings: true,
        });
        
        // Send exactly what the frontend needs
        res.json({ 
            title: info.title, 
            thumbnail: info.thumbnail 
        });
    } catch (error) {
        console.error("Failed to fetch info:", error.message);
        res.status(500).send('Could not fetch video details. Ensure the link is valid.');
    }
});

app.post('/download', async (req, res) => {
    const { url, format } = req.body;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    const isMp3 = format === 'mp3';
    const fileExtension = isMp3 ? 'mp3' : 'mp4';
    const fileName = `media-${Date.now()}.${fileExtension}`;
    const filePath = path.join(__dirname, fileName);

    try {
        let flags = {
            noCheckCertificates: true,
            noWarnings: true,
            output: fileName
        };

        if (isMp3) {
            flags.extractAudio = true;
            flags.audioFormat = 'mp3';
        } else {
            // Force output to mp4 container
            flags.mergeOutputFormat = 'mp4'; 
            
            // Map the frontend selection to the exact yt-dlp syntax
            // We specifically request bestaudio[ext=m4a] to ensure Windows compatibility
            switch(format) {
                case '1080p-audio': 
                    flags.format = 'bestvideo[height<=1080]+bestaudio[ext=m4a]/best'; 
                    break;
                case '720p-audio': 
                    flags.format = 'bestvideo[height<=720]+bestaudio[ext=m4a]/best'; 
                    break;
                case '360p-audio': 
                    flags.format = 'bestvideo[height<=360]+bestaudio[ext=m4a]/best'; 
                    break;
                case '1080p-noaudio': 
                    flags.format = 'bestvideo[height<=1080]'; 
                    break;
                case '720p-noaudio': 
                    flags.format = 'bestvideo[height<=720]'; 
                    break;
                case '360p-noaudio': 
                    flags.format = 'bestvideo[height<=360]'; 
                    break;
                default: 
                    flags.format = 'bestvideo+bestaudio[ext=m4a]/best';
            }
        }

        console.log(`Processing: ${url} | Format: ${format}`);

        await youtubedl(url, flags);
        
        console.log('Download built successfully. Sending to client...');

        res.download(filePath, fileName, (err) => {
            if (err) console.error("Error sending file to client:", err);
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
            });
        });

    } catch (error) {
        console.error("Download failed:", error);
        res.status(500).send('Failed to process download. The video might be restricted or unavailable.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));