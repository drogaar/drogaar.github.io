import http.server
import socketserver
import os

# Set the port number you want to use
port = 8000

# Specify the directory containing your HTML file
web_dir = "."
os.chdir(web_dir)

# Create a simple HTTP server
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", port), Handler) as httpd:
    print(f"Serving {os.chdir(web_dir)} on http://localhost:{port}/")
    httpd.serve_forever()