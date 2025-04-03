import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const runtime = 'nodejs';

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get('image'); // get uploaded file 

    if (!file) { // throw an error if no file is uploaded 
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 }); 
    }

    // convert file into a buffer array
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uploadPath = path.join(process.cwd(), 'public/uploads'); 
    
    //if the directory doesn't exist create it
    if (!fs.existsSync(uploadPath)) { 
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(uploadPath, fileName);

    fs.writeFileSync(filePath, fileBuffer); // save the file 

    const dataFilePath = path.join(process.cwd(), 'src/data.json');

    let data = [];
    if (fs.existsSync(dataFilePath)) { 
      try {
        data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    }

    data.push({ original: `/uploads/${fileName}`, compressed: null }); 
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); //save image data to data.json


    return NextResponse.json({ filePath: `/uploads/${fileName}` }, { status: 200 });
  
  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};