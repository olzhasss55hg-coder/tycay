import subprocess
import time

email = "aysezim.toy.2026@gmail.com"
password = "AysezimPassword123!"
domain = "aysezim-toy.surge.sh"

print("Starting deploy to Surge...")

# Run surge
p = subprocess.Popen(["npx", "surge", "dist", domain], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, shell=True)

# Wait a bit
time.sleep(5)

# It usually asks for email, then password. 
# We'll just push them to stdin.
try:
    p.stdin.write(email + "\n")
    p.stdin.flush()
    time.sleep(2)
    p.stdin.write(password + "\n")
    p.stdin.flush()
    time.sleep(2)
    p.stdin.write(domain + "\n")
    p.stdin.flush()
    
    # Wait for completion
    stdout, _ = p.communicate(timeout=60)
    print(stdout)
except Exception as e:
    print("Error:", e)
