import urllib.request

url = "https://cdn.icon-icons.com/icons2/3053/PNG/512/2gis_macos_bigsur_icon_189725.png"
headers = {'User-Agent': 'Mozilla/5.0'}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open("public/2gis.png", "wb") as f:
            f.write(response.read())
    print("Downloaded 2gis.png successfully.")
except Exception as e:
    print("Error:", e)
