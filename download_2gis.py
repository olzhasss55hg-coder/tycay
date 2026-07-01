import urllib.request
import json

api_url = "https://en.wikipedia.org/w/api.php?action=query&titles=File:2GIS_logo.svg&prop=imageinfo&iiprop=url&format=json"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

try:
    req = urllib.request.Request(api_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        pages = data['query']['pages']
        for page_id in pages:
            url = pages[page_id]['imageinfo'][0]['url']
            print("FOUND URL:", url)
            
            # Download the file
            req_file = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req_file) as img_resp:
                with open("public/2gis.svg", "wb") as out:
                    out.write(img_resp.read())
            print("Downloaded to public/2gis.svg")
except Exception as e:
    print("Error:", e)
