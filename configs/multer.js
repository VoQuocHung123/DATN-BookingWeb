import multer from 'multer';
const multerConfig = multer.diskStorage({
    destination :(req,file,callback)=>{
        callback(null,'./public')
    },
    filename: (req,file,callback)=>{
        const ext = file.mimetype.split('/')[1]
        callback(null,`avatar-${Date.now()}.${ext}`)
    }
})
export default multer({storage: multerConfig})