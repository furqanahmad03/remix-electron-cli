# Remix Electron CLI

A cross-platform desktop app built with Electron and Remix (Vite) for the frontend and FastAPI (Python) for the backend. The app launches a local web server and opens a desktop window using Electron, serving the Remix UI while interacting with a Python API.

https://github.com/user-attachments/assets/c3b94a31-e9ed-4974-999b-7fd098cd41fe


## Installation & Running

1. Clone and enter the repository:
```bash
git clone https://github.com/furqanahmad03/remix-electron-cli.git
```
and navigate to that folder:
```bash
cd remix-electron-cli
```

2. Set up Python backend:
In api folder setup python backend
```bash
python -m venv api/venv
```
[Optional: Just for Windows users]
Activate virtual environment if you are a windows user:
- Replace
```bash
source api/venv/bin/activate
```
- With:
```bash
.\api\venv\Scripts\activate
```
in [package.json]

3. Install dependencies for backend handling:
```bash
pip install -r api/requirements.txt
```

4. Install frontend dependencies at root directory:
```bash
npm install
```

5. Launch the full application:
```bash
npm run electron
```
(This simultaneously starts Remix dev server, FastAPI backend, and Electron app)

## Project Structure
```
remix-electron-cli/
├── api/                         # FastAPI backend
│   ├── main.py                  # API endpoints
│   ├── requirements.txt         # Python dependencies
│   └── venv/                    # Virtual environment
├── electron.cjs                 # Electron main process config
├── app/                         # Remix application root
│   ├── routes/                  # All page routes
│   ├── components/              # React components
│   └── ...                      # Other Remix app files
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── ...                      
├── node_modules/                # Frontend dependencies
├── package.json                 # Main project config
├── package-lock.json
└── README.md
```

## Key Features
- 🖥️ Electron desktop wrapper
- ⚡ Remix React frontend
- 🐍 FastAPI Python backend
- 🔥 Hot-reloading for both frontend and backend
- 📦 Single-command startup

## Teck Stack
- Remix.js
- Electron.js
- FastAPI
- Chakra UI (For styling)
- Recharts

## Requirements
- Node.js v16+
- Python 3.8+
- npm v8+
- Git

## Support
For issues, please open a ticket in GitHub repository.

## License
This project is licensed under the MIT License.
