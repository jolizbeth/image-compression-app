"use client";
import './styles.css'; 
import Image from 'next/image'
import { Box, Button, Typography, Input } from "@mui/material";
import { useRef, useState, useEffect} from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [compressedImage, setCompressedImage] = useState(null);
  const fileInputRef = useRef(null); // Ref for file input

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (preview && typeof preview === 'string') {
      return () => URL.revokeObjectURL(preview);
    }  
  }, [preview]);

  const handleImageChange = (e) => {
		e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      setImage(file);
			setPreview(URL.createObjectURL(file));
      setFileName(e.target.files[0].name);
    }
  };

  const handleUpload = async (e) => {
		e.preventDefault();
    if (!image) { 
      alert('Please select an image first');
      return;
    } 

		const formData = new FormData();
    formData.append('image', image); 

		try {     
        const response = await fetch('/api/upload', {
					method: 'POST',
					body: formData,
				} );
				if (!response.ok) {
					throw new Error('Failed to upload image');
				}

				const result = await response.json();
				if (result && result.filePath) {
					await compressImage(result.filePath); 
				}

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  const compressImage = async (filePath) =>{
		try {
      if(!filePath){
        throw new Error("Invalid filepath to compress ")
      }
			const response = await fetch('/api/compress', {
        method: 'POST',
        body: JSON.stringify({ imagePath: filePath }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(!response.ok){
        throw new Error("Fail to compress the image ")
      }
      const result = await response.json();
      if(result.compressedPath) {
        setCompressedImage(result.compressedPath);
      }

		} catch (error) {
			console.error(`Error while compressing the image: ${error.message}`);
		}
		
  };

  return (
    <Box className= "upload-container" sx={{ textAlign: "center", mx: "auto" }}>
      <Box className="upload-box" onClick={() => fileInputRef.current?.click()}>
        <input 
          className = "input" 
          type="file"
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          style={{ display: "none" }}
          />
        <Typography sx={{ color: "#D29BAC", fontWeight: "bold" }}>
          {fileName || "Click here to browse files"}
        </Typography>
      </Box>
      <Box>
        <Button 
          className='upload-button'
          onClick={handleUpload}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        > 
        <Typography sx={{ color: "#FFFF", fontWeight: "bold" }}>
          Upload
        </Typography>
        </Button>
      </Box>
      <Box>
        {image && (
          <>    
            <Typography>Preview of Uploaded Image</Typography>
            <Image src={preview} alt="Preview" width={250} height={250}/>
          </>
        )}
        {compressedImage && (
          <>
            <Typography>Preview of Compressed Image</Typography>
            <Image src={compressedImage} alt="Compressed Image Preview" width={250} height={250} />
          </>
        )}
      </Box>
    </Box>
  );
}

export default ImageUpload;