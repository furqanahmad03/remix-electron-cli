from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi import Query
import os
import shutil
import csv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)



@app.post("/api/upload")
async def uploadFile(file: UploadFile = File(...)):
  file_path = os.path.join(UPLOAD_DIR, file.filename)

  # Save file
  with open(file_path, "wb") as buffer:
    shutil.copyfileobj(file.file, buffer)

  # Parse CSV to get headers
  try:
    with open(file_path, newline='', encoding='utf-8') as csvfile:
      reader = csv.reader(csvfile)
      headers = next(reader)
  except Exception as e:
    raise HTTPException(status_code=400, detail=f"Error reading CSV: {str(e)}")

  return JSONResponse(content={"fileName": file.filename, "columns": headers})



@app.delete("/api/delete")
async def deleteFile(filename: str = Query(...)):
  if not filename.endswith(".csv"):
    filename += ".csv"
  file_path = os.path.join(UPLOAD_DIR, filename)
  if os.path.exists(file_path):
    os.remove(file_path)
    return JSONResponse(content={"message": "File deleted successfully"})
  raise HTTPException(status_code=404, detail="File does not exist")


@app.post("/api/drawChart")
async def drawChart(request: Request):
  body = await request.json()
  requested_file = body.get("file", "").lower()

  if not requested_file:
    raise HTTPException(status_code=400, detail="Missing 'file' in request")
  
  if not requested_file.endswith(".csv"):
    requested_file += ".csv"

  file_path = os.path.join(UPLOAD_DIR, requested_file)

  if not os.path.isfile(file_path):
    raise HTTPException(status_code=404, detail="File not found")

  results = []
  try:
    with open(file_path, newline='') as csvfile:
      reader = csv.DictReader(csvfile)
      for row in reader:
        results.append(row)
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")

  return JSONResponse(content={"data": results, "file": requested_file})
