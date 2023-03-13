package bankproject.onlinebanking.Service.ServiceImpl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import bankproject.onlinebanking.Execptions.BadApiRequestException;
import bankproject.onlinebanking.Service.FileService;

@Service
public class FileServiceImpl implements FileService {

    private Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {

        // // File name
        // String name = file.getOriginalFilename();
        // // abc.png

        // // random name generate file
        // String randomID = UUID.randomUUID().toString();
        // String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));

        // // Full path
        // String filePath = path + File.separator + fileName1;

        // // create folder if not created
        // File f = new File(path);
        // if (!f.exists()) {
        // f.mkdir();
        // }

        // // file copy

        // Files.copy(file.getInputStream(), Paths.get(filePath));

        // return fileName1;

        // abc.png
        String originalFilename = file.getOriginalFilename();
        logger.info("Filename : {}", originalFilename);
        String filename = UUID.randomUUID().toString();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileNameWithExtension = filename + extension;
        String fullPathWithFileName = path + fileNameWithExtension;

        logger.info("full image path: {} ", fullPathWithFileName);
        if (extension.equalsIgnoreCase(".png") || extension.equalsIgnoreCase(".jpg")
                || extension.equalsIgnoreCase(".jpeg")) {

            // file save
            logger.info("file extension is {} ", extension);
            File folder = new File(path);
            if (!folder.exists()) {
                // create the folder
                folder.mkdirs();

            }

            // upload
            Files.copy(file.getInputStream(), Paths.get(fullPathWithFileName));
            return fileNameWithExtension;

        } else {
            throw new BadApiRequestException("File with this " + extension + " not allowed !!");
        }

    }

    @Override
    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String fullPath = path + File.separator + fileName;
        InputStream inputStream = new FileInputStream(fullPath);
        // db logic to return inpustream
        return inputStream;
    }

}
