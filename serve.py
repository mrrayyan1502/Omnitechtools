import http.server
import socketserver
import os

PORT = 8000

class SPAServer(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Clean path to see if physical file exists
        clean_path = self.path.split('?')[0].split('#')[0]
        physical_path = self.translate_path(clean_path)
        
        # If the file does not exist, serve index.html for client-side SPA routing
        if not os.path.exists(physical_path) or os.path.isdir(physical_path):
            self.path = '/index.html'
            
        return super().do_GET()

# Run the local server
if __name__ == '__main__':
    # Allow port reuse to avoid 'Address already in use' errors
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SPAServer) as httpd:
        print("\n" + "="*50)
        print(f"🚀 OmniTools SPA Local Server is running!")
        print(f"🔗 Open your browser: http://localhost:{PORT}")
        print("💡 Test clean URLs, titles, meta tags, and more.")
        print("🛑 Press Ctrl+C in this terminal to stop.")
        print("="*50 + "\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped successfully.")
