const Lesson = require('../Models/Lesson');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

// Helper to detect YouTube links
function isYouTubeLink(link) {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
    return regex.test(link);
}

exports.createLesson = async (req, res) => {
    const { Name, type, UnitId, content } = req.body;
    let lessonData = {
        LessonName: Name,
        UnitId,
    };

    try {
        // Case 1: YouTube Link
        if (type === 'youtube' && content) {
            lessonData.Content = content;
            lessonData.Type = 'youtube';

            const lesson = new Lesson(lessonData);
            await lesson.save();
            return res.status(201).json({ message: 'Lesson created successfully.', lesson });
        }

        // Case 2: PDF File Upload
        if (req.file && type === 'pdf') {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'raw',
                    folder: 'lessons',
                    public_id: `${Date.now()}`, // optional: generate unique name
                    format: 'pdf',              // force format
                    type: 'upload',
                    access_mode: 'public',
                },
                async (error, result) => {
                    if (error) {
                        console.error('Cloudinary Upload Error:', error);
                        return res.status(500).json({ message: 'Cloudinary Upload Error', error });
                    }

                    lessonData.Content = result.secure_url;  // this will be the public URL
                    lessonData.Type = 'pdf';

                    try {
                        const lesson = new Lesson(lessonData);
                        await lesson.save();
                        res.status(201).json({ message: 'Lesson created successfully.', lesson });
                    } catch (err) {
                        console.error('Lesson Save Error:', err);
                        res.status(500).json({ message: 'Database Save Error', error: err });
                    }
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        }


        else {
            res.status(400).json({ message: 'No valid content provided.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
