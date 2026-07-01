import yt_dlp
import os

ydl_opts = {
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
    'outtmpl': 'public/bg-music.%(ext)s',
    'noplaylist': True,
}

# Searching soundcloud to avoid youtube 403 errors
query = "scsearch1:Еркеш Хасен Қызым"

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    try:
        ydl.download([query])
    except Exception as e:
        # Fallback to a different search if the exact song is not on soundcloud
        try:
            ydl.download(["scsearch1:казахская песня қызым"])
        except Exception as e2:
            print(f"Error: {e2}")
