from PIL import Image

def remove_white_bg(input_path, output_path, threshold=245):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if the pixel is close to white
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            new_data.append((255, 255, 255, 0)) # Fully transparent
        else:
            new_data.append(item) # Keep original pixel
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

input_file = "C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\c07e1864-d731-4623-be49-6d10bfb057e1\\beautiful_baby_girl_1782832811332.png"
output_file = "public\\baby.png"
remove_white_bg(input_file, output_file)
print("Saved transparent image to public\\baby.png")
