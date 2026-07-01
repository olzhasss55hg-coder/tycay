import os
import subprocess
import urllib.request
from rembg import remove
from PIL import Image

def process_image():
    input_path = "C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\c07e1864-d731-4623-be49-6d10bfb057e1\\beautiful_baby_girl_1782832811332.png"
    output_path = "public\\baby.png"
    print("Processing image background removal...")
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path)
        print("Successfully created transparent baby.png")
    except Exception as e:
        print(f"Error processing image: {e}")

def process_audio():
    print("Downloading audio using yt-dlp...")
    # Search for "adil кызым" and download first result as mp3
    cmd = [
        "yt-dlp",
        "ytsearch1:adil кызым",
        "-x",
        "--audio-format", "mp3",
        "-o", "public/music.%(ext)s"
    ]
    subprocess.run(cmd)
    
    # Rename if needed (yt-dlp might name it public/music.mp3)
    if not os.path.exists("public/music.mp3"):
        print("Warning: yt-dlp might have failed or named it differently.")
    else:
        print("Successfully downloaded music.mp3")

if __name__ == "__main__":
    process_image()
    process_audio()
