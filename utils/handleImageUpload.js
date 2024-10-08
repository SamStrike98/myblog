const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');  // Set this up in your Cloudinary account

    const res = await fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
        console.log('Uploaded to Cloudinary:', data.secure_url);
        setImgUrl(data.secure_url);  // Save Cloudinary URL to your project
    }
};
